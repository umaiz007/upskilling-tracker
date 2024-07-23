"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator, Button } from "@aws-amplify/ui-react";
import Todos from "./Todos";
Amplify.configure(config);

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Todo</h1>
      <Authenticator>
        {({ signOut }) => (
          <div className={styles.main}>
            <Todos />
            <Button onClick={signOut}>Sign Out</Button>{" "}
          </div>
        )}
      </Authenticator>
    </main>
  );
}
