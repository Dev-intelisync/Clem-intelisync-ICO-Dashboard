import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  question: {
    fontFamily: "Inter !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    fontSize: "20px !important",
    lineHeight: "30px !important",
    color: "#FFFFFF !important",
    overflowWrap: "anywhere",
  },
  answer: {
    fontFamily: "Inter !important",
    fontStyle: "normal !important",
    fontWeight: "400 !important",
    fontSize: "16px !important",
    lineHeight: "30px !important",
    letterSpacing: "0.2px !important",
    color: "#FFFFFF !important",
    overflowWrap: "anywhere",
  },
}));
const Accordion = withStyles({
  root: {
    background: "transparent",
    boxShadow: "none",
    border: "none",
    "&:not(:last-child)": {
      boxShadow: "none",
      border: "none",
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      border: "none",
      color: "#64DBE7",
      backdropFilter: "blur(42px)",
    },
  },
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    padding: "0 !important",
    boxSizing: "border-box",
    backdropFilter: "blur(4px)",
    color: "#909090",
    "&$expanded": {
      minHeight: 50,
      borderBottom: "0",
      color: "#1069C2 !important",
    },
    "@media(max-width:605px)": {
      fontSize: "10px",
      minHeight: 50,
      "&$expanded": {
        minHeight: 40,
        borderBottom: "0",
        color: "#64DBE7 !important",
      },
    },
  },
  content: {
    "&$expanded": {
      margin: "0",
    },
  },
  expanded: {
    margin: "0",
  },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: "0 !important",
    background: "transparent",
    boxSizing: "border-box",
    backdropFilter: "blur(4px)",
    "& h6": {
      color: "#000",
      paddingBottom: "15px",
    },
    "& p": {
      color: "#8A8B9F",
      textAlign: "left",
    },
  },
}))(MuiAccordionDetails);
export default function FaqData({ data, index }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <div>
        <Accordion
          square
          defaultExpanded={index == 0 ? true : false}
          onChange={handleChange("panel1")}
          style={{ background: "red !important" }}
          className={classes.accordion}
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            expandIcon={
              <ExpandMoreIcon
                style={{
                  fontSize: "44px",
                  fontWeight: "400",
                  color: "#ffffff",
                }}
              />
            }
          >
            <Typography className={classes.question}>
              {data?.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
          // style={{
          //   display: "flex",
          //   flexDirection: "column",

          //   borderTop: "0px",
          // }}
          >
            <Typography className={classes.answer}> {data?.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
