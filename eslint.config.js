/** @type {import("eslint").FlatConfig[]} */
const next = require('eslint-config-next');

/** @type {import('eslint').FlatConfig[]} */
module.exports = [
  ...next(),
  {
    ignores: ["node_modules"],
    rules: {
      "no-console": "warn",
    },
  },
];
