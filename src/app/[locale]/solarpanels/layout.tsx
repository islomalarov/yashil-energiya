import type { Metadata } from "next";
import "@/scss/globals.scss";

export const metadata: Metadata = {
  title: "QFES",
  description: "Generated by create next app",
};

export default function SolarPanelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
