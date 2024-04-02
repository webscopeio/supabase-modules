import * as React from "react"
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import { EmailOtpType } from "@supabase/supabase-js"

import * as styles from "./_shared/styles"

const redirectTo = `/settings/accounts`
const type: EmailOtpType = "invite"
const confirmationURL = `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=${type}&next=${redirectTo}`

export default function Email() {
  return (
    <Html>
      <Head />
      <Preview>You have been invited</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Heading style={styles.h1}>You have been invited</Heading>
          <Text
            style={styles.text}
          >{`You have been invited to create a user on {{ .SiteURL}}. Click below to accept the invite:`}</Text>
          <Section style={styles.buttonContainer}>
            <Button style={styles.button} href={confirmationURL}>
              Accept the invite
            </Button>
          </Section>
          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            <Link
              href="https://supabase-modules-docs.vercel.app"
              target="_blank"
              style={{ ...styles.link, color: "#71717A" }}
            >
              Supabase Modules
            </Link>
            <br />
            Build smarter with pre-built modules today
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
