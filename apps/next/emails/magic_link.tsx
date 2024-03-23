import * as React from "react";
import * as styles from "./_components/styles";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";

export default function Email() {
  return (
    <Html>
      <Head />
      <Preview>Your One-Time password</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Heading style={styles.h1}>Your One-Time password</Heading>
          <Text style={styles.text}>Copy and paste this temporary code:</Text>
          <code style={styles.code}>{`{{ .Token }}`}</code>
          <Text
            style={{
              ...styles.text,
              color: "#71717A",
            }}
          >
            If you didn&apos;t try to log in, you can safely ignore this email.
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
  );
}
