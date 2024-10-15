import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    position: "relative",
    zIndex: "9",
    // marginTop: "-81px",
    "@media(max-width:1389px)": {
      // marginTop: "-60px",
    },
    [theme.breakpoints.down("md")]: {
      // marginTop: "-47px",
    },
  },
  video: {
    width: "100%",
    // controls: "false",
    // autoplay: "true",
    // loop muted playsinline:"true",
  },
  boxborder: {
    // border: "3px solid #E9C856",
    overflow: "hidden",

    "@media(max-width:430px)  and (min-width : 376px)": {
      "& video": {
        position: "relative",
        top: "0px",
        left: "-186px",
        width: "800px",
      },
    },
    "@media(max-width:400px)  and (min-width : 376px)": {
      "& video": {
        position: "relative",
        top: "0px",
        left: "-207px",
        width: "800px",
      },
    },
    "@media(max-width:376px)  and (min-width : 358px)": {
      "& video": {
        position: "relative",
        top: "0px",
        right: "205px",
        width: "800px",
      },
    },
    "@media(max-width:358px)  and (min-width : 321px)": {
      "& video": {
        position: "relative",
        top: "0px",
        right: "220px",
        width: "800px",
      },
    },
    "@media(max-width:335px)  and (min-width : 321px)": {
      "& video": {
        position: "relative",
        top: "0px",
        right: "234px",
        width: "800px",
      },
    },
    "@media(max-width:321px)  and (min-width : 310px)": {
      "& video": {
        position: "relative",
        top: "0px",
        right: "232px",
        width: "780px",
      },
    },
  },
}));

function Video() {
  // useEffect(() => {
  //   function replay() {
  //     console.log("video ended");
  //     document.getElementsByTagName("video").currentTime = 0;
  //     document.getElementsByTagName("video")[0].play();
  //   }
  // }, []);
  const classes = useStyles();
  return (
    <Box className={classes.mainbox}>
      <Box className={classes.boxborder}>
        <video
          autoplay="true"
          loop
          muted
          playsinline="true"
          className={classes.video}
          id="video"
          onended="replay()"
        >
          {/* <source src="images/video.mp4" type="video/mp4" /> */}
        </video>
        {/* <video
          loop="true"
          autoplay="true"
          // controls="false"
          autoPlay
          muted
          width="100%"
          className={classes.video}
        >
          <source src="images/video.mp4" type="video/mp4" />
        </video> */}
      </Box>
    </Box>
  );
}

export default Video;
