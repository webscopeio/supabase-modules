# Contributing

Excited to hear that you are interested in contributing to this project! Thank you!

> Warning: This contributing guide is still work in progress.

## Modules structure

Modules are organzied in the `apps/` folder by framework. Each framework folder contains also runnable project along wit the modules source code.

The modules contain async functions that abstract Supabase database interaction for the general use cases. They are located in `modules/` folder and are divided into subfolders by features (e.g. `user/` subfolder for authentication or profile management).

The UI elements / parts are located in `components/` folder. The `components/ui` subfolder contains general purpose reusable UI elements. Other folders in the `components/` directory contain components per feature (e.g. user management components are in `components/user` subfolder).

The `lib/` folder is for helpers used across the app.

_Please perserve the described file structure when developing in the project._

## Code convention

Functions are declared with the `function` keyword.

### Components

We use [`shadcn/ui`](https://ui.shadcn.com/docs) for components in the project.

Names of UI component files are written in lowercase. If the name consists of two or more words use hyphen (e.g. `dynamic-navigation-links.tsx`).

Also note the usage of `cn()` utility. We use the own implementation from the `lib/utils` that wraps `clsx` utility with `twMerge`.

#### Zod

We use [`zod`](https://zod.dev/) for input validation and parsing values. It provides parsing and validation of values as well as static type inference.

### Data queries and manipulation

The UI parts implement some sort of functionality, many times related to the database. To fetch or manipulate data in the UI part component we use [`@tanstack/*-query`](https://tanstack.com/query/latest) library. There is a support for multiple javascript frameworks including React and Vue.

## Database

### Database development

Database can be developed locally using the Supabase Studio or Supabase CLI. After making changes to the DB it is necessary to save perserve them using migrations files. A migration file is a set of SQL commands that will be executed at database reset or init. It usually incorporates creation of the tables, setting security, creating custom functions and triggers, etc. Migration files are stored in the given framework project in the directory `supabase/migrations/` are prefixed with the timestamp, for example: `20240214100236_user.sql`.

#### Save changes made to the database

New changes to database can be stored using diffing. After making changes locally using for example Studio we now need to store new changes. The Supabase CLI command [`supabase db diff`](https://supabase.com/docs/reference/cli/supabase-db-diff) can be used for this:

```shell
supabase db diff --schema auth,public --use-migra user -f user
```

The above code will create a new migration file containing the new changes (that are not included in the previous migration files) with the "user" postfix in the `migrations` folder.

Due to modularity goals of this project, we also want to keep migrations file in the squashed format for given module. For example, in the `modules/user/` there is an `migrations.sql` that contains all the SQL code that should be applied to the DB when extracting only the user module to the target project. Currently there is not known Supabase CLI command that can create squashed migration file on table level, so this needs to be maintained manually every time new migrations for the given module are added to the `supabase/migrations/` folder.

#### Applying changes from migrations to the database

To apply the changes from the migrations we can use the `reset` command. It will apply all SQL commands contained in the files in `supabase/migrations/` folder:

```shell
supabase db reset
```
