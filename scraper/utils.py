import time
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


def timer(func):
    def wrapper(*args,**kwargs):
        logger.info(f"Start Executing {func.__name__}()")
        t1 = time.time() 
        result = func(*args,**kwargs)
        t2 = time.time()
        logger.info(f'Time : {str(t2-t1)}')
        return result
    return wrapper

def parseRequests(request):
    ticker = request.args.get('ticker')
    timeframe = request.arg.get('timeframe')
    if ticker is None:
        error_response = {'error' : 'Missing parameters'}
        return False
    else :
        return ticker, timeframe
