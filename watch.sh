#!/bin/sh

set -e

webpack -w &
WEBPACK_PID=$!
nodemon -w server server/app.js
kill $!
