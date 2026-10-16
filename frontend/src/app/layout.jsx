import "@/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SesionProvider } from "@/context/SesionContext";
import Image from "next/image";
import Link from "next/link";
config.autoAddCss = false;

export const metadata = {
  title: "RBO - Inicio",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <SesionProvider>{children}</SesionProvider>
      </body>
    </html>
  );
}
