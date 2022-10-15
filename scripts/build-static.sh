#!/bin/bash

# ng build --configuration production
npm run build:production
rm -R ../sharenium-client/dist/*
cp -r dist/text-reader/* ../sharenium-client/dist
