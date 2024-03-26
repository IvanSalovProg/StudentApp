import { defineConfig } from "@umijs/max";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'npm',
  request: {},
  proxy: {
    '/student/': {
target: 'http://127.0.0.1:15301',
changeOrigin: true,
pathRewrite: {'^':''},
    }
  },
});
