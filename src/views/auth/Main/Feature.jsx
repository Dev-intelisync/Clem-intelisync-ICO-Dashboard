import React from "react";
import {
  Box,
  Typography,
  Container,
  makeStyles,
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 275,
    paddingTop: "12px",
    paddingLeft: "15px",
    height: "265px",
    background: "#FFFFFF",
    boxShadow: "0px 11.7316px 17.1462px rgb(0 0 0 / 7%)",
    borderRadius: "19.8535px",
  },
  pos: {
    marginBottom: 12,
    marginTop: "12px",
    width: "100%",
    maxWidth: "45.12px",
    height: "1.8px",
    background: "#FBCC5C",
  },
  mainbox: {
    padding: "60px 10px 0px 10px !important",
    background: "#fff",

    [theme.breakpoints.down("sm")]: {
      padding: "50px 10px 0px 10px !important",
    },

    "& h1": {
      fontFamily: "Inter",
      fontWeight: "700",
      fontSize: "36.0972px",
      lineHeight: "45px",
      /* identical to box height, or 125% */
      letterSpacing: "0.180486px",
      color: "#A63F9F",
      [theme.breakpoints.down("sm")]: {
        fontSize: "40px",
        lineHeight: "48px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "28px",
        lineHeight: "40px",
      },
    },
    "& h4": {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16.0486px",
      lineHeight: "27px",
      letterSpacing: "0.180486px",
      color: "#000000",
      width: "100%",
      maxWidth: "1123px",
      textAlign: "justify",
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
      },
    },
    "& .imagebox": {
      width: "100%",
      maxWidth: "670px",
      paddingTop: "78px",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    "& .leftside": {
      fontFamily: "Inter",
      backgroundColor: "#E9C856",
      padding: "15px",
      borderRadius: "5px",
      "& h3": {
        fontFamily: "Inter",
        color: "#000",
        fontSize: "30px",
        fontWeight: "700",
        lineHeight: "42px",
        [theme.breakpoints.down("md")]: {
          fontSize: "23px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "23px",
        },
      },
    },
    "& h2": {
      fontFamily: "Inter",
      fontSize: "18px",
      fontWeight: "300",
      marginBottom: "20px",
      lineHeight: "26px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
      },
    },
  },
  gridflex: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  buyButton: {
    fontFamily: "Inter",
    border: "none",
    background: "#56CA00",
    borderRadius: "10px",
    width: "148.9px",
    height: "47px",
  },
  cardsDiv: {
    paddingTop: "61px !important",
    "& h6": {
      fontFamily: "Inter",
      marginTop: "12px",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "14.4389px",
      lineHeight: "22px",
      letterSpacing: "0.090243px",
      color: "#252B42",
    },
  },

  subText: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14.4389px",
    lineHeight: "18px",
    letterSpacing: "0.180486px",
    color: "#737373",
  },
  imageBox: {
    paddingTop: "43px !important",
    paddingLeft: "62px !important",
  },
}));

function Feature() {
  const classes = useStyles();

  return (
    <Box className={classes.mainbox}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <Box>
                  <Box style={{ paddingBottom: "12px" }}>
                    <Box
                      style={{
                        borderTop: "8px solid #000000",
                        width: "82.12px",

                        borderRadius: "8.12187px",
                      }}
                    ></Box>
                  </Box>
                  {/* <Typography variant="h1">Key Features</Typography> */}
                  <img src="images/key.svg" />

                  <Box>
                    <br />{" "}
                    <Typography variant="h4">
                      Lorem ipsum dolor sit amet consectetur. Urna tincidunt sit
                      nec at accumsan pharetra auctor imperdiet erat. Orci
                      ultrices nisi rutrum in lorem morbi mattis vel maecenas.
                      Phasellus pulvinar tincidunt risus aenean facilisi eget.
                      Venenatis at ac nibh ut vitae dignissim sit et morbi. Sit
                      risus eu aliquet nisl auctor vulputate at dignissim. Eros
                      auctor lectus ac integer. Vitae risus massa eu at rhoncus
                      turpis in in. Nisl morbi ut a cras dictum fermentum in
                      dictum. Nisl commodo aliquam facilisi elementum dictum
                      purus urna. Ac nibh risus elementum massa a. Egestas quam
                      tortor ac etiam. Convallis pulvinar enim mi purus proin.
                      Id nullam non volutpat orci et. Amet nec pretium tincidunt
                      libero. Nunc et aliquet nisl lobortis sed. At molestie
                      volutpat mi quisque magna ut sit integer sapien. Vel
                      lectus nibh neque morbi gravida odio enim rhoncus morbi.
                      Eros commodo erat interdum nullam in sed sapien faucibus
                      risus. Platea risus egestas in ipsum duis odio. Egestas
                      duis ac magna amet vivamus aliquet. Feugiat egestas massa
                      sed ac vestibulum lectus risus pulvinar. Nibh eu leo at
                      mattis nec convallis. Proin turpis amet semper volutpat
                      sit suspendisse ornare proin sed. Nibh non vitae risus
                      tristique erat aliquam nisl risus. Nulla nibh scelerisque
                      dignissim mattis ut
                    </Typography>
                  </Box>
                  <br />
                  <Button className={classes.buyButton}>Learn More</Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid lg={2} md={2}></Grid> */}
          <Grid
            item
            lg={6}
            md={12}
            sm={12}
            xs={12}
            className={classes.cardsDiv}
          >
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <Card className={classes.root}>
                  <CardContent>
                    <img src="/images/heart.svg" />
                    <Typography variant="h6">Quick examination</Typography>
                    <div className={classes.pos}></div>
                    <Typography className={classes.subText}>
                      {" "}
                      The gradual
                      <br /> accumulation of
                      <br /> information about{" "}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Card className={classes.root}>
                  <CardContent>
                    <img src="/images/doctor.svg" />
                    <Typography variant="h6">Cancer Care</Typography>
                    <div className={classes.pos}></div>
                    <Typography className={classes.subText}>
                      {" "}
                      The gradual
                      <br /> accumulation of
                      <br /> information about{" "}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Card className={classes.root}>
                  <CardContent>
                    <img src="/images/pad.svg" />
                    <Typography variant="h6">Health Queries</Typography>
                    <div className={classes.pos}></div>
                    <Typography className={classes.subText}>
                      {" "}
                      The gradual
                      <br /> accumulation of
                      <br /> information about{" "}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Card className={classes.root}>
                  <CardContent>
                    <img src="/images/med.svg" />
                    <Typography variant="h6">Book now</Typography>
                    <div className={classes.pos}></div>
                    <Typography className={classes.subText}>
                      {" "}
                      The gradual
                      <br /> accumulation of
                      <br /> information about{" "}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Feature;
