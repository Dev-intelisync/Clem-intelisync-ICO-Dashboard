import React, { useRef, useEffect } from "react";
import Page from "@component/Page";
import Banner from "./Banner";
import AboutICO from "./AboutICO";
import Feature from "./Feature";
import Tokennomics from "./Tokennomics";
import FAQ from "./FAQ"
import SettingsContext from "@context/SettingsContext";
import Roadmap from "./Roadmap"
import { useLocation } from "react-router-dom";
import Nav from "./nav";
import Footer from "./footer";
import Button from "react-scroll/modules/components/Button";

import CookiesPop from "@component/CookiesPop";
import RewardUpdate from "./Rewardupdate";

function Home(props) {
  const location = useLocation();
  const refs = {
    home: useRef(null),
    about: useRef(null),
    reward: useRef(null),
    tokenomic: useRef(null),
  };

  const onButtonClick = (abc) => {
    window.scrollTo({
      top: refs[abc].current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };
  const themeSeeting = React.useContext(SettingsContext);

  const changeTheme = (type) => {
    themeSeeting.saveSettings({
      theme: type,
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.pathname]);

  return (
    <Page title="LAX Coin">
      <Nav buttonClick={onButtonClick} />
      <div id="home" className="p-92">
        <Banner />
      </div>

      <div id="about">
        <AboutICO />
      </div>
      <div id="features">
        <Feature />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <div id="roadmap">
        <Roadmap />
      </div>

      <Footer buttonClick={onButtonClick} />
    </Page>
  );
}

export default Home;
