# Email development

If you are starting from an example project - all emails are installed by default. Therefore, you can continue reviewing the rest of the information.

## Run a local email development server using React Email

We use [React Email](https://react.email/docs/cli), a collection of high-quality, unstyled components for creating beautiful emails using React and TypeScript. React Email also has a CLI that is able to start a local development server for email development. Here's how to integrate it into your existing project.

```bash
# Add dependencies
pnpm add react @react-email/components

# Add dev dependencies
pnpm add -D react-email
```

With these dependencies we will be able to create, develop and test our emails using React Email's development server and use their CLI to generate HTML files for our Supabase project.

Again, here are some commands you can add in your `package.json` for ease-of-use:

```json
"scripts": {
  "email:dev": "email dev -p 4000",
  "email:export": "email export --outDir supabase/templates --pretty",
}
```

::: warning
Before you run any of these commands make sure to create an `./emails` directory.
:::

## Set your email templates

::: code-group

```bash [Using degit]
degit webscopeio/supabase-modules/apps/next/emails emails
```

<<< ../../apps/next/emails/_shared/styles.ts[_shared/styles]
<<< ../../apps/next/emails/confirmation.tsx[confirmation]
<<< ../../apps/next/emails/email_change.tsx[email_change]
<<< ../../apps/next/emails/invite.tsx[invite]
<<< ../../apps/next/emails/magic_link.tsx[magic_link]
<<< ../../apps/next/emails/recovery.tsx[recovery]

:::

## Set your CLI configuration to include your email templates

You can customize all of the authentication emails in your CLI configuration using the `config.toml` file. This guide is only showcasing the invite email but you can read more about the other available email templates in [Customizing Email Templates](https://supabase.com/docs/guides/cli/customizing-email-templates).

```toml
[auth.email]
# Allow/disallow new user signups via email to your project.
enable_signup = true
# If enabled, a user will be required to confirm any email change on both the old, and new email
# addresses. If disabled, only the new email is required to confirm.
double_confirm_changes = true
# If enabled, users need to confirm their email address before signing in.
enable_confirmations = true

[auth.email.template.invite]
subject = "You have been invited"
content_path = "./supabase/templates/invite.html"

```

Remember, you will need to reset or restart your containers whenever the CLI configuration changes.

## Use Inbucket to capture emails sent from your local machine

Now you can use Inbucket to test the email templates, use different email addresses, see how the variables are being loaded into the emails and test the different authentication flows. You should be able to see both the generated HTML and Plain Text from your email templates.

These settings are only for local development. To update your hosted project, please copy the templates from `supabase/templates` into the [Email Templates](https://arc.net/l/quote/kjchbwqk) section of the Dashboard.

Keep in mind that for your production application you should update your SMTP configuration to use a service such as [Resend](https://resend.com). You can read more about this process in their guide [Supabase with SMTP](https://resend.com/docs/send-with-supabase-smtp)
