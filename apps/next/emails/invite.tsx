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

const type: EmailOtpType = "invite"
const confirmationURL = `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=${type}`

export default function Email() {
  return (
    <Html>
      <Head />
      <Preview>You have been invited</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Heading style={styles.h1}>You have been invited</Heading>
          <Text style={styles.text}>
            Click on <b>Accept Invite</b> or use a <b>One-time password</b>:
          </Text>
          <Section style={styles.buttonContainer}>
            <Button style={styles.button} href={confirmationURL}>
              Accept Invite
            </Button>
          </Section>
          <Text>
            <code style={styles.code}>{`{{ .Token }}`}</code>
          </Text>
          <Text
            style={{
              ...styles.text,
              color: "#71717A",
            }}
          >
            If you don&apos;t recognize this invite, you can safely ignore this
            email.
          </Text>
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
