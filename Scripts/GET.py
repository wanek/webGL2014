import json



def vertex(x, y, z):
    temp = {"x":x,"y":y,"z":z}
    return temp

def thing():
    f = open("/home/binderd/webgl/polygons/169wray.poly3",'r')
    s = f.readline().split(' ')
    vertices = []
    numfaces = eval(s[3])
    faces = []
    for i in range (0,eval(s[2])):
        s = f.readline().split(' ')
        v = vertex(eval(s[0]),eval(s[1]),eval(s[2]))
        vertices.append(v)
    for  i in range (0,numfaces):
        s = f.readline().split(" ")
        faces.append([])
        for j in range(1,len(s)):
             faces[i].append(vertices[eval(s[j])])


    temp = json.dumps(faces)
    print temp
    return temp

thing()
