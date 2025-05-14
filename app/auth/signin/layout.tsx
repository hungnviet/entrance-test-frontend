import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Log In | Acme",
  description: "Log in to your account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        {children}
      </>
  );
}
