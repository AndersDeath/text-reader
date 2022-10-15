#!/bin/bash

ng build --configuration production
rm -R ../sharenium-client/dist/*
cp -r dist/text-reader/* ../sharenium-client/dist
