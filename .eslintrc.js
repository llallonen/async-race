module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb-base",
        "airbnb-typescript/base"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": [
            "./tsconfig.json"
        ],
    },
    "plugins": [
        "prettier",
        "import",
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/no-explicit-any": 2,
        "no-debugger": "off",
        "no-console": 0,
        "class-methods-use-this": "off",
        "import/prefer-default-export": "off"
    }
}
