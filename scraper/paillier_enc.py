import numpy as np
import random
import math
from .utils import prime_generator, multiplicative
import libnum

class PaillierKeyGen(object):
    def __init__(self):
        primes = prime_generator(10000,20000)
        p = random.choice(list(primes.keys()))
        q = random.choice(primes[p])
        self.n = p*q
        self.glambda = math.lcm(p-1,q-1)
        self.g = random.choice(multiplicative(self.n))
        l = (pow(self.g, self.glambda, self.n*self.n)-1)//self.n
        self.gMu = libnum.invmod(l,self.n) 
       
    def __repr__(self):
        keyHash = hex(hash(self))[2:]
        return f"[{self.__class__.__name__}{keyHash[:10]}]"

    def public_key(self):
        return PublicKey(self.n, self.g)
    
    def private_key(self):
        return PrivateKey(self.glambda,self.gMu, self.n, self.public_key())

class PublicKey(object):
    def __init__(self, n, g):
        self.n = n
        self.g = g

    def __repr__(self):
        publickeyHash = hex(hash(self))[2:]
        return f"[{self.__class__.__name__}{publickeyHash[:10]}]"

    def encrypt(self, m):
        n_squared = self.n*self.n
        k1 = pow(self.g, m, n_squared)
        r = random.randint(0, n_squared)
        k2 = pow(r, self.n, n_squared)
        cipher = (k1 * k2) % (n_squared)
        return cipher

class PrivateKey(object):
    def __init__(self,glambda, gMu, n, public_key):
        self.glambda = glambda
        self.gMu= gMu
        self.public_key = public_key
        self.n = n

    def __repr__(self):
        pub_repr = repr(self.public_key)
        return f"[{self.__class__.__name__}{pub_repr}]"
    
    def decrypt(self, cipher):
        l = (pow(cipher, self.glambda, self.n*self.n)-1) // self.n
        mess= (l * self.gMu) % self.n
        return mess

class EncryptedNumber(object):
    def __init__(self, value) :
        self.value = value
        
