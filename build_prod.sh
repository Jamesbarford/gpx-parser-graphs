#!/usr/bin/env bash

rm -rf dist-server dist-client
sh ./init_db.sh;
cd ./server || exit;
npm run build;
cp package.json ../dist-server && cd ../dist-server && npm install;
cd ../client && npm run build;
cd ../ && node ./dist-server;

