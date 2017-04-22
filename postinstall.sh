#!/usr/bin/env bash

cd client
npm run build:prod
mv dist/bundle.js ../server/public/

