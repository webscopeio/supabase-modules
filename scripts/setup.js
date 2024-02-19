const util = require("node:util");
const asyncExec = util.promisify(require("node:child_process").exec);
const fs = require("node:fs/promises");
const { existsSync } = require("node:fs");

async function setup() {
  const { stdout: pnpmVersion } = await asyncExec("pnpm --version");

  if (!pnpmVersion) {
    throw new Error("`pnpm` is required to run this script.");
  }

  console.info(
    "Welcome! We're just settings things up, hold a minute... 🕰️ \n"
  );

  const packageJsonExists = existsSync("./package.json");

  if (!packageJsonExists) {
    await asyncExec("pnpm init").catch((err) => {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error("Unknown error with `packageJsonExists`");
    });
  }

  console.info("Adding dependencies... 📦");
  await asyncExec("pnpm i -D @clack/prompts picocolors degit").catch((err) => {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("Unknown error with `pnpm install`");
  });

  console.info("Adding scripts... 📃");
  const packageJsonString = await fs.readFile("./package.json", {
    encoding: "utf8",
  });

  if (packageJsonString) {
    try {
      let packageJsonParsed = JSON.parse(packageJsonString);
      packageJsonParsed.scripts["db:install-modules"] =
        "node ./scripts/wizard.js";
      const newPacakgeJson = JSON.stringify(packageJsonParsed, null, 2);
      await fs.writeFile("./package.json", newPacakgeJson);
    } catch (err) {
      throw new Error(`Failed parsing \`package.json\` file: ${err}`);
    }
  }

  console.info(
    "✅ Success: You can run the Supabase Modules wizard using `pnpm db:install-modules`"
  );
}

setup().catch((err) => console.error(`Error: setup.ts failed with: ${err}`));
