module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
    plugins: ['no-null', '@theobassan'],
    rules: {
        'no-null/no-null': 2,
        '@typescript-eslint/no-unused-vars': 2,
        '@typescript-eslint/no-explicit-any': 2,
        '@theobassan/max-params': ['error', { max: 1, allowArraysCallbacks: true }],
        'max-depth': ['error', { max: 3 }],
        'max-lines': ['error', { max: 60 }],
        'max-lines-per-function': ['error', { max: 30 }],
        'max-nested-callbacks': ['error', { max: 3 }],
        'max-statements': ['error', { max: 10 }],
        'max-statements-per-line': ['error', { max: 1 }],
    },
};
