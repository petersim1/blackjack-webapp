/** @type {import('next').NextConfig} */
const stylexPlugin = require('@stylexjs/nextjs-plugin');

module.exports = stylexPlugin({
  rootDir: __dirname,
})({});
