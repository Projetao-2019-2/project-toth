#!/bin/bash

docker exec -ti projecttoth_env_1 $1

sudo chown -R $USER:$USER .
