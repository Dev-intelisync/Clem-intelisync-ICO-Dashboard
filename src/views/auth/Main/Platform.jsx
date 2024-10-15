// import {
//   Container,
//   Box,
//   Typography,
//   makeStyles,
//   Button,
//   Grid,
// } from "@material-ui/core";
// import React from "react";
// import PlatformCard from "@component/PlatformCard";
// const CardData = [
//   {
//     img1: "images/lock.png",
//     text1: "Features -1",
//     text2:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor velit, aliquet amet, sit potenti nisl convallis felis, dignissim. Non laoreet lectus lorem nibh duis pellentesque",
//   },
//   {
//     img1: "images/lock.png",
//     text1: "Features -1",
//     text2:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor velit, aliquet amet, sit potenti nisl convallis felis, dignissim. Non laoreet lectus lorem nibh duis pellentesque",
//   },
//   {
//     img1: "images/lock.png",
//     text1: "Features -1",
//     text2:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor velit, aliquet amet, sit potenti nisl convallis felis, dignissim. Non laoreet lectus lorem nibh duis pellentesque",
//   },
//   {
//     img1: "images/lock.png",
//     text1: "Features -1",
//     text2:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor velit, aliquet amet, sit potenti nisl convallis felis, dignissim. Non laoreet lectus lorem nibh duis pellentesque",
//   },
// ];

// const useStyles = makeStyles((theme) => ({
//   mainbox: {
//     paddingTop: "100px",
//     paddingBottom: "100px",
//     backgroundImage: "url(images/platformbg.png)",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     backgroundColor: "#000",
//     "& h1": {
//       fontSize: "60px",
//       fontWeight: "700",
//       width: "100%",
//       maxWidth: "968px",
//       [theme.breakpoints.down("md")]: {
//         fontSize: "40px",
//       },
//     },
//   },
// }));

// function Banner() {
//   const classes = useStyles();
//   return (
//     <Box className={classes.mainbox}>
//       <Container maxWidth="lg">
//         <Box>
//           <Typography variant="h1">
//             Characteristic of Multi-Application Platform
//           </Typography>
//         </Box>
//         <Grid container>
//           <Grid item lg={11} md={11} sm={12} xs={12}>
//             <Grid container spacing={2}>
//               {CardData.map((data, i) => {
//                 return (
//                   <Grid item lg={3} md={3} sm={6} xs={12}>
//                     <PlatformCard data={data} index={i} />
//                   </Grid>
//                 );
//               })}
//             </Grid>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

// export default Banner;
