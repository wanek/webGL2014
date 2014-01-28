import json



def vertex(x, y, z, u , v):
    temp = {"x":x,"y":y,"z":z, "u":u,"v":v}
    return temp

def getTessallatedData():
    triangles = []
    f = open("/home/binderd/webgl/polygons/167wray.poly3GL",'r')
    lines = f.readlines()
    NumOfTriangles = -1
    for i in range(len(lines)):
        line = lines[i].split(' ')
        if len(line) == 1:
            triangles.append({"type": eval(line[0]), "points":[]})
            NumOfTriangles+=1
        else:
            triangles[NumOfTriangles]["points"].append(vertex(eval(line[0]),eval(line[1]),eval(line[2]),eval(line[3]),eval(line[4])))       

    return json.dumps(triangles)

print getTessallatedData()
