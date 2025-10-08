import "./globals.css";
import Navbar from "../components/Navbar";
import I18nProvider from "../components/I18nProvider";

export const metadata = {
  title: "Buddiz",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <I18nProvider>
          <Navbar />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}


