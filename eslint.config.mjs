import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      import: importPlugin,
    },
  },
  {
    // Strict app layer rules - pages cannot import directly from libs/utils
    files: ["app/**/page.tsx", "app/**/layout.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/utils/server",
              message: "app/**/page.tsx should delegate to features/, not import utilities directly.",
            },
            {
              name: "@/utils/client",
              message: "app/**/page.tsx should delegate to features/, not import utilities directly.",
            },
            {
              name: "@/lib/api",
              message: "app/**/page.tsx should delegate to features/, not call APIs directly.",
            },
            {
              name: "@/lib/api/server",
              message: "app/**/page.tsx should delegate to features/, not call APIs directly.",
            },
            {
              name: "@/lib/api/client",
              message: "app/**/page.tsx should delegate to features/, not call APIs directly.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
