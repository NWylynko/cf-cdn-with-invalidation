import { PropsWithChildren } from "react";
import "./globals.css";
import { QueryProvider } from "./QueryProvider";

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{props.children}</QueryProvider>
      </body>
    </html>
  );
}
