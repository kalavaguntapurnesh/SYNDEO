// import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrackRecord from "../components/TrackRecord";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import Final from "../components/Final";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <TrackRecord />
      <Carousel />
      <FAQ />
      <Final/>
      <Footer />
    </div>
  );
}

export default Home;
