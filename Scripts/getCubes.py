import os

vert_dict = {}
root_dir= "/home/cg/palantir/w"

def scrape_poly3_files(root_dir):
	if os.path.exists(root_dir + '/t'):
		for digit0 in os.listdir(root_dir + '/t'):
			for digit1 in os.listdir(root_dir + '/t' + '/' + digit0):
				path = root_dir + '/t' + '/' + digit0 + '/' + digit1
				for poly3 in os.listdir(path):
					if poly3.endswith('.poly3'):
						##print("POLY3 " + poly3)
						file = open(path + '/' + poly3, 'r')
						add_to_dictionary(file)
	##print("VERT_DICT")
	for k,v in vert_dict.items():
		str_v = ""
		for item in v:
			str_v += (item + " ")
		str_v.rstrip()
		print(k + " -> " + str_v)


def add_to_dictionary(file):
	lines = file.readlines()
	tileID = lines[0].split()[1]
	nVerts = int(lines[0].split()[2])
	for i in range(1, nVerts+1):
		vert_ls = lines[i].split()
		x = int(float(vert_ls[0]))
		y = int(float(vert_ls[1]))
		z = int(float(vert_ls[2]))
		vert_key = str(x) + " " + str(y) + " " + str(z)
		if not vert_key in vert_dict:			#if the key exists
			vert_dict[vert_key] = [tileID]			#start the list of tIDs
		else:									#if the key doesn't exist
			if not vert_dict[vert_key].count(tileID):	#and the tID isn't already in the list
				vert_dict[vert_key].append(tileID)			#add the tID


#def dump_to_file():

scrape_poly3_files(root_dir)
	
