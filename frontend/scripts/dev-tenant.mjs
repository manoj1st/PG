import { spawn } from "node:child_process";

const args = process.argv.slice(2);
const orgId = args[0];
const port = args[1];

if (!orgId || !port) {
  console.error("Usage: node scripts/dev-tenant.mjs <orgId> <port> [extra vite args...]");
  process.exit(1);
}

const extraViteArgs = args.slice(2);
const viteArgs = ["vite", "--port", port, ...extraViteArgs];

const child = spawn("npx", viteArgs, {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    VITE_ORG_ID: orgId,
    VITE_API_BASE_URL: process.env.VITE_API_BASE_URL || "http://localhost:5000/api"
  }
});

child.on("exit", (code) => process.exit(code ?? 0));
