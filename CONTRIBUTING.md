# Contributing

Excited to hear that you are interested in contributing to this project! Thank you!

> Warning: This contributing guide is still work in progress.

## Requisites

The Supabase Modules repository is a pnpm workspace managed using [Turborepo](https://turbo.build/repo). Once you have read and configured your workspace, you can continue with this guide.

## 1. Supabase local-first development

All development takes place locally, which also includes your very own Supabase instance. There is no sharing of environment variables. You will find an `.env.example` file as a guide of the environment variables needed for development.

Please make sure to read [Your Supabase Instance](https://supabase-modules-docs.vercel.app/getting-started/supabase.html) before getting started.

## 2. Creating Database Migrations

Each module directory contains a copy of the migrations needed to support it. However, all database migrations need to be generated locally using `supabase db diff`, read more about [Supabase CLI - Diffs Schema Changes](https://supabase.com/docs/reference/cli/supabase-db-diff).

## 3. Pushing Database Migrations

Database Migrations are not pushed manually to the project's remote Supabase Instance. A GitHub actions workflow using [Supabase Setup-CLI](https://github.com/supabase/setup-cli) has been set for this purpose. 

Once your changes are merged to main, the workflow will push any new migrations to the remote Supabase Instance.

## 4. Create a backup for Database Migrations

In order to simplify our internal process please make sure to copy the migration file's content into a `migrations.sql` file corresponding to your module.

## 5. Creating Hooks and Components

React Hooks are the bread and butter of Supabase Modules. Once the Database logic is working, we need to create the hooks and UI to use it. Supabase Modules internally uses [TanStack Query](https://tanstack.com/query/latest). All of the hooks are created and grouped by Module in the `/modules` directory. 

We strongly recommend creating routes and components to demo your module. React Components are created and grouped by Module in the `/components` directory.

Make sure to see the existing pattern before getting started.