import React, { useState, useContext } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { initialize } from "next/dist/server/lib/render-server";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <>
      <Head>
        <title>Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        Run <i>yarn storybook</i> to see the components in action.
      </main>
    </>
  );
}
