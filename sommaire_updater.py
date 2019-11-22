import os

with open('README.md', "r") as readme:

    lines = []
    line = readme.readline()
    
    while line:
        if '### ' in line and not '####' in line and not '#####' in line:
            lines.append(line)
        line = readme.readline()

    with open('TEMP.md', 'w') as out:

        for fnc in lines:
            header = fnc[4:-1].replace(' ', '-')
            trunc = header[:header.index('(')]
            out.write(f"- [{trunc}](###{header})\n")