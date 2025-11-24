"use client";

import { AppProvider } from "@shopify/polaris";

import "@shopify/polaris/build/esm/styles.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.gemini3 = window.gemini3 || [];
            `,
          }}
        />
      </head>
      <body>
        <AppProvider>
          <div style={{ padding: "20px" }}>{children}</div>
        </AppProvider>
      </body>
    </html>
  );
}
