import face_recognition
import cv2
import numpy as np
import os
import sys

curDir = os.getcwd()
# basePath = 'public/uploads'
basePath = os.path.join(curDir, 'public', 'uploads')
lockerid = sys.argv[1]
whom_var = sys.argv[2]
what_var = sys.argv[3]

encodingPath = os.path.join(curDir, 'encodings', lockerid)
encodingFile = f'{encodingPath}.npy'


def appendImage(path, image, lst):
    curImg = cv2.imread(os.path.join(path, image))
    lst.append(curImg)
    classNames.append(os.path.splitext(image)[0])


if what_var == 'enco':
    if(os.path.exists(encodingFile)):
        print('SM_ENCOS')
    else:
        banker_img = os.path.join(basePath, 'banker')
        user_img = os.path.join(basePath, lockerid)
        print(user_img)
        images = []
        classNames = []
        bankerDir = os.listdir(banker_img)
        userDir = os.listdir(user_img)
        # print(myList)
        for cl in bankerDir:
            appendImage(banker_img, cl, images)
        for cl in userDir:
            appendImage(user_img, cl, images)

        def findEncodings(images):
            encodeList = []
            for img in images:
                img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                encode = face_recognition.face_encodings(img)[0]
                encodeList.append(encode)
            return encodeList

        encodeListKnown = findEncodings(images)
        with open(encodingFile, 'wb') as f:
            np.save(f, [classNames, encodeListKnown], allow_pickle=True)
        print('SM_ENCOS')

# print(classNames)


if what_var == 'reco':

    with open(f'{encodingPath}.npy', 'rb') as f:
        loaded_data = np.load(f, allow_pickle=True)
    classNames = loaded_data[0]
    encodeListKnown = loaded_data[1]
    # print(classNames, encodeListKnown)

    cap = cv2.VideoCapture(0)
    while True:
        success, img = cap.read()
        imgS = cv2.resize(img, (0, 0), None,  0.25, 0.25)
        imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)
        facesCurFrame = face_recognition.face_locations(imgS)
        encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)
        for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
            matches = face_recognition.compare_faces(
                encodeListKnown, encodeFace)
            faceDis = face_recognition.face_distance(
                encodeListKnown, encodeFace)
            print(faceDis)
            matchIndex = np.argmin(faceDis)
            if matches[matchIndex]:
                name = classNames[matchIndex].upper()
                print(name)
                y1, x2, y2, x1 = faceLoc
                y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
                cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.rectangle(img, (x1, y2-35), (x2, y2),
                              (0, 255, 0), cv2.FILLED)
                cv2.putText(img, name, (x1 + 6, y2-6),
                            cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)

        cv2.imshow('Webcam', img)
        cv2.waitKey(1)
