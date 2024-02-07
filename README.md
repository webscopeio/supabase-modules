# Workspace

This repository is a pnpm workspace managed using [Turborepo](https://turbo.build/repo). It includes the following applications:

## Apps

- `docs`: a [Vitepress](https://vitepress.dev/) app - to learn about the project
- `playground`: another [Next.js](https://nextjs.org/) app - to play with the project

## Install

To install dependencies, run the following command from the root repository:

```bash
pnpm install
```

## Environment Variables

Please refer to `.env.example` when working environment variables from the root repository. You should set all variables in `.env` located in the root repository.

> Note: Environment Variables required to connect your project with your Supabase project are determined by your local or cloud instance.

## Develop

For development, run the following command from the root repository:

```bash
pnpm dev
```

- `docs` will be available in port 3001
- `playground` will be available in port 3000

## Build

To build, run the following command from the root repository:

```bash
pnpm build
```
