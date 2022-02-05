# need cloc on ubuntu, to be adapted to other distros

cloc --exclude-dir=$(tr '\r' ',' < .clocignore) .