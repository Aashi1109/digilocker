import json
import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime
from json import JSONEncoder
import codecs


class NumpyArrayEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()

        return JSONEncoder.default(self, obj)


path = 'fr_images'
images = []
classNames = []
myList = os.listdir(path)
print(myList)
for cl in myList:
    curImg = cv2.imread(f'{ path }/{ cl }')
    images.append(curImg)
    classNames.append(os.path.splitext(cl)[0])

print(classNames)


def markAttendance(name):
    with open(' Attendance.csv ', ' r + ') as f:
        myDataList = f.readlines()
        nameList = []
        for line in myDataList:
            entry = line.split(' , ')
            nameList.append(entry[0])
            if name not in nameList:
                now = datetime.now()
                dtString = now.strftime('% H: % M: % S')
                f.writelines(f'\n{ name } , { dtString }')


def findEncodings(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList


encodeListKnown = findEncodings(images)
print(encodeListKnown)
print(encodeListKnown[0].shape)


# var1 = encodeListKnown[0].tolist()
var1 = encodeListKnown[1]
# print(type(var1))
print('Encoding Complete')
# cap = cv2.VideoCapture(0)

# print(var1)
my_dict = {}

# text = json.dumps(var1, codecs.open('encode_data', 'w', encoding='utf-8'),
#                   separators=(',', ':'),
#                   sort_keys=True,
#                   indent=4)
encodeListKnown = [np.array([-0.2054754, 0.1274607, 0.0797601, -0.0517876, -0.1106201, -0.0124562, -0.0318954, -0.1345311, 0.1722589, -0.0648395, 0.2320874, -0.0660016, -0.1700394, -0.1754146, -0.034387, 0.1371103, -0.1582203, -0.1417581, 0.0432016, -0.072153, 0.0606698, -0.0151678, -0.0303945, 0.0930015, -0.1514117, -0.3178293, -0.0270153, -0.1825069, 0.0095847, -0.047051, -0.1171308, 0.0885635, -0.1941033, -0.069523, -0.0530076, 0.1242617, 0.0364251, -0.0095577, 0.1063153, -0.0770553, -0.1880652, -0.0350758, 0.0981242, 0.193666, 0.2104588, 0.0062084, 0.0225507, -0.0301748, 0.1500163, -0.1411299, 0.0194273, 0.0849033, 0.2050205, -0.0228084, 0.0540809, -0.2468682, -0.0306501, 0.0560622, -0.2177589, 0.0837849, 0.0422012, -0.102494, -
                             0.0628213, -0.043387, 0.211297, 0.1658505, -0.048077, -0.1754656, 0.2390831, -0.1747613, -0.0360032, 0.0858962, -0.1041196, -0.1920186, -0.2795872, 0.032452, 0.2867335, 0.162208, -0.1985653, 0.0459046, -0.0393697, 0.01562, 0.0770956, 0.06849, -0.0728961, 0.0403478, -0.1478819, -0.0551087, 0.1707791, 0.0271266, 0.0052302, 0.212303, -0.0117701, 0.0201029, 0.0261128, -0.010777, -0.0914195, 0.0728614, -0.1209582, 0.0117119, 0.0059759, -0.1380202, 0.0084879, 0.0738246, -0.204357, 0.0483482, -0.0392385, 0.0470773, -0.0987895, -0.0289235, -0.077693, 0.0275679, 0.1668864, -0.2272844, 0.1915374, 0.1252074, 0.03939, 0.2051967, 0.1110498, 0.053565, 0.0347533, -0.0928112, -0.1686666, -0.0419018, 0.0896872, -0.1735583, 0.0863736, 0.1029512])]

print(encodeListKnown[0].shape)
print(type(encodeListKnown[0]))


cap = cv2.VideoCapture(0)
while True:
    success, img = cap.read()
    imgS = cv2.resize(img, (0, 0), None,  0.25, 0.25)
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)
    facesCurFrame = face_recognition.face_locations(imgS)
    encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)
    for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
        matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
        faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)
        print(faceDis)
        matchIndex = np.argmin(faceDis)
        if matches[matchIndex]:
            name = classNames[matchIndex].upper()
            print(name)
            y1, x2, y2, x1 = faceLoc
            y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.rectangle(img, (x1, y2-35), (x2, y2), (0, 255, 0), cv2.FILLED)
            cv2.putText(img, name, (x1 + 6, y2-6),
                        cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)

    cv2.imshow('Webcam', img)
    cv2.waitKey(1)


# imgElon = face_recognition.load_image_file('fr_images/elon_musk.jpg')
# imgElon = cv2.cvtColor(imgElon, cv2.COLOR_BGR2RGB)
# # imgTest = face_recognition.load_image_file('fr_images/scarlett_johansson.jpg')
# imgTest = face_recognition.load_image_file('fr_images/scarlett_johansson.jpg')
# imgTest = cv2.cvtColor(imgTest, cv2.COLOR_BGR2RGB)
