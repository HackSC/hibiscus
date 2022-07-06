APP = $1

# these can often be not pre-installed on the Vercel build server so we install them here
NX_VER = $(node -e "console.log(require('./package.json').devDependencies['@nrwl/workspace'])")
TS_VER = $(node -e "console.log(require('./package.json').devDependencies['@nrwl/workspace'])")

# Install @nrwl/workspace in order to run the affected command
yarn add --dev @nrwl/workspace@$NX_VER --prefer-offline
yarn add --dev typescript@$TS_VER --prefer-offline

npx nx-ignore $APP --verbose