import re
from requests import Session
from requests_cache import CacheMixin,SQLiteCache 
from requests_ratelimiter import LimiterMixin, MemoryQueueBucket
from pyrate_limiter import Duration, RequestRate, Limiter
import yfinance as yf
import time
import logging
import copy

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def timer(func):
        def wrapper(*args,**kwargs):
            logger.info("Start Execution")
            t1 = time.time() 
            result = func(*args,**kwargs)
            t2 = time.time()
            logger.info(f'Time : {str(t2-t1)}')
            return result
        return wrapper

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
    def scrape(self,ticker):
        try :
            data = yf.Ticker(ticker,session=self._session)
        except:
            print("Failure to retrieve information")
        return data

    @timer  
    def retrieveHistory(self,ticker=None, timeframe='1y'):
        if ticker != self._global_ticker :
            self._data = self.scrape(ticker=ticker)
            self._global_ticker = copy.deepcopy(ticker)
        history_df = self._data.history(period=timeframe)
        return history_df

    @timer
    def retrieveHolders(self,ticker=None):
        if ticker != self._global_ticker :
            self._data = self.scrape(ticker=ticker)
            self._global_ticker = copy.deepcopy(ticker)
        major = self._data.major_holders
        major.columns = ['%','Type']
        intis = self._data.institutional_holders
        mutual = self._data.mutualfund_holders
        holders = {'stats' : major, 
                    'ins' : intis,
                    'mutual' : mutual
                  }
        return holders
    
    def retrieveFinnancials(self,ticker=None):
       pass 

if __name__ == '__main__':
    scrape_session = Scrape()
    history = scrape_session.retrieveHistory(ticker='AAPL',timeframe='1y')
    print(history)
    print(scrape_session.retrieveHolders(ticker='AAPL')['stats'])
    print(scrape_session.retrieveHolders(ticker='AAPL')['ins'])   
