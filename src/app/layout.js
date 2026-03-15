// src/app/layout.js
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavbarWrapper from "../components/NavbarWrapper";
import I18nProvider from "../components/I18nProvider";
import BodyClassController from "../components/BodyClassController";
import TopButtonsWrapper from "../components/TopButtonsWrapper";
import AuthLayoutClient from "../components/AuthLayoutClient";

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
      <body className="bg-[url(/BG.svg)]">
        <BodyClassController exclude={["/"]} />
        <I18nProvider>
          <NavbarWrapper />
          <TopButtonsWrapper />
          <AuthLayoutClient>
            <div className="pb-20">{children}</div>
          </AuthLayoutClient>
        </I18nProvider>
      </body>
    </html>
  );
}