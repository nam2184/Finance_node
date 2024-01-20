import numpy
import random
import math
from utils import prime_generator
    
class Paillier:
    def __init__(self, value):
        self.value = value
        self.public_key = 

    def encrypt(self):
        pass

    def decrypt(self):
        pass

class PaillierKeyGen:
    def __init__(self):
        primes = prime_generator(10000,20000)
        p = random.choose(primes.keys())
        q = random.choose(primes[self.p])
        self.n = p*q
        self.glambda = math.lcm(p-1,q-1)
        self.g = random.choose(multiplicative_inverse(self.n))

        
    def __repr__(self):
        return f"[{self.__class__.__name__} object]"

    def public_key(self):
        return PublicKey(self.n, self.g)
    
    def private_key(self):
        pass

    def multiplicative_inverse(n):
        gs = [i for i in range(1,10000) if math.gcd(number,i) == 1]
        return gs

class PublicKey(PaillierKeyGen):
    def __init__(self,n,g):
        super().__init__(n,g)

    def __repr__(self):
        return f"[{self.__class__.__name__} object]"

class PrivateKey(PaillierKeyGen):
    def __init__(self,glambda, mu):
        super().__init__(glambda,mu)

    def __repr__(self):
        return f"[{self.__class__.__name__} object]"


