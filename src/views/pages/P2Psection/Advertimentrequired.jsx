import React, { useState, useEffect } from "react";
import {
  Box,
  makeStyles,
  Typography,
  Grid,
  Button,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    padding: "5px 15px 5px 15px",

    "& h4": {
      fontSize: "17px",
      color: "#848484",
    },
  },
  contentBox: {
    marginTop: "5px",
    "& .subtextbox": {
      "& .TabBoxbank": {
        display: "flex",
      },
    },
  },
  TextBox: {
    borderRadius: "10px",
    paddingLeft: "6px",
    background: theme.palette.background.taf,
  },

  searchSection: {
    marginTop: "-5px",
  },
  field: {
    height: "40px",
    border: "1px solid #bcbcbc",
    padding: "10px 10px 10px 0px",
    marginTop: "6px",
    fontSize: "14px",
    borderRadius: "5px",
  },
  title: {
    "& h3": {
      fontSize: "22px !important",
      [theme.breakpoints.down("md")]: {
        fontSize: "18px !important",
      },
    },
  },
}));

export default function Dashboard({ setFormData, formData, isSubmit }) {
  var classes = useStyles();
  const [tabview, setTabView] = useState("Add");
  const [countries, setCountries] = useState([]);

  const [states, setStates] = useState([]);
  const [showStates, setShowStates] = useState([]);

  useEffect(() => {
    axios.get("/static/json/countries.json").then(function (response) {
      setCountries(response.data.countries);
      axios.get("/static/json/states.json").then(function (response) {
        setStates(response.data.states);
        axios.get("/static/json/cities.json").then(function (response) {
          // setCities(response.data.cities);
        });
      });
    });
  }, []);

  const changeState = (e) => {
    const name = e.target.value;
    // changeStateList(name);
  };

  const changeCountryList = (name) => {
    const selectted = countries?.filter((cont) => {
      return cont.name === name;
    });
    const contId = selectted[0]?.id;

    const allState = states?.filter((state) => {
      return state.country_id === contId;
    });
    setShowStates(allState);
  };
  const [country, setCountry] = useState("Select");
  const changeCountry = (e) => {
    const name = e.target.value;
    changeCountryList(name);
  };

  const _onInputChange = (name, value) => {
    const temp = { ...formData, [name]: value };
    setFormData(temp);
  };

  return (
    <Box className={classes.bannerBox}>
      <Grid container spacing={2}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Box className={classes.contentBox}>
            <Box className="subtextbox">
              <Box className="TabBoxbank">
                <Box
                  onClick={(e) => {
                    _onInputChange("orderType", "BUY");
                    setTabView("Add");
                  }}
                  className={
                    tabview === "Add" ? "containedButton" : "outlinedButton"
                  }
                >
                  <Button>Buy</Button>
                </Box>
                <Box
                  onClick={(e) => {
                    _onInputChange("orderType", "SELL");
                    setTabView("UPI");
                  }}
                  className={
                    tabview === "UPI" ? "containedButton" : "outlinedButton"
                  }
                >
                  <Button>Sell</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Box mt={-1}>
            <Typography variant="body2">Select Country</Typography>
            <Select
              variant="outlined"
              fullWidth
              className="textFeilds"
              InputProps={{
                className: classes.TextBox,
              }}
              onChange={(e) => {
                // handleChange(e);
                changeCountry(e);
              }}
              onClick={(e) => {
                _onInputChange("country", e.target.value);
                // setCountry(e.target.value);
              }}
              value={formData.country}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {countries.map((countries) => {
                return (
                  <MenuItem
                    key={countries.name + countries.id}
                    value={countries.name}
                  >
                    {countries.name}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText error style={{ paddingLeft: "0px" }}>
              {isSubmit && formData?.country == "NA" && "Select country"}
            </FormHelperText>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
