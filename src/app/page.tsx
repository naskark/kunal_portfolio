import { getPortfolio } from "@/lib/portfolio-service";
import SmoothScroll from "@/components/SmoothScroll";
import InteractiveBackground from "@/components/InteractiveBackground";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Work from "@/components/sections/Work";
import Skills from "@/components/sections/Skills";
import Blogs from "@/components/sections/Blogs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default async function Home() {
  const data = await getPortfolio();

  return (
    <>
      <Preloader name={data.profile.name} />
      <SmoothScroll />
      <InteractiveBackground />
      <CustomCursor />
      <Navbar />

      <main className="relative">
        <Hero data={data} />
        <About data={data} />
        <Experience data={data} />
        <Work data={data} />
        <Skills data={data} />
        <Blogs />
        <Contact data={data} />
      </main>

      <Footer data={data} />
    </>
  );
}
