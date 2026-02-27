import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login — Wealthup",
  description: "Log in to access the Wealthup dashboard demo.",
};

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
