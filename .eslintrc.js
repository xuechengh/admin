// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    jquery: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
     // allow async-await
     'generator-star-spacing': 'error',
     // allow debugger during development
     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
     'no-unused-vars': [0, {"vars": "all", "args": "after-used"}],
     'no-trailing-spaces':0,
     "no-multiple-empty-lines": [0, {"max": 2}],
     "indent": [0, 4],
     "key-spacing": [0, { "beforeColon": false, "afterColon": true }],
     "space-before-blocks": [0, "always"],
     "space-infix-ops": 2,
     'keyword-spacing':0,
     "space-before-function-paren": [0, "always"],
     "eol-last": 0,
     "no-unmodified-loop-condition":0,
     "semi": [0, "always"],
     "semi-spacing": [0, {"before": false, "after": true}],
     "no-undef": 0,
     "no-unused-expressions": 0,
     "space-infix-ops": 0,
     "padded-blocks": 0,
     "arrow-spacing": 0,
     "comma-spacing": 0,
     "quotes": [0, "single"],
     "no-tabs":0,
     "no-multi-spaces": 0,
     "one-var": 0,
     "eqeqeq": 0,
     "no-irregular-whitespace": 0,
     "comma-dangle": [0, "never"],
     "no-dupe-keys": 0,
     "brace-style": [0, "1tbs"],
     "curly": [0, "all"],
     "no-array-constructor": 0,
     "space-unary-ops": [0, { "words": true, "nonwords": false }],
     "no-mixed-spaces-and-tabs": [0, false],
     "new-cap": 0,
     "block-spacing":0,
     "no-sequences": 0,
     "yoda": [0, "never"],
     "no-return-assign": 0,
     "no-use-before-define": 0,
     "no-mixed-operators": [0, {"allowSamePrecedence": false}],
     "no-floating-decimal": 0,
     "no-redeclare": 0,
     "new-parens":0,
     "wrap-iife": [0, "inside"],
     "no-cond-assign": 0,
     "no-useless-escape":0,
     "no-fallthrough": 0,
     "no-labels": 0,
     "no-useless-call": 0,
     "no-label-var": 0,
     "no-new-func": 0,
     "no-self-assign":0,
     "no-self-compare": 0,
     "handle-callback-err":0,
     "space-in-parens": [0, "never"],
     "object-property-newline":0,
     "spaced-comment": [0, "always", { "markers": "/" }],
     "no-whitespace-before-property": 0
  }
}
