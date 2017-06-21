#!/usr/bin/env bash

server=ubuntu@52.59.71.133
# rsync -avz --delete -e 'ssh' "dist/" "${server}:how-to-write-a-typescript-library/dist"
scp ./dist/how-to-write-an-angular2-library.html ${server}:how-to-write-a-typescript-library/dist/angular2-library-example.html

