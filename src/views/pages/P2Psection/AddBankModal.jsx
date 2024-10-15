import ButtonCircularProgress from "@component/ButtonCircularProgress";
import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  Button,
  MenuItem,
  ListItemIcon,
  Select,
  FormControl,
  makeStyles,
  Checkbox,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { GiCancel } from "react-icons/gi";
// import apiConfig from "@config/ApiConfig";
import { toast } from "react-toastify";
import { Autocomplete } from "@material-ui/lab";
import { CheckBox } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  textbox: {
    "& h1": {
      fontSize: "25px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#FABE25",
    },
    "& h2": {
      fontSize: "35px",
      fontWeight: "700",
      color: "#E03128",
      [theme.breakpoints.down("xs")]: {
        fontSize: "25px",
      },
    },
    "& h5": {
      fontSize: "30px",
      fontWeight: "500",
      color: "#fff",
      marginBottom: "10px",
      marginTop: "15px",
    },
    "& h6": {
      color: "#9F9F9F",
      marginBottom: "10px",
    },
    "& p": {
      fontSize: "14px",
      color: "#9F9F9F",
      width: "100%",
      // maxWidth: "600px",
    },
    "& label": {
      fontSize: "16px",
      color: "#fff",
      // maxWidth: "600px",
    },
  },

  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: "5px 5px 5px 0px",
  },
  textField: {
    border: "1px solid #c4c4c4",
    borderRadius: "30px",
    fontSize: "14px",
    padding: "0px 10px 0px 10px ",
    width: "270px",
  },
  calander: {
    display: "flex",
    alignItems: "center",
    "@media(max-width:768px)": {
      display: "block",
    },
  },

  modalDialouge: {
    padding: "20px",
    position: "absolute",
    right: "0px",
    top: "70px",
    width: "400px",
    height: "80%",
    overflowY: "scroll",
    borderRadius: "10px",
    boxShadow: 24,
    backgroundColor: "#fff",
    "& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot[class*=MuiOutlinedInput-root]":
      {
        backgroundColor: "#ffffff",
        border: " 0px solid #c4c4c4 !important",
        // borderRadius: " 5px",
      },
    "@media(max-width:768px)": {
      width: "80%",
      height: "80%",
      overflowY: "scroll",
      right: "12px",
    },
  },
  modalinput1: {
    border: "1px solid #c4c4c4",
    borderRadius: "50px",
    width: "100%",
    padding: "0 10px",
    fontSize: "14px",
    height: "50px",
    color: "#000",
    "&:focus-visible": {
      outline: "#000",
    },
  },
  modalselect1: {
    border: "1px solid #c4c4c4",
    borderRadius: "50px",
    width: "100%",
    height: "50px",
    padding: "0 10px",
    "&:focus-visible": {
      outline: "#000",
    },
  },
  bluetext: {
    padding: "10px",
    borderBottom: "1px solid #dfdfdf87",
    color: "#000",
    "& p": {
      fontSize: "16px",
    },
  },
  modalheading1: {
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #dfdfdf87",
    alignItems: "center",
    paddingTop: 0,
    "& h4": {
      color: "#000",
    },
    "& p": {
      fontSize: "14px",
      color: "#E03128",
      cursor: "pointer",
    },
  },
  formBox: {
    padding: "15px",
    "& p": {
      marginBottom: "5px",
      fontSize: "14px",
    },
  },
  swapicon: {
    textAlign: "center",
    margin: "20px 0",
    color: "#E03128",
    "& svg": {
      cursor: "pointer",
      fontSize: "30px",
    },
  },
  customBox: {
    margin: 0,
    padding: "0 0 60px",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
    },
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },

    "& h5 ": {
      fontSize: "70px",
      lineHeight: "80px",
      color: "#E03128",
    },
  },
  button: {
    borderRadius: "20px",
    border: 0,
    backgroundColor: "#fff",
    paddingLeft: "18px",
    paddingRight: "18px",
    fontSize: "12px",
    color: "#EE1D23",
    width: "auto",
    minWidth: "100px",
    height: "32px",
    // marginTop: "15px",
    // marginBottom: "20px",
    "&:hover": {
      backgroundColor: "#EE1D23",
      border: "none",
      color: "#fff",
    },
  },
  link: {
    fontSize: "10px",
    cursor: "pointer",
    "&:hover": {
      color: "green",
    },
  },
}));
export default function AddBankModal({
  propertyOpen,
  setPropertyOpen,
  listPropertiesHandler,
  formData,
  setFormData,
  bankDetails,
  banksType,
  setbanksType,
  setBankId,
  bankData,
}) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [selected1, setSelected1] = useState([]);

  function handleChange(e, i) {
    const values = [...formData];
    values[i][e.target.name] = e.target.value;
    setFormData(values);
  }

  const addActionObj = () => {
    const values = [...formData];
    let actionObj = {};
    values.push(actionObj);
    setFormData(values);
  };

  const removeLastItem = (ind) => {
    const values = [...formData];
    for (var i = 0; i < values.length; i++) {
      if (i == ind) {
        var values1 = values.splice(ind, 1);
        console.log(values1);
      }
    }
    // values.pop();
    setFormData(values);
  };

  const addPropertyHandler = async () => {
    setPropertyOpen(false);
    listPropertiesHandler(formData);
  };

  //   const changedData1 = (e, value) => {
  //     setExchange1(value);
  //   };
  const isAllSelected1 =
    bankDetails.length > 0 && banksType.length === bankDetails.length;

  const handleChangeSelect1 = (event) => {
    const value = event.target.value;

    if (value[value.length - 1] === "all") {
      setbanksType(banksType.length === bankDetails.length ? [] : bankDetails);
      return;
    }

    setbanksType(value);
  };
  return (
    <Dialog
      open={propertyOpen}
      onClose={() => {
        if (!isLoading) {
          setPropertyOpen(false);
        }
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box mt={1} mb={2} textAlign="center">
              <Typography>Select Bank</Typography>
            </Box>
          </Grid>

          <FormControl
            variant="outlined"
            fullWidth
            className={classes.dropdown12}
          >
            <Select
              labelId="mutiple-select-label"
              multiple
              value={banksType}
              onChange={handleChangeSelect1}
              renderValue={(banksType) => banksType?.join(", ")}
            >
              {bankData &&
                bankData.map((option, Index) => (
                  <>
                    <MenuItem key={option} value={option}></MenuItem>
                  </>
                ))}
            </Select>
          </FormControl>
          <Grid item xs={12}>
            <Box mb={1}>
              <Button
                disabled={isLoading}
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => addPropertyHandler()}
              >
                Save {isLoading && <ButtonCircularProgress />}{" "}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
