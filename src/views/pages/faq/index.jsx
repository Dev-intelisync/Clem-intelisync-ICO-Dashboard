import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "@component/Page";
import { Grid, Typography, Box, Button } from "@material-ui/core";
import { FaChevronRight } from "react-icons/fa";
import ApiConfig from "../../../config/APIConfig";
import Axios from "axios";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import Nav from "@views/auth/Main/nav";
import { useHistory } from "react-router-dom";
import Footer from "@views/auth/Main/footer";
import NoDataFound from "../../../component/DataNotFound";

const useStyles = makeStyles((theme) => ({
  customButton: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottom: "1px solid lightgray",
    borderRadius: 0,
    justifyContent: "left",
    textTransform: "capitalize",
  },
  customBox: {
    minHeight: "45vh",
    marginLeft: 100,
    marginRight: 100,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 10,
      marginRight: 10,
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: 10,
      marginRight: 10,
    },
  },
}));

const faqList = [
  {
    id: 1,
    title: "Lorem ipsum1",
    desc: "Lorem ipsum1, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
  },
  {
    id: 2,
    title: "Lorem ipsum2",
    desc: "Lorem ipsum2, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
  },
  {
    id: 3,
    title: "Lorem ipsum2",
    desc: "Lorem ipsum3, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
  },
  {
    id: 4,
    title: "Lorem ipsum4",
    desc: "Lorem ipsum4, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
  },
  {
    id: 5,
    title: "Lorem ipsum1",
    desc: "Lorem ipsum1, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
  },
  {
    id: 6,
    title: "Lorem ipsum2",
    desc: "Lorem ipsum2, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
  },
  {
    id: 7,
    title: "Lorem ipsum2",
    desc: "Lorem ipsum3, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
  },
  {
    id: 8,
    title: "Lorem ipsum4",
    desc: "Lorem ipsum4, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
  },
];

function ResponsiveDrawer(props) {
  const classes = useStyles();
  const [selectedText, setSelectedText] = React.useState(faqList[0]);

  const [faqData, setFaqData] = useState([]);
  const [faqDataLoader, setFaqDataLoader] = useState([]);
  const history = useHistory();
  const changeHandler = (id) => {
    // const result = faqData.filter((data, i) => {
    //   return data.id === id;
    // });
    const result = faqData[id];
    setSelectedText(result);
  };

  useEffect(() => {
    if (faqData.length > 0) {
      setSelectedText(faqData[0]);
    }
  }, [faqData]);

  const getFaqDataHandler = async () => {
    setFaqDataLoader(true);

    try {
      const res = await Axios.get(ApiConfig.faq, {
        params: {
          page: 0,
          pageSize: 10,
        },
      });
      if (res.data.status === 200) {
        setFaqData(res.data.data.faqList);
        console.log("ressadfdata", res.data.data);
        setFaqDataLoader(false);
      }
    } catch {
      setFaqDataLoader(false);
    }
  };
  useEffect(() => {
    getFaqDataHandler();
  }, []);

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
    // console.log(abc);
    // const data = refs[abc].current;
    // console.log(data);
    window.scrollTo({
      top: refs[abc].current?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <Page title="FAQ">
      <Nav buttonClick={onButtonClick} />
      <Box className={classes.customBox}>
        <Box
          className="faqBg d-flex"
          style={{
            margin: "70px 0",
            color: "#fff",
            BackgroundColor: "#000",
          }}
          align="center"
        >
          <Typography align="left" variant="h4" paragraph>
            FAQ's
          </Typography>
        </Box>
        {faqDataLoader && faqData.length == 0 && (
          <Box
            style={{
              // position: "absolute",

              // zIndex: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <ButtonCircularProgress />
          </Box>
        )}
        <Grid container spacing={4}>
          <Grid item sm={3}>
            <Box>
              {!faqDataLoader && faqData.length != 0 && (
                <Typography
                  align="left"
                  variant="h6"
                  paragraph
                  style={{
                    //   textDecoration: "underline",
                    color: "#e9c856",
                  }}
                >
                  Select Topic
                </Typography>
              )}
            </Box>

            {faqData &&
              faqData.map((data, i) => {
                return (
                  <Button
                    fullWidth
                    key={i}
                    style={
                      selectedText && i === selectedText.id
                        ? { fontWeight: "bold" }
                        : {}
                    }
                    onClick={() => changeHandler(i)}
                    className={classes.customButton}
                  >
                    <Box display="flex" style={{ width: "100%" }}>
                      <Box>{data.question}</Box>
                      <Box
                        style={{ flex: "1 0", textAlign: "right" }}
                        fullWidth
                      >
                        <FaChevronRight />
                      </Box>
                    </Box>
                  </Button>
                );
              })}
          </Grid>
          <Grid item sm={1}></Grid>
          <Grid item sm={8}>
            <Box>
              <Box>
                <Typography
                  align="left"
                  variant="h6"
                  paragraph
                  style={{
                    //   textDecoration: "underline",
                    color: "#e9c856",
                  }}
                >
                  {selectedText.question}
                </Typography>
              </Box>
              <Box>
                <Typography>{selectedText.answer}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        {!faqDataLoader && faqData.length == 0 && (
          <Box
            style={{
              // position: "absolute",

              // zIndex: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <NoDataFound />
          </Box>
        )}
      </Box>

      <Footer />
    </Page>
  );
}

export default ResponsiveDrawer;
