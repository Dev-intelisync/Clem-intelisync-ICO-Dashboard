import React, { useState, useContext } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { UserContext } from "@context/User";

const useStyles = makeStyles((theme) => ({
  mainIdSection: {
    "& button": {
      "&.active": {
        background:
          "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
        color: "white",
        "& svg": {
          color: "#fff !important",
        },
      },
    },
  },
}));

const ShareHolders = ({ formDat, setValuedata }) => {
  const [idd, setId] = useState();

  const [valuedata1, setValuedata1] = useState();

  const classes = useStyles();

  const user = useContext(UserContext);

  return (
    <div className={classes.mainIdSection}>
      {user?.StatusData?.approveStatus === "REJECT" && (
        <>
          <Grid container spacing={3}>
            {user?.StatusData?.companyHolder &&
              user?.StatusData?.companyHolder?.map((value, index) => {
                return (
                  <>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={() => {
                          setId(index);
                          setValuedata1(value);
                        }}
                        className={idd === index ? "active" : ""}
                      >
                        {value.designation
                          ? value.designation
                          : "Please add share holders"}
                        <br />

                        {value.name}
                      </Button>
                    </Grid>
                  </>
                );
              })}
          </Grid>
        </>
      )}
      <>
        <Grid container spacing={3}>
          {formDat &&
            formDat.map((value, index) => {
              return (
                <>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={() => {
                        setId(index);
                        setValuedata(value);
                      }}
                      className={idd === index ? "active" : ""}
                    >
                      {value.designation
                        ? value.designation
                        : "Please add share holders"}
                      <br />

                      {value.name}
                    </Button>
                  </Grid>
                </>
              );
            })}
        </Grid>
      </>
    </div>
  );
};

export default ShareHolders;
