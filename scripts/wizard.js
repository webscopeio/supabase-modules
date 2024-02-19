const {
  intro,
  outro,
  confirm,
  select,
  multiselect,
  spinner,
  isCancel,
  cancel,
  text,
} = require("@clack/prompts");
const color = require("picocolors");
const { existsSync } = require("node:fs");

const util = require("node:util");
const asyncExec = util.promisify(require("node:child_process").exec);

function handleCancel(currentProcess, message = "Operation cancelled") {
  if (isCancel(currentProcess)) {
    cancel(message);
    return process.exit(0);
  }
}

async function wizard() {
  intro(`Welcome to ${color.magenta("Supabase Modules")} 🥡`);

  const projectStarter = await select({
    message: `${color.italic("How")} would you like to begin?`,
    default: "from-example",
    options: [
      {
        label: "Start from an Example",
        value: "from-example",
        hint: "Jumpstart your development by cloning an Example project",
      },
      {
        label: "Add to Existing Project",
        value: "existing-project",
        hint: "Not available but coming soon",
      },
    ],
  });

  handleCancel(projectStarter);

  if (projectStarter === "from-example") {
    const framework = await select({
      message: `${color.italic("Which")} framework would you like to use?`,
      default: "next",
      options: [
        {
          label: "Next",
          value: "next",
          hint: "using app router",
        },
        {
          label: "Remix",
          value: "remix",
          hint: "Not available but coming soon",
        },
      ],
    });

    handleCancel(framework);

    if (framework !== "next") {
      outro(
        `✅ ${color.green`Nothing to do here!`} Make sure to check out our docs at: \n ${color.magenta(
          "https://supabase-modules-docs.vercel.app"
        )} (hold cmd or ctl to click on URL)`
      );
      return process.exit(0);
    }

    const dir = await text({
      message: `Which is your ${color.italic("project's working directory")}?`,
      initialValue: ".",
      validate: (dirInput) => {
        const dirExists = existsSync(dirInput);
        if (!dirExists) {
          return "Not found - please make sure the directory provided exists.";
        }
      },
    });

    handleCancel(dir);

    const installAllModules = await confirm({
      message: `Would you like to install ${color.italic("all modules")}?`,
      default: true,
    });

    handleCancel(installAllModules);

    if (installAllModules) {
      const s = spinner();
      s.start("Installing project files... 👷🏽");
      await asyncExec(
        `degit iamhectorsosa/supabase-modules/apps/next/supabase ${dir}/supabase --force`
      );
      await asyncExec(
        `degit iamhectorsosa/supabase-modules/apps/next/modules ${dir}/modules --force`
      );

      s.stop("Project files successfully installed 👷🏽");

      outro(
        `✅ ${color.green(
          "Success"
        )}: All set! Make sure to check out our docs at: \n ${color.magenta(
          "https://supabase-modules-docs.vercel.app"
        )} (hold cmd or ctl to click on URL)`
      );
      return process.exit(0);
    }

    const modulesToInstall = await multiselect({
      message: `${color.italic(
        "Select which modules"
      )} would you like to install.`,
      options: [
        { value: "auth", label: "Authentication" },
        { value: "profile", label: "Profile" },
      ],
    });

    handleCancel(modulesToInstall);

    const s = spinner();
    s.start("Installing project files... 👷🏽");

    for (module in modulesToInstall) {
      await asyncExec(
        `degit iamhectorsosa/iamhectorsosa/src/components/layout ${dir}/supabase --force`
      );
    }

    s.stop("Project files successfully installed 👷🏽");

    outro(
      `✅ ${color.green(
        "Success"
      )}: All set! Make sure to check out our docs at: \n ${color.magenta(
        "https://supabase-modules-docs.vercel.app"
      )} (hold cmd or ctl to click on URL)`
    );
    return process.exit(0);
  }

  outro(
    `✅ ${color.green`Nothing to do here!`} Make sure to check out our docs at: \n ${color.magenta(
      "https://supabase-modules-docs.vercel.app"
    )} (hold cmd or ctl to click on URL)`
  );
}

wizard().catch((err) =>
  console.error(`${color.red`Error: wizard.js failed with`} ${err}`)
);
