import os
from re import sub

def getHeaders():
	lines = []
	with open('README.md', "r") as readme:
		for line in readme.readlines():
			if '### ' in line and not '####' in line and not '#####' in line:
				lines.append(line)

	with open('TEMP.md', 'w') as out:
		for fnc in lines:
			trunc = fnc[fnc.index(' ') + 1:]
			header = trunc[:trunc.index('(')].rstrip()
			link = sub('\(|\)|,|\.|\[|\]|\||&', '', trunc.replace(' ', '-'))[:-1].lower()
			out.write(f"- [{header}](#{link})\n")

if __name__ == '__main__':
	getHeaders()