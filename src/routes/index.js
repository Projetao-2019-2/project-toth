const express = require('express')

const postRouter = require(`./${process.env.API_VERSION}/postRouter`)
const userRouter = require(`./${process.env.API_VERSION}/userRouter`)