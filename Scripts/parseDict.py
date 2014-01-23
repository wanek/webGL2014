

def Parse():
    f = open("dictionary.txt",'r')

    lines = f.readlines()
    dictionary = {}
    for line in lines:
        ls = line.split()
        x = ls.pop(0)
        y = ls.pop(0)
        z = ls.pop(0)
        key = str(x) + ' ' + str(y) + ' ' + str(z)
        dictionary[key]=[]
        for item in ls:
            dictionary[key].append(item)

        return dictionary

    

