import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../components/Navbar";
import I18nProvider from "../components/I18nProvider";
import BodyClassController from "../components/BodyClassController";
import TopButtons from "../components/TopButtons";

export const metadata = {
  title: "Buddiz",
  description: "",
  manifest: "/manifest.json",
  themeColor: "#000000",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-512x512.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <BodyClassController exclude={["/"]} />
        <I18nProvider>
          <Navbar />
          <TopButtons />
          <div className="pb-20">{children}</div>
        </I18nProvider>
      </body>
    </html>
  );
}


