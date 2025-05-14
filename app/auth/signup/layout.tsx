import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign Up | Acme",
  description: "Create a new account",
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
