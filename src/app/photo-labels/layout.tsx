import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Labeling Workspace",
  robots: { index: false, follow: false },
};

export default function PhotoLabelsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
