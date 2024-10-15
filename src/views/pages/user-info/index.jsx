import React, { useState, useEffect } from "react";

import {
  Container,
  Box,
  TextField,
  Grid,
  Typography,
  Link,
  Button,
  MenuItem,
  Select,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Page from "@component/Page";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    padding: "30px",
    borderRadius: "5px",
    border: "1px solid #efecec",
    "& .MuiTextField-root": {
      margin: "20px 0",
    },
    "& h5": {
      margin: "10px 0",
    },
  },
  rightButton: {
    float: "right",
  },
}));
function UserInfo(props) {
  const classes = useStyles();
  const history = useHistory();
  // useEffect(() => {
  //   if (!window.localStorage.getItem("token")) {
  //     history.push("/login");
  //   }
  // }, [window.localStorage.getItem("token")]);
  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <Page title="2 Factor Authentication">
      <Box m={4}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid sm={12}>
              <Typography variant="h5" className="extra-bold padding10">
                User Information
              </Typography>
              <form className={classes.root} Validate autoComplete="off">
                <div>
                  <TextField
                    type="text"
                    inputProps={{ maxLength: 256 }}
                    id="outlined-error"
                    label="Enter Your Name"
                    size="small"
                    variant="outlined"
                    fullWidth
                  />
                  <KeyboardDatePicker
                    label="Clearable"
                    clearable
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Age"
                    size="small"
                    variant="outlined"
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  <Typography
                    color="primary.main"
                    variant="body2"
                    className="padding10"
                  >
                    <Link color="error.main" href="#">
                      Didn't recieve code? Resend!
                    </Link>
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.rightButton}
                  >
                    Let's Start
                  </Button>
                </div>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
}

export default UserInfo;
