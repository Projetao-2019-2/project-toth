#!/bin/bash

docker exec -ti toth_env $1

sudo chown -R $USER:$USER src/
