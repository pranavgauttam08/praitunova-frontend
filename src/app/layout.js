import { Poppins, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "../lib/site";

// Self-hosted via next/font instead of the old globals.css @import to
// fonts.googleapis.com: that was a render-blocking external request (extra
// DNS + TLS round trip) pulling every weight 300-900 regardless of use.
// This subsets to only the weights actually used, preloads, and serves
// from the same origin with font-display: swap built in.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const TITLE = "Praitunova Infotech | Enterprise IT Solutions";
const DESCRIPTION = "Comprehensive IT Services Tech Stack engineered for enterprise scale. Software, Cloud, AI, Cyber Security, and Infrastructure solutions based in Mumbai.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Praitunova Infotech",
    images: ["/assets/logo.jpeg"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/assets/logo.jpeg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
