import type { Metadata } from "next";
import BlogsComingSoon from "@/components/sections/BlogsComingSoon";
import InteractiveBackground from "@/components/InteractiveBackground";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Blogs — Kunal Naskar",
  description: "Writing and notes from Kunal Naskar. Coming soon.",
};

export default function BlogsPage() {
  return (
    <>
      <SmoothScroll />
      <InteractiveBackground />
      <CustomCursor />
      <Navbar />
      <main className="relative">
        <BlogsComingSoon />
      </main>
    </>
  );
}
