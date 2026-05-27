import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { StatsDashboard } from "@/components/StatsDashboard";
import { PolicyModal } from "@/components/PolicyModal";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Binary Growth | Defining New Media",
  description:
    "We grow creators and brands across YouTube, podcasts, and short-form video. 2B+ views generated, 30K+ videos produced, 480+ relationships built.",
  keywords:
    "video production, YouTube growth, podcast production, short-form video, creator economy, media agency, brand launch",
  openGraph: {
    title: "Binary Growth | Defining New Media",
    description:
      "We grow creators and brands across YouTube, podcasts, and short-form video. 2B+ views generated, 30K+ videos produced, 480+ relationships built.",
    type: "website",
    url: "https://www.binarygrowth.com",
    siteName: "Binary Growth",
    locale: "en_US",
    images: [
      {
        url: "https://www.binarygrowth.com/white_logo.png",
        width: 800,
        height: 800,
        alt: "Binary Growth Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Binary Growth | Defining New Media",
    description:
      "We grow creators and brands across YouTube, podcasts, and short-form video.",
    images: ["https://www.binarygrowth.com/white_logo.png"],
  },
  icons: {
    icon: "/white_logo.png",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Binary Growth",
  "url": "https://www.binarygrowth.com",
  "logo": "https://www.binarygrowth.com/white_logo.png",
  "description": "We grow creators and brands across YouTube, podcasts, and short-form video. 2B+ views generated, 30K+ videos produced.",
  "sameAs": [
    "https://youtube.com",
    "https://instagram.com",
    "https://linkedin.com",
    "https://twitter.com"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "contact@binarygrowth.com"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${playfair.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body suppressHydrationWarning>
        <AnalyticsTracker />
        <StatsDashboard />
        <PolicyModal />
        {children}
      </body>
    </html>
  );
}
