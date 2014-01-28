



def vertex(x, y, z, u, v):
    temp = {"x":x,"y":y,"z":z, "u":u , "v":v }
    return temp

def thing2():
    f = open("/home/binderd/webgl/polygons/165wray.poly3",'r')
    s = f.readline().split(' ')
    vertices = []
    numfaces = eval(s[3])
    faces = []
    for i in range (0,eval(s[2])):
        s = f.readline().split(' ')
        v = vertex(eval(s[0]),eval(s[1]),eval(s[2]),eval(s[3]),eval(s[4]))
        vertices.append(v)
    for  i in range (0,numfaces):
        s = f.readline().split(" ")
        faces.append([])
        for j in range(1,len(s)):
             faces[i].append(vertices[eval(s[j])])


    
    
    return faces

thing2()
