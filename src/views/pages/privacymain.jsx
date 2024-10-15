import React, { useRef } from "react";
import Page from "@component/Page";
import "@scss/main.css";
import PrivacyPolicy from "./PrivacyPolicy";
import { useHistory } from "react-router-dom";
import { makeStyles, Box } from "@material-ui/core";
import Nav from "@views/auth/Main/nav";
import Footer from "@views/auth/Main/footer";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#000",
    marginTop: "65px",
  },
  body: { backgroundColor: "#000" },
}));

function LoginMain(props) {
  const classes = useStyles();
  const history = useHistory();
  const refs = {
    home: useRef(null),
    about: useRef(null),
    features: useRef(null),
    faq: useRef(null),
    roadmap: useRef(null),
    contact: useRef(null),
  };

  const onButtonClick = (abc) => {
    history.push("/");

    window.scrollTo({
      top: refs[abc].current?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Page className={classes.root} title="Home">
      <Nav buttonClick={onButtonClick} />
      <Box>
        <div ref={refs.home} id="section1">
          <PrivacyPolicy />
        </div>
        <div ref={refs.about} id="section3"></div>
        <div ref={refs.features} id="section4"></div>
        <div ref={refs.faq} id="section6"></div>
        <div ref={refs.roadmap} id="section7"></div>
        <div ref={refs.contact} id="section8"></div>
      </Box>
      <Footer />
    </Page>
  );
}

export default LoginMain;
