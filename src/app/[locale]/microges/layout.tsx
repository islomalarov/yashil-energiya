import type { Metadata } from "next";
import "@/scss/globals.scss";

export const metadata: Metadata = {
  title: "Mikro GES",
  description: "Generated by create next app",
};

export default function MicroGesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
