module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/jsx-indent": "off",
    "react/forbid-prop-types": "off",
    "arrow-body-style": "off",
    "max-len": "off",
    "linebreak-style": "off",
    "quotes": "off",
    "indent": "off",
    "comma-dangle": "off",
    "eol-last": "off",
    "arrow-parens": "off",
    "space-before-function-paren": "off",
    "object-curly-spacing": "off",
    "global-require": "off",
    "no-unused-expressions": "off",
    "no-nested-ternary": "off",
    "no-constant-condition": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/img-redundant-alt": "off"
  },
};
