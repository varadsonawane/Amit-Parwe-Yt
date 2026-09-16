import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import MobileMenu from "../../components/Navbar/MobileMenu";
import Cursor from "../../components/Cursor/Cursor";
import Hero from "../../components/Hero/Hero";
import AboutHost from "../../components/AboutHost/AboutHost";
import Banner from "../../components/Banner/Banner";
import FindUs from "../../components/FindUs/FindUs";
import ChannelSlider from "../../components/ChannelSlider/ChannelSlider";
import PopularEpisodes from "../../components/PopularEpisodes/PopularEpisodes";
import Team from "../../components/Team/Team";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import UpcomingGuest from "../../components/UpcomingGuest/UpcomingGuest";

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <MobileMenu />

      <main>
        <Hero />
        <AboutHost />
        <Banner />
        <FindUs />
        <ChannelSlider />
        <PopularEpisodes />
        <Team />
        <UpcomingGuest />
        <Contact />
      </main>

      <Footer />
    </>
  );
}