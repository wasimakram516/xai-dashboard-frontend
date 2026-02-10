import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: {
    default: "GlassLearn",
    template: "%s | GlassLearn",
  },
  description:
    "An educator-oriented decision-support dashboard integrating machine learning and Explainable AI (XAI) to predict and interpret student performance using the Open University Learning Analytics Dataset (OULAD).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
