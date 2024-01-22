import re
from requests import Session
from requests_cache import CacheMixin,SQLiteCache 
from requests_ratelimiter import LimiterMixin, MemoryQueueBucket
from pyrate_limiter import Duration, RequestRate, Limiter
import yfinance as yf
import copy
import pandas as pd
from utils import timer

class CachedLimiterSession(CacheMixin, LimiterMixin, Session):
    pass

class Scrape:
    def __init__(self):
        self._global_ticker = None
        self._data = None
        self._session = CachedLimiterSession(limiter=Limiter(RequestRate(5, Duration.SECOND*5)),
                                            bucket_class=MemoryQueueBucket,
                                            backend=SQLiteCache('yfinance.cache'))

    @timer
    def scrape(func):
        def wrapper(self,ticker,*args,**kwargs):
            if ticker != self._global_ticker :
                self._global_ticker = copy.deepcopy(ticker)
                try :
                    self._data = yf.Ticker(ticker,session=self._session)
                except:
                    print("Failure to retrieve information")
            result = func(self,ticker=ticker,*args,**kwargs)
            return result
        return wrapper

    @scrape  
    def retrieveHistory(self,ticker=None, timeframe='1y') -> pd.DataFrame :
        history_df = self._data.history(period=timeframe)
        history_df.index = history_df.index.astype(str).str.replace(r'\s\d{2}:\d{2}:\d{2}-\d{2}:\d{2}', '', regex=True)
        history_df = history_df.reset_index()
        return history_df

    @scrape
    def retrieveHolders(self,ticker=None) -> pd.DataFrame:
        major = self._data.major_holders
        intis = self._data.institutional_holders
        mutual = self._data.mutualfund_holders
        holders = {'stats' : major, 
                    'ins' : intis,
                    'mutual' : mutual}
        return holders

    @scrape
    def retrieveActions(self, ticker=None) -> dict:
        actions = { 'actions' : self._data.actions,
                    'dividends' : self._data.dividends,
                    'splits' : self._data.splits,
                    'capital_gains' : self._data.capital_gains,}
        return actions

    @scrape
    def retrieveFinancials(self, ticker=None, fargs = None, timeframe=None)-> dict:
        financials = {}
        if timeframe != None and fargs == None:
            financials = {'shares' : self._data.get_shares_full(start=timeframe['start'],end=timeframe['end']),
                          'income' : self._data.income_stmt,
                          'quarterly_income' : self._data.quarterly_income_stmt,
                          'balance' : self._data.balance_sheet,
                          'quarterly_balance' : self._data.quarterly_balance_sheet,
                          'cashflow' : self._data.cashflow,
                          'quarterly_cashflow' : self._data.quarterly_cashflow}
        elif timeframe == None and fargs == None:
            financials = {'income' : self._data.income_stmt,
                          'quarterly_income' : self._data.quarterly_income_stmt,
                          'balance' : self._data.balance_sheet,
                          'quarterly_balance' : self._data.quarterly_balance_sheet,
                          'cashflow' : self._data.cashflow,
                          'quarterly_cashflow' : self._data.quarterly_cashflow}
        else :
            for arg in fargs:
                match arg:
                    case 'income':
                        financials[arg] = self._data.income_stmt
                    case 'quarterly_income':
                        financials[arg] = self._data.quarterly_income_stmt 
                    case 'balance':
                        financials[arg] = self._data.balance_sheet
                    case 'quarterly_balance' :
                        financials[arg] = self._data.quarterly_balance_sheet
                    case 'cashflow':    
                        financials[arg] = self._data.income_stmt
                    case 'quarterly_cashflow':
                        financials[arg] = self._data.quarterly_cashflow
                    case 'shares':
                        if timeframe != None:
                            financials[arg] = self._data.get_shares_full(start=timeframe['start'],end=timeframe['end'])
                        else :
                            raise TypeError('Has shares in args but no timeframe')
        return financials
                            

if __name__ == '__main__':
    scrape_session = Scrape()
    print(scrape_session.retrieveHistory(ticker='AAPL',timeframe='1y'))
    print(scrape_session.retrieveHolders(ticker='AAPL')['stats'])
    print(scrape_session.retrieveActions(ticker='MSFT')['actions'])
    print(scrape_session.retrieveFinancials(ticker='AAPL', fargs=['income','shares'], timeframe={'start' : '2020-01-01', 'end' : None})['income'])
