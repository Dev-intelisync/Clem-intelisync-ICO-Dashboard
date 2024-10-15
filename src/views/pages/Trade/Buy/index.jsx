import React, { useState, useEffect } from "react";
import { makeStyles, Box, Grid, Typography } from "@material-ui/core";
import { GetStepContent } from "./StepContent";
import ConfirmationDialog from "@component/ConfirmationDialog";
import WarningDialog from "@component/WarningDialog";
import Page from "@component/Page";
import { useHistory, Link as RouterLink } from "react-router-dom";

import TopBar from "@layouts/DashboardLayout/TopBar/";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 70,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ["Select campaign settings", "Create an ad group", "Create an ad"];
}

export default function Index({ open, close }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      history.push("/login");
    }
  }, [window.localStorage.getItem("token")]);
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      // handleReset();
      setConfirmOpen(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const confirmationHandler = () => {
    handleReset();
  };

  return (
    <Page title="Buy">
      {confirmOpen && (
        <ConfirmationDialog
          open={confirmOpen}
          handleClose={() => setConfirmOpen(false)}
          title={"title"}
          desc={"desc"}
          confirmationHandler={confirmationHandler}
        />
      )}
      {warningOpen && (
        <WarningDialog
          open={warningOpen}
          handleClose={() => setWarningOpen(false)}
          desc={"desc"}
        />
      )}
      <TopBar />
      <div className={classes.root}>
        <Box pt={3} style={{ padding: "0" }}>
          <Grid container>
            <Grid item sm={3} xs={12} className="step_bar">
              {steps.map((lable, i) => {
                return (
                  <Box display="flex" key={i} className="d-flex justify-end">
                    <Box>
                      <Typography
                        style={{
                          color: "#fff",
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        {lable}
                      </Typography>
                    </Box>
                    <Box
                      className={activeStep >= i ? "completed" : "activeStep"}
                    >
                      <Typography
                        variant="h5"
                        className="extra-bold"
                        style={{ color: "#000" }}
                      >
                        {" "}
                        {i + 1}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
              <Box display="flex"></Box>
            </Grid>
            <Grid
              item
              sm={9}
              xs={12}
              className="d-flex justify-start"
              style={{
                backgroundColor: "#302F35",
              }}
            >
              <GetStepContent
                stepIndex={activeStep}
                handleNext={handleNext}
                handleBack={handleBack}
                warningOpen={(data) => setWarningOpen(data)}
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </Box>
      </div>
    </Page>
  );
}
