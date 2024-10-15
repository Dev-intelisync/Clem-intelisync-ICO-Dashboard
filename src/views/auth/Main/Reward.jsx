import React from "react";
import {
  Box,
  Typography,
  Container,
  makeStyles,
  withStyles,
  Grid,
} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    padding: "30px 0px 60px",
    backgroundImage: "url('/images/Rewardback.png')",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    // background: theme.palette.background.back,

    [theme.breakpoints.down("sm")]: {
      padding: "50px 0px 40px",
    },

    "& h1": {
      fontSize: "60px",
      fontWeight: "700",

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
      fontSize: "18px",
      fontWeight: "300",
      margin: "0 auto",
      paddingBottom: "25px",
      width: "100%",
      maxWidth: "1123px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "16px",
      },
    },
    "& .imagebox": {
      maxWidth: "500px",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },

    "& h2": {
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
    position: "relative",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  sideCard: {
    background: theme.palette.background.reward,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    color: theme.palette.text.primary,

    " & span": {
      fontWeight: "600",
      fontSize: "18px",
    },

    "& h2": {
      fontWeight: "600",
      fontSize: "30px",
      lineHeight: "30px",
    },
  },
  circle2: {
    position: "absolute",
    width: "60px",
    right: "200px",

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

function Reward() {
  const classes = useStyles();

  return (
    <Box className={classes.mainbox}>
      <Box align="center" mb={2}>
        <Typography variant="h1">Rewards</Typography>
        <Typography variant="h4">
          Earn mindblowing rewards on Staking VD Token
        </Typography>
      </Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item lg={7} md={7} sm={12} xs={12} className={classes.gridflex}>
            <Box className={`${classes.circle2} starTwinkle`}>
              <img src="images/star.png" alt="" width="70%" />
            </Box>
            <Box className="circleBlur1">
              <img src="./images/Elips.png" width="100%" />
            </Box>
            <Box className="imagebox">
              <img src="images/Rewards.png" alt="" width="100%" />
            </Box>
            <Box className="circleEffetc5">
              <img src="images/Elips.png" alt="" width="70%" />
            </Box>
          </Grid>

          <Grid item lg={5} md={5} sm={12} xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <Box className={classes.sideCard}>
                  <Box className={`${classes.circle2} starTwinkle`}>
                    <img src="images/star.png" alt="" width="70%" />
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Box p={2}>
                        <Typography>Anyone buying</Typography>
                        <PrettoSlider
                          valueLabelDisplay="auto"
                          aria-label="pretto slider"
                          defaultValue={20}
                        />
                        <Typography variant="h2">
                          25K
                          <sub style={{ fontSize: "20px", fontWeight: "300" }}>
                            VDT
                          </sub>
                          <img src="images/grap1.png" alt="" />
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Box>
                        <Box mt={2} mb={3}>
                          <Typography>Reward valuation</Typography>
                          <Typography>
                            <span>24</span>{" "}
                            <sub
                              style={{ fontSize: "12px", fontWeight: "300" }}
                            >
                              p.c.p.a
                            </sub>{" "}
                          </Typography>
                        </Box>
                        <Box mb={2}>
                          <Typography>Reward valuation in Fiat </Typography>
                          <Typography>
                            <span>24</span>
                            <sub
                              style={{ fontSize: "12px", fontWeight: "300" }}
                            >
                              p.c.p.a
                            </sub>{" "}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={3} className={classes.sideCard}>
                  <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Box p={2}>
                        <Typography>Anyone buying</Typography>
                        <PrettoSlider
                          valueLabelDisplay="auto"
                          aria-label="pretto slider"
                          defaultValue={20}
                        />
                        <Typography variant="h2">
                          25K
                          <sub style={{ fontSize: "20px", fontWeight: "300" }}>
                            <span> to 1 Million</span> &nbsp; VDT
                          </sub>
                          <img src="images/grap1.png" alt="" />
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Box>
                        <Box mt={2} mb={3}>
                          <Typography>Reward valuation</Typography>
                          <Typography>
                            <span>24</span>
                            <sub
                              style={{ fontSize: "12px", fontWeight: "300" }}
                            >
                              p.c.p.a
                            </sub>{" "}
                          </Typography>
                        </Box>
                        <Box mb={2}>
                          <Typography>Reward valuation in Fiat </Typography>
                          <Typography>
                            <span>24</span>
                            <sub
                              style={{ fontSize: "12px", fontWeight: "300" }}
                            >
                              p.c.p.a
                            </sub>{" "}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Reward;
