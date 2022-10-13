import face_recognition
import cv2
import numpy as np


def find_encodings(path):
    img = cv2.imread(path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    encode = face_recognition.face_encodings(img)[0]
    encode = np.round(encode, decimals=7)
    # encodeList.append(encode)
    return encode.tolist()


path = "F:/Coding/Projects/IOE_Digilocker/fr_images/ashish_pal.jpg"


# encodes = find_encodings(path)
# print(encodes)
print(find_encodings(path))
