// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('./with-nx.js');

/**
 * @type {import('./with-nx.js').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

module.exports = withNx(nextConfig);
