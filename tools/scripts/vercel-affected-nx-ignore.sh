#!/bin/bash

set -e

APP=$1

# check if app in branch filesystem; if so then proceed
if [ ! -d "./apps/$APP" ]; then
	echo "App $APP doesn't exist in this checkout's filesystem; skipping build..."
	exit 0;
fi

# these can often be not pre-installed on the Vercel build server so we install them here
NX_VER=$(node -e "console.log(require('./package.json').devDependencies['@nrwl/workspace'])")
TS_VER=$(node -e "console.log(require('./package.json').devDependencies['typescript'])")

# Install @nrwl/workspace in order to run the affected command
yarn add --dev @nrwl/workspace@$NX_VER typescript@$TS_VER --prefer-offline

npx nx-ignore $APP --verbose