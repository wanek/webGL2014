from fakeGET import *
import json

def fake():
    poly3data = thing2()
    polygon = []
    
    #grabs face with the most vertexs
    for face in poly3data:
        
        if (len(face) > len(polygon)):
            polygon = face

    #print polygon
    HighestX =  polygon[0]  #Lowest X, Largest y
    LowestX = polygon[0]  #Largest X, Largest Y
    HighestY  = polygon[0] #Lowest X, Lowest Y
    LowestY = polygon[0] #Largest X, Lowest Y
    for point in  polygon:
       # print type( upperLeft['x'])
        if point['x'] >= HighestX['x']:
                HighestX = point
        if point['x'] <= LowestX['x']:
                LowestX = point
        if point['y'] <= LowestY['y']:
                LowestY = point
        if point['y'] >= HighestY['y']:
                HighestY = point



                

    print("HighestX = " + str(HighestX))
    print("LowestX = " + str(LowestX))
    print("HighestY = " + str(HighestY))
    print("LowestY = " + str(LowestY))
    
    blehh = [HighestX, HighestY, LowestY, LowestX]
    tel = {"type":5, "points":blehh}
    print tel
    return json.dumps([tel])

print fake()
