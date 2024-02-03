import time
import logging
import math

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

def row_to_dict(row):
    return {
            "date" : row['Date'],
            "open" : row["Open"],
            "high" : row["High"],
            "low" : row["Open"],
            "close" : row["Close"],
            "volume" : row["Volume"],
            }
@timer
def sieve_prime(start, end):
    primes = set()
    sieve = set(range(2, end+1))
    while sieve:
        prime = min(sieve)
        if prime >= start:
            primes.add(prime)
        sieve -= set(range(prime, end+1, prime))
    return primes

@timer
def prime_generator(minPrime,maxPrime):
    cached_primes = sieve_prime(minPrime, maxPrime)
    gcd_pairs = dict() 
    for i in cached_primes:
        pair_list = [j for j in cached_primes if math.gcd(i*j,(i-1)*(j-1))==1]
        gcd_pairs[i] = pair_list
    return gcd_pairs

@timer
def multiplicative(number):
        gs = [i for i in range(1,10000) if math.gcd(number,i) == 1]
        return gs

if __name__ == "__main__":
    pairs = prime_generator(2, 10000)
