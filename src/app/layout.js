import "./globals.css";
import Navbar from "../components/Navbar";
import I18nProvider from "../components/I18nProvider";

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
        <I18nProvider>
          <Navbar />
          <div className="pb-20">{children}</div>
        </I18nProvider>
      </body>
    </html>
  );
}


