# U2FsdGVkX1//GZNe8k1rlXJDbvfHU4H99lHLbduy5Fll+KToIkF8I4nLQxJ2P/b3
# from Crypto import Random
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad,unpad
import base64
# from pkcs7 import PKCS7Encoder
from Crypto.Random import get_random_bytes

# def unpad(s):
#     return s[:-ord(s[len(s)-1:])]

key = 'AAAAAAAAAAAAAAAA' #16 char for AES128
# text = 'This is a test'
# raw = pad(text.encode(),16)
# cipher = AES.new(key.encode('utf-8'), AES.MODE_ECB)
# enc = base64.b64encode(cipher.encrypt(raw))
# enc = enc.decode("utf-8", "ignore")

enc = 'qjhUguVnNOdBII+q9sKHZQ=='
enc = base64.b64decode(enc)
# enc = enc.encode('utf-8')
cipher = AES.new(key.encode('utf-8'), AES.MODE_ECB,)
decr1 = cipher.decrypt(enc)
decr2 = unpad(cipher.decrypt(enc),16)
dec = decr2.decode('utf-8', errors='ignore')



iv =  get_random_bytes(16) #16 char for AES128

enc = base64.b64decode(enc)
iV = enc[:AES.block_size]
cipher = AES.new(key.encode('utf-8'), AES.MODE_CBC, iv)
decr1 = cipher.decrypt(enc[AES.block_size:])
# decr2 = decr1.decode()
decr = unpad(cipher.decrypt(enc[AES.block_size:]))
print(decr)

# cipher = AES.new(key.encode('utf-8'), AES.MODE_CBC) #, base64.b64decode(iv))
# a = cipher.decrypt(enc)
# b = a.decode()
# r = unpad(a,16)
# ret = unpad(cipher.decrypt(enc) ,16)
# print(ret)