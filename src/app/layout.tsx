import QueryClientProvider from "@lib/context/query-context"
import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">
          <QueryClientProvider>{props.children}</QueryClientProvider>
        </main>
      </body>
    </html>
  )
}
