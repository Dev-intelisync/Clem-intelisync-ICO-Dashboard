import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { Typography, Box } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
const useStyles = makeStyles((theme) => ({
  faqmain: {
    "& h5": {
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "18.2182px",
      // lineHeight: "43px",
      overflowWrap: "anywhere",
      letterSpacing: "0.173434px",
      color: "#000000",
      "@media(max-width:880px)": {
        fontSize: "14px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "13px",
      },
    },
  },
  root: {
    background: "#FFFFFF",
    border: "0.867172px solid #000000",
    borderRadius: "26.0152px !important",
  },
  summary: {
    overflowWrap: "anywhere",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "17.3434px",
    lineHeight: "26px",
    color: "#000000",
    letterSpacing: "0.173434px",
  },
}));

export default function FaqData({ data, index }) {
  const classes = useStyles();
  return (
    <div>
      <Box className={classes.faqmain}>
        <Accordion className={classes.root}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "#000000" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h5">
              {index + 1}.{""}
              {data.question}
              {/* {data?.question} */}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.summary}>
              {data.answer}
              {/* {data?.answer} */}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <br />
      </Box>
    </div>
  );
}
