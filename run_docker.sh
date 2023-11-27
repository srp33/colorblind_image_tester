#! /bin/bash

docker run \
    -i -t --rm \
    --platform linux/amd64 \
    --user $(id -u):$(id -g) \
    -p 8080:3000 \
        srp33/colorblind_image_tester 
