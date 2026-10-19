import "@/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SesionProvider } from "@/context/SesionContext";
config.autoAddCss = false;



export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <SesionProvider>{children}</SesionProvider>
      </body>
    </html>
  );
}
