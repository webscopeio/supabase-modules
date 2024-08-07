# Workspace

The Supabase Modules repository is a pnpm workspace managed using [Turborepo](https://turbo.build/repo). It includes the following applications:

## Apps

- `docs`: a [Vitepress](https://vitepress.dev/) app - to learn about the project
- `apps/next`: a [Next.js](https://nextjs.org/) app - to use the project

### Directory structure

There is no package/installable/CLI for the time being. The `apps/**` directory organizes by framework the modules source code and a Supabase project configuration for them.

For example, our [Next.js](https://nextjs.org/) app looks like this:

```
📂 docs
📂 apps
  📂 next
    📁 database
      📁 client
      📁 types
      📁 utils
    📁 supabase
      📁 migrations
```

- The UI lives colocated in the route's `_components` directory that belongs to the module demo'd.
- The logic lives in the `/database` directory categorized by module name.
- The database configuration lives in the `/supabase` directory where migrations can be identified by module name i.e. _profiles.sql_.

## Requirements

- Node: `>=20`,
- Package manager: `pnpm@8.15.1`

## Install

To install dependencies, run the following command from the root repository:

```bash
pnpm install
```

## Environment variables

Please refer to `.env.example` when working with environment variables. This repository is local-first development, so you should set all of your development variables in `.env.local` located in the root repository.

If you want to connect to a remote Supabase instance you can set all of your variables in `.env` located in the root repository.

If you do not have these, you may have to run Supabase locally first before development. Read more on [Your Supabase Instance](https://supabase-modules-docs.vercel.app/getting-started/supabase).

## Develop

For development, run the following command from the root repository:

```bash
pnpm db:start && pnpm dev
```

- `supbase` CLI will start your Supabase Instance at the response ports
- `docs` will be available in port 3001
- `playground` will be available in port 3000

> Remember to run `pnpm db:stop` to save resources once you are done working with your local Supabase Instance.

If you intended to develop with a cloud hosted Supabase Instance you only need to run:

```bash
pnpm dev:remote
```

## Build

To build, run the following command from the root repository:

```bash
pnpm build
```

## Contributing

Excited to hear that you are interested in contributing to this project! Please visit [Contributing](https://supabase-modules-docs.vercel.app/introduction/contributing.html)

## Documentation

To learn more about this project, please visit [Supabase Modules Documentation](https://supabase-modules-docs.vercel.app/).
