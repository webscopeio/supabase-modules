# Contributing

Excited to hear that you are interested in contributing to this project! Thank you!

> Warning: This contributing guide is still work in progress.

## Modules structure

Modules are organzied in the `apps/`folder by framework. Each framework folder contains also runnable project along wit the modules source code.

The modules contain async functions that abstract Supabase database interaction for the general use cases. They are located in `modules/` folder and are divided into subfolders by features (e.g. `user/` subfolder for authentication or profile management).

The UI elements / parts are located in `components/` folder. The `components/ui` subfolder contains general purpose reusable UI elements. Other folders in the `components/` directory contain components per feature (e.g. user management components are in `components/user` subfolder).

The `lib/`folder is for helpers used across the app.

_Please perserve the described file structure when developing in the project._

## Code convention

Functions are declared with the `function` keyword.

### Components

Components are written as function components in the decomposed manner so developers of the target projects can use and combine parts according to their needs. We specify `displayName` for each exported component. Feel free to use the currently implemented components as an example when creating new.

Names of UI component files are written in lowercase. If the name consists of two or more words use hyphen (e.g. `dynamic-navigation-links.tsx`).

#### Component variants

When creating a component that has mupltiple variants (e.g. Alert - informational, destructive, default) we use `class-variance-authority` package. It allows to specify `className` strings for various variants as well as specify base className and default variant. For example:

```ts
import { cva, type VariantProps } from "class-variance-authority";

const alertVariants = cva("base class names", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive: "border-destructive/50 text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
```

... and use in component using the variantSchema and `VariantProps` type

```tsx
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ...
    className={cn(alertVariants({ variant }), className)}
    ...
  />
))
```

Also note the usage of `cn()` utility. We use the own implementation from the `lib/utils` that wraps `clsx` utility with `twMerge`.

#### Zod

We use `zod` for input validation and parsing values. It is beneficial to also use it for parsing values instead of raw parse, type casting and catching exceptions. It allows for more fine-grained validation of the parsed value. For example instead of:

```ts
let error: SearchParamError;
// searchParams.error is a string
try {
    error = JSON.parse(searchParams.error) as SearchParamError
} catch (e) {
    error = <...some fallback value>
}
```

you can do:

```ts
import * as z from "zod";

const ErrorSchema = z
  .string()
  .transform((errorStr, ctx): z.infer<ReturnType<typeof JSON.parse>> => {
    try {
      return JSON.parse(errorStr);
    } catch (e) {
      ctx.addIssue({
        message: "Invalid JSON string",
        code: z.ZodIssueCode.custom,
      });
      return z.NEVER;
    }
  })
  .pipe(
    z.object({
      message: z.string(),
      status: z.number(),
    })
  )
  .catch({ message: "An error occurred", status: 500 });

ErrorSchema.parse(searchParams.error);
```

The above code will take care for error handling during parsing query param string, parsing JSON from string, checking if the successfully parsed JSON has the properties defined in the schema and returning a fallback value if any of the mentioned validations fail. All this with automatic type casting.

### Data queries and manipulation

The UI parts implement some sort of functionality, many times with the databse. To fetch or manipulate data in the UI part component we use [`@tanstack/*-query`](https://tanstack.com/query/latest) library. There is a support for multiple javascript frameworks including React and Vue.

## Database

### Database development

Database can be developed locally using the Supabase Studio or Supabase CLI. After making changes to the DB it is necessary to save perserve them using migrations files. A migration file is a set of SQL commands that will be executed at database reset or init. It usually incorporates creation of the tables, setting security, creating custom functions and triggers, etc. Migration files are stored in the given framework project in the directory `supabase/migrations/` are prefixed with the timestamp, for example: `20240214100236_user.sql`.

#### Save changes to database

New changes to database can be stored using diffing. After making changes locally using for example Studio we now need to store new changes. The Supabase CLI command [`supabase db diff`](https://supabase.com/docs/reference/cli/supabase-db-diff) can be used for this:

```shell
supabase db diff --schema auth,public --use-migra user -f user
```

The above code will create a new migration file with the "user" postfix in the `migrations` folder.

For modularity goals of this project, we also want to keep migrations file in the squashed format for given module. For example, in the `modules/user/` there is an `migrations.sql` that contains all the SQL code that should be applied to the DB when extracting only the user module to the target project. Currently there is not known Supabase CLI command that can create squashed migration file on table level, so this needs to be maintained manually every time new migrations for the given module are added to the `supabase/migrations/` folder.
