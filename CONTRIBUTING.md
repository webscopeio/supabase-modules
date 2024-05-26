# Contributing

Excited to hear that you are interested in contributing to this project! Thank you!

> Warning: This contributing guide is **still** work in progress and subject to change

## Modules structure

### What is a module?

Modules are a contained group of logic to support a specific feature or domain (i.e., User Module contains authentication, profile, avatars, etc.). They could be as broad or specific as you would like, so long as they contain everything they need to operate independently.

High level modules should only be dependant on low level modules like User. If you create a module that is cross-depandant on multiple modules, you should consider combining these into a single module.

Modules are organzied in the `apps/` folder by framework. Each framework folder contains also runnable project along wit the modules source code.

### Module structure

Modules contain async functions (Server Actions) that abstract Supabase database interaction. They are located in `modules` directory and are divided into subdirectories by feature or domain (i.e., `user` module for authentication, profile, avatar, etc.).

- Each module contains supporting UI components to demo its functionality. These are located in the `components` directory.
- Module component structure should mimic the same structure as their supporting modules (i.e., `modules/user` module component should be located in `components/user` directory).
- The `components/ui` directory only contains general purpose UI elements.

### Components

- We use [`shadcn/ui`](https://ui.shadcn.com/docs) for components in the project
- Names of UI component files are written in kebab case
- All components should be typed using `React.FC`
- All component-supporting functions should be declared using the keyword `function`
- To compose or combine CSS classes please make use of the `cn` utility from `lib/utils`

#### Zod

We use [`zod`](https://zod.dev/) for input validation and parsing values. It provides parsing and validation of values as well as static type inference.

### Data queries and manipulation

The UI parts implement some sort of functionality, many times related to the database. To fetch or manipulate data in the UI part component we use [`@tanstack/react-query`](https://tanstack.com/query/latest) library. There is a support for multiple javascript frameworks including React and Vue.

## Database

### Database development

Database development should take place locally using the Supabase Studio or Supabase CLI. After making changes to the DB it is necessary to save perserve them using migrations files. A migration file is a set of SQL commands that will be executed at database reset or init. It usually incorporates creation of the tables, setting security, creating custom functions and triggers, etc. Migration files are stored in the given framework project in the directory `supabase/migrations` are prefixed with the timestamp, for example: `20240214100236_user.sql`.

#### Save changes made to the database

New changes to database can be stored using diffing. After making changes locally using for example Studio we now need to store new changes. The Supabase CLI command [`supabase db diff`](https://supabase.com/docs/reference/cli/supabase-db-diff) can be used for this:

```shell
supabase db diff --schema auth,public --use-migra user -f user
```

The above code will create a new migration file containing the new changes (that are not included in the previous migration files) with the "user" postfix in the `migrations` folder.

Due to modularity goals of this project, we also want to keep migrations file in the squashed format for given module. For example, in the `modules/user` there is an `migrations.sql` that contains all the SQL code that should be applied to the DB when extracting only the user module to the target project. Currently there is not known Supabase CLI command that can create squashed migration file on table level, so this needs to be maintained manually every time new migrations for the given module are added to the `supabase/migrations` folder.

#### Testing migration changes

Test migration changes using the `reset` command. It will apply all SQL commands contained in the files in `supabase/migrations` folder:

```shell
supabase db reset
```
