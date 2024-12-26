import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/dist", "**/.eslintrc.cjs"],
}, ...compat.extends("eslint:recommended").map(config => ({
    ...config,
    files: ["**/*.{js,jsx,cjs,mjs}"],
})), {
    files: ["**/*.{js,jsx,cjs,mjs}"],
    plugins: {},

    linterOptions: {
        reportUnusedDisableDirectives: true,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: "latest",
        sourceType: "module",
    },

    settings: {
        "eslint/report-unused-disable-directives": "error",
    },

    rules: {
        "no-unused-vars": "error",
        "no-undef": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
    },
}];