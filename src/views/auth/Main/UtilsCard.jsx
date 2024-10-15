import { Box, Container, Typography, makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    padding: "30px 0 20px",
    // backgroundColor: "#fff",
    background: theme.palette.background.dark,

    "& h1": {
      // color: "#1D2D3F",
      color: theme.palette.text.primary,

      fontWeight: "700",
      fontSize: "40px",
      lineHeight: "70px",
      marginBottom: "15px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "32px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "22px",
      },
    },
    "& h3": {
      // color: "#1D2D3F",
      color: theme.palette.text.primary,
      fontSize: "18px",
      fontWeight: "600",
      lineHeight: "25px",
      marginTop: "15px",
    },
    "& p": {
      fontSize: "14px",
      color: "#848484",
      fontWeight: "400",
      lineHeight: "25px",
    },
    "& h6": {
      fontSize: "15px",
      background:
        "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textFillColor: "transparent",
      textDecoration: "underline",
      textDecorationColor: "#1069C2",
      textUnderlineOffset: "5px",
      cursor: "pointer",
      marginTop: "15px",
    },
    "& .Card": {
      padding: "15px 0px 0px",
      marginTop: "25px",
    },
  },
}));
const cardData = [
  {
    cardImage: "./images/card1.png",
    title: "Hotel and Food",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac cum facilisi cras. ",
  },
  {
    cardImage: "./images/card2.png",
    title: "Hotel and Food",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac cum facilisi cras. ",
  },
  {
    cardImage: "./images/card3.png",
    title: "Hotel and Food",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac cum facilisi cras. ",
  },
  {
    cardImage: "./images/card1.png",
    title: "Hotel and Food",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac cum facilisi cras. ",
  },
  {
    cardImage: "./images/card2.png",
    title: "Hotel and Food",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac cum facilisi cras. ",
  },
  // {
  //   cardImage: "./images/card3.png",
  //   title: "Hotel and Food",
  //   desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac cum facilisi cras. ",
  // },
];

const UtilsCards = () => {
  const classes = useStyles();
  return (
    <Box className={classes.mainBox}>
      <Container>
        <Box align="center">
          <Typography variant="h1" className="downBorder">
            Utilities
          </Typography>
          <Typography variant="body1">
            Discounts and usage over various sectors viz
          </Typography>
        </Box>
        <Box>
          <Box
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {cardData.map((cardvalue) => {
              return (
                <Box style={{ maxWidth: "220px", margin: "10px 10px" }}>
                  <Box className="Card">
                    <Box className="imageBox">
                      <img
                        src={cardvalue.cardImage}
                        alt="Card Image"
                        width="100%"
                      />
                    </Box>
                    <Box className="">
                      <Typography variant="h3">{cardvalue.title}</Typography>
                      <Typography variant="body1"> {cardvalue.desc}</Typography>
                      <Typography variant="h6">Read More</Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default UtilsCards;
