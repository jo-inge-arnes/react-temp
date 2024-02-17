/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    jsxInject: "import React from 'react'",
  },
  test: {
    environment: "jsdom",
    globals: true,
    css: true,
    setupFiles: "./setupTest.ts",
  },
});
