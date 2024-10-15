import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  tipsBox: {
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",
    marginTop: "40px",
    padding: "40px",
  },
}));

const Tips = () => {
  const classes = useStyles();
  return (
    <Box mt={3} align="" className={classes.tipsBox}>
      <Typography variant="h5">Tips</Typography>
      <Typography>
        <ol>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            hendrerit tincidunt pretium cursus leo ac nisl tellus. In donec sed
            cras adipiscing. Pharetra varius pellentesque at et commodo aliquet
            dolor vitae. Fusce ipsum integer nisi, elementum gravida. Velit
            viverra sit semper mi facilisi. At viverra at egestas nunc ut
            elementum lorem. Nisl curabitur curabitur aliquam, laoreet leo
            euismod id tristique dictumst.
          </li>
          <li>
            Lacus id tellus sed proin fames risus ut. Hendrerit orci ut arcu
            nunc quis egestas lorem etiam. Nibh sit gravida amet aliquam. Purus
            curabitur dictum at diam quam varius mus. Proin lorem nisl at
            vestibulum. Facilisi suspendisse at eget ullamcorper vel ut
            faucibus. Volutpat amet phasellus pharetra odio enim venenatis nec
            suscipit. Mi nunc vitae id eget. Facilisis risus hendrerit nisl
            commodo. At egestas
          </li>
          <li>
            Lacus id tellus sed proin fames risus ut. Hendrerit orci ut arcu
            nunc quis egestas lorem etiam. Nibh sit gravida amet aliquam. Purus
            curabitur dictum at diam quam varius mus.
          </li>
        </ol>
      </Typography>
    </Box>
  );
};

export default Tips;
