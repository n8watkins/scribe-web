"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { reportError } from "@/lib/error-reporting";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => reportError(error), [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <Link href="/" className={`flex items-center gap-2.5 rounded-lg ${FOCUS}`}>
        <Image src="/scribe-icon-64.png" alt="" width={28} height={28} />
        <span className="font-bold leading-none tracking-tight">Scribe</span>
      </Link>
      <p className="mt-12 text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Something went wrong</p>
      <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">This page didn&apos;t load.</h1>
      <p className="mt-4 max-w-md text-pretty text-lg text-mute">
        It&apos;s a problem with the website, not the Scribe app, and it has been reported. Try again in a moment.
      </p>
      <div className="mt-9 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-cyan to-purple px-7 py-3.5 font-semibold text-bg shadow-lg shadow-cyan/20 transition hover:brightness-110 ${FOCUS}`}
        >
          Try again
        </button>
        <Link
          href="/"
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-full border border-edge-strong bg-card px-6 py-3.5 font-semibold text-ink transition hover:border-cyan/60 ${FOCUS}`}
        >
          Go to the home page
        </Link>
      </div>
    </main>
  );
}
