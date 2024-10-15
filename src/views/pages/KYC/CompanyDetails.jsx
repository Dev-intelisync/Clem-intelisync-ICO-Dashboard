import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  TextField,
  IconButton,
  Grid,
  makeStyles,
  Typography,
  FormHelperText,
  InputAdornment,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { GiCancel } from "react-icons/gi";
import { UserContext } from "@context/User";

const useStyles = makeStyles((theme) => ({
  mainIdSection: {
    padding: "20px",
    paddingTop: "0px",

    " & .headbox": {
      width: "44px",
      height: "44px",
      display: "flex",
      justifyContent: "center",
      cursor: "pointer",
      alignItems: "center",
      border: "2px solid rgba(128, 128, 128, 0.22)",
      borderRadius: "50%",
    },
  },

  flexBoxCard: {
    display: "flex",
    // justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "590px",
    padding: "20px",
  },
  borderClass: {
    borderTop: "1px solid rgba(128, 128, 128, 0.22)",
    borderBottom: "1px solid rgba(128, 128, 128, 0.22)",
  },
  BuutonAdd: {
    marginTop: "40px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0px",
    },
  },
}));

const CompanyDetails = ({
  propertyOpen,
  setPropertyOpen,
  listPropertiesHandler,
  formDat,
  setFormDat,
}) => {
  const classes = useStyles();
  const [teamsDataError, setTeamsDataError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [formDatavalue, setFormDatavalue] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    const locationdata = location.state;
    setFormDatavalue(
      locationdata?.companyHolder ? locationdata?.companyHolder : ""
    );
  }, [location.state]);

  function handleChange(e, i) {
    const values = [...formDat];
    values[i][e.target.name] = e.target.value;
    setFormDat(values);
  }

  const addActionObj = () => {
    const values = [...formDat];
    let actionObj = {};
    values.push(actionObj);
    setFormDat(values);
  };

  const removeLastItem = (ind) => {
    const values = [...formDat];
    for (var i = 0; i < values.length; i++) {
      if (i == ind) {
        var values1 = values.splice(ind, 1);
        console.log(values1);
      }
    }
    setFormDat(values);
  };

  const addPropertyHandler = async () => {
    listPropertiesHandler(formDat);
  };

  return (
    <Box>
      <Box className={classes.borderClass}>
        <Box className={classes.flexBoxCard}>
          <Box className="headbox">
            <Typography variant="h6">03</Typography>
          </Box>
          <Box>
            <Typography variant="h3">
              {" "}
              &nbsp;&nbsp;&nbsp; Comapny Share Holders
            </Typography>
            <Typography variant="body2">
              &nbsp;&nbsp;&nbsp; Your Company Share Holders information required
              for identification
            </Typography>
          </Box>
        </Box>
      </Box>
      {user?.StatusData?.approveStatus === "REJECT" && (
        <>
          <Box mt={1} className={classes.mainIdSection}>
            {user?.StatusData?.companyHolder.map((data, index) => {
              return (
                <>
                  <Grid container spacing={3}>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Box mb={1}>
                        <label>Name *</label>
                      </Box>
                      <TextField
                        disabled={isLoading}
                        variant="outlined"
                        fullWidth
                        placeholder="Enter your name"
                        name="designation"
                        value={data.designation}
                        height="40px"
                        onChange={(e) => handleChange(e, index)}
                        error={
                          (teamsDataError && data.designation == undefined) ||
                          (teamsDataError && data.designation == "")
                        }
                        helperText={
                          (teamsDataError &&
                            data.designation == undefined &&
                            "Please enter name") ||
                          (teamsDataError &&
                            data.designation == "" &&
                            "Please enter your name")
                        }
                      />

                      {data?.designation?.toLowerCase()?.trim() ===
                        formDat[index - 1]?.designation
                          ?.toLowerCase()
                          ?.trim() && (
                        <FormHelperText error>
                          Please enter another name.
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Box mb={1}>
                        <label>Designation *</label>
                      </Box>
                      <TextField
                        disabled={isLoading}
                        variant="outlined"
                        fullWidth
                        placeholder="Enter your designation"
                        name="name"
                        height="40px"
                        value={data.name}
                        onChange={(e) => handleChange(e, index)}
                        error={
                          (teamsDataError && data.name == undefined) ||
                          (teamsDataError && data.name == "")
                        }
                        helperText={
                          (teamsDataError &&
                            data.name == undefined &&
                            "Please enter designation") ||
                          (teamsDataError &&
                            data.name == "" &&
                            "Please enter your designation")
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                onClick={() => removeLastItem(index)}
                                style={{ cursor: "pointer" }}
                                disabled={index == 0 && formDat.length == 1}
                              >
                                {" "}
                                <GiCancel />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {data?.name?.toLowerCase()?.trim() ===
                        formDat[index - 1]?.name?.toLowerCase()?.trim() && (
                        <FormHelperText error>
                          Please enter another designation.
                        </FormHelperText>
                      )}
                      {/* {data?.type?.toLowerCase()?.trim() ===
                    data?.name?.toLowerCase()?.trim() && (
                    <FormHelperText error>
                      Both type and name must be different.
                    </FormHelperText>
                  )} */}
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </Box>
        </>
      )}
      <>
        <Box mt={1} className={classes.mainIdSection}>
          {formDat.map((data, index) => {
            return (
              <>
                <Grid container spacing={3}>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Box mb={1}>
                      <label>Name *</label>
                    </Box>
                    <TextField
                      disabled={isLoading}
                      variant="outlined"
                      fullWidth
                      placeholder="Enter your name"
                      name="designation"
                      value={data.designation || formDatavalue.designation}
                      height="40px"
                      onChange={(e) => handleChange(e, index)}
                      error={
                        (teamsDataError && data.designation == undefined) ||
                        (teamsDataError && data.designation == "")
                      }
                      helperText={
                        (teamsDataError &&
                          data.designation == undefined &&
                          "Please enter name") ||
                        (teamsDataError &&
                          data.designation == "" &&
                          "Please enter your name")
                      }
                    />

                    {data?.designation?.toLowerCase()?.trim() ===
                      formDat[index - 1]?.designation
                        ?.toLowerCase()
                        ?.trim() && (
                      <FormHelperText error>
                        Please enter another name.
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Box mb={1}>
                      <label>Designation *</label>
                    </Box>
                    <TextField
                      disabled={isLoading}
                      variant="outlined"
                      fullWidth
                      placeholder="Enter your designation"
                      name="name"
                      height="40px"
                      value={data.name}
                      onChange={(e) => handleChange(e, index)}
                      error={
                        (teamsDataError && data.name == undefined) ||
                        (teamsDataError && data.name == "")
                      }
                      helperText={
                        (teamsDataError &&
                          data.name == undefined &&
                          "Please enter designation") ||
                        (teamsDataError &&
                          data.name == "" &&
                          "Please enter your designation")
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              onClick={() => removeLastItem(index)}
                              style={{ cursor: "pointer" }}
                              disabled={index == 0 && formDat.length == 1}
                            >
                              {" "}
                              <GiCancel />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {data?.name?.toLowerCase()?.trim() ===
                      formDat[index - 1]?.name?.toLowerCase()?.trim() && (
                      <FormHelperText error>
                        Please enter another designation.
                      </FormHelperText>
                    )}
                    {/* {data?.type?.toLowerCase()?.trim() ===
                    data?.name?.toLowerCase()?.trim() && (
                    <FormHelperText error>
                      Both type and name must be different.
                    </FormHelperText>
                  )} */}
                  </Grid>
                  {formDat.length - 1 == index && (
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Box className={classes.BuutonAdd}>
                        <Box
                          className="headbox"
                          onClick={() => {
                            if (
                              formDat[index].designation != "" &&
                              formDat[index].designation != undefined &&
                              formDat[index].name != "" &&
                              formDat[index].name != undefined
                            ) {
                              setTeamsDataError(false);
                              addActionObj();
                            } else {
                              setTeamsDataError(true);
                            }
                          }}
                          disabled={
                            data?.designation?.toLowerCase()?.trim() ===
                              formDat[index - 1]?.designation
                                ?.toLowerCase()
                                ?.trim() ||
                            data?.name?.toLowerCase()?.trim() ===
                              formDat[index - 1]?.name?.toLowerCase()?.trim() ||
                            data?.designation?.toLowerCase()?.trim() ===
                              data[index - 1]?.name?.toLowerCase()?.trim() ||
                            data?.designation?.toLowerCase()?.trim() ===
                              data?.name?.toLowerCase()?.trim()
                          }
                        >
                          <Typography variant="h6">
                            <AddCircleIcon
                              style={{ fontSize: "50px", color: "#8cc2be" }}
                            />
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </>
            );
          })}
        </Box>
      </>
    </Box>
  );
};

export default CompanyDetails;
