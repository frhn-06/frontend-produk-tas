// import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";

import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import LandingPage from "@/components/views/LandingPage";
import { signOut } from "next-auth/react";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function Home() {
  return (
    <LandingPageLayout title="Velaro Official">
      <LandingPage />
    </LandingPageLayout>
  );
}
