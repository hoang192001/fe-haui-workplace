module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended'
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['react', 'react-hooks'],
  
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-extra-boolean-cast': 0,
      "react/no-unknown-property": ['error', { ignore: ['css'] }],
      'no-undef': 1,
      'no-console': 1,
      'no-param-reassign': [
        'warn',
        {
          props: true,
          ignorePropertyModificationsFor: ['draft', 'sketch', 'outline'],
        },
      ],
      'no-unused-vars': ['warn', { vars: 'local', args: 'after-used', ignoreRestSiblings: false }],
      camelcase: 'warn'
    },
  }
  