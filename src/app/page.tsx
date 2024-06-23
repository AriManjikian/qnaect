import FeaturedComponent from "@/components/FeaturedComponent";
import LandingHero from "@/components/LandingHero";
import LandingNavbar from "@/components/LandingNavbar";
import { FaTrophy } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <LandingNavbar />
      <LandingHero />
      <div className="h-dvh"></div>
    </>
  );
}
