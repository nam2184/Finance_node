from .paillier_enc import PaillierKeyGen
import unittest

class TestCipher(unittest.TestCase):
    def test_encrypt(self):
        value = 10
        key_gen = PaillierKeyGen()
        public_key = key_gen.public_key()
        private_key = key_gen.private_key()
        print(f'Private Key : {key_gen.private_key}')
        self.assertEqual(private_key.decrypt(public_key.encrypt(value)), value, 'Incorrect cipher')

    def test_operation(self):
        value1 = 10
        value2 = 12
        key_gen = PaillierKeyGen()
        public_key = key_gen.public_key()
        private_key = key_gen.private_key()
        self.assertEqual(private_key.decrypt(public_key.encrypt(value1) + public_key.encrypt(value2)), value1 + value2, 'Incorrect cipher')


if __name__ ==  '__main__' :
  unittest.main()  

