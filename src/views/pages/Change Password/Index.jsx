import React, { useState } from "react";
import Page from "@component/Page";
import {
  Box,
  Typography,
  IconButton,
  InputAdornment,
  Button,
  Container,
  makeStyles,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import * as yep from "yup";
import { Form, Formik } from "formik";
import { BiLock, BiLockOpen } from "react-icons/bi";
import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { toast } from "react-toastify";
import ButtonCircularProgress from "@component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    "& h5": {
      fontSize: "18px",
    },
    "& h6": {
      fontSize: "15px",
    },

    "& .mainLine1": {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      "& .setBox1": {
        display: "flex",
        alignItems: "center",
        "& .imageBox": {
          marginRight: "20px",
          maxWidth: "45px",
        },
      },
      "& .butonBox": {
        marginLeft: "25px",
      },
    },
  },
  googleBtn: {
    color: "#848484",
    border: "1px solid #3a96dd",
    filter: "drop-shadow(0px 13px 27px rgba(0, 0, 0, 0.25))",
    padding: " 9px 10px !important",
    fontSize: " 13px",
    fontWeight: 400,
    borderRadius: "30px",
  },
  contentBox: {
    background: theme.palette.background.taf,
    borderRadius: "10px",
    padding: "10px 15px",
  },
  containerBox: {
    // display: "flex",
    background:
      "linear-gradient(180deg, rgba(0, 172, 235, 0.1) 0%, rgba(0, 176, 237, 0.1) 10.18%, rgba(16, 105, 194, 0.1) 70.35%, rgba(16, 105, 194, 0.1) 100%)",
    borderRadius: "10px",
    border: "1px solid #6ECFF3",
    marginTop: "40px",
    padding: "40px",
    flexDirection: "column",
    alignItems: "center",
  },
  TextBox: {
    borderRadius: "10px",
    // background: theme.palette.background.taf,
  },
}));

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const resetPaswordHandler = async (values, resetForm) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await Axios({
        method: "PATCH",
        url: ApiConfig.changepassword,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          newPassword: values.confirm,
          oldPassword: values.oldpassword,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        setIsLoading(false);
        resetForm();
      } else if (res.data.responseCode === 205) {
        setErrorMessage(res.data.responseMessage);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Page title="ChangePassword">
        <Box className={classes.mainBox}>
          <Box>
            <Box align="center" mt={2}>
              <Typography variant="h2">Change Password</Typography>
              {/* <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing
              </Typography> */}
            </Box>
            <Formik
              onSubmit={(values, { resetForm }) => {
                resetPaswordHandler(values);
                // resetForm();
              }}
              initialValues={{
                oldpassword: "",
                password: "",
                confirm: "",
              }}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={yep.object().shape({
                oldpassword: yep.string().required("Old password is required."),
                password: yep
                  .string()
                  .required("Password is required")
                  .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                  ),

                confirm: yep
                  .string()
                  .required("Confirmation of your password is required")
                  .oneOf([yep.ref("password"), null], "Passwords must match"),
              })}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
                setFieldValue,
              }) => (
                <Form>
                  <Container maxWidth="sm">
                    {" "}
                    <Box mt={4}>
                      <Box className={classes.containerBox} align="center">
                        <Box mt={2} align="left" style={{ maxWidth: "350px" }}>
                          <label>Old Passsword</label>
                          <TextField
                            className={`${classes.inputvalue} textFeilds`}
                            placeholder="Enter Your Password"
                            size="small"
                            variant="outlined"
                            fullWidth
                            step="any"
                            value={values.oldpassword}
                            name="oldpassword"
                            error={Boolean(
                              touched.oldpassword && errors.oldpassword
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                              className: classes.TextBox,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    edge="end"
                                  >
                                    <Box className={classes.passsec}>
                                      {showPassword ? (
                                        <BiLockOpen
                                          style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            color: "#1069C2",
                                            alignItems: "center",
                                          }}
                                        />
                                      ) : (
                                        <BiLock
                                          style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            color: "#1069C2",
                                            alignItems: "center",
                                          }}
                                        />
                                      )}
                                    </Box>
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                          <FormHelperText error>
                            {touched.oldpassword && errors.oldpassword}
                            {errorMessage}
                          </FormHelperText>
                        </Box>
                        <Box mt={2} align="left" style={{ maxWidth: "350px" }}>
                          <label>New Passsword</label>
                          <TextField
                            className={`${classes.inputvalue} textFeilds`}
                            placeholder="Enter Your Password"
                            size="small"
                            variant="outlined"
                            fullWidth
                            step="any"
                            name="password"
                            value={values.password}
                            // placeholder="Enter your password"
                            error={Boolean(touched.password && errors.password)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type={showPassword1 ? "text" : "password"}
                            InputProps={{
                              className: classes.TextBox,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setShowPassword1(!showPassword1)
                                    }
                                    edge="end"
                                  >
                                    <Box className={classes.passsec}>
                                      {showPassword1 ? (
                                        <BiLockOpen
                                          style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            color: "#1069C2",
                                            alignItems: "center",
                                          }}
                                        />
                                      ) : (
                                        <BiLock
                                          style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            color: "#1069C2",
                                            alignItems: "center",
                                          }}
                                        />
                                      )}
                                    </Box>
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                          <FormHelperText
                            error
                            style={{ fontSize: "12px", marginTop: ".3px" }}
                          >
                            {touched.password && errors.password && (
                              <FormHelperText
                                error
                                style={{ margin: "0px", fontSize: "12px" }}
                              >
                                <ul
                                  style={{
                                    padding: "0px 0px 0px 19px",
                                    marginTop: "0px",
                                  }}
                                >
                                  <li>
                                    Must contain 8 characters, one uppercase,
                                    one lowercase, one number and one special
                                    case character
                                  </li>
                                </ul>
                              </FormHelperText>
                            )}
                          </FormHelperText>
                        </Box>
                        <Box mt={2} align="left" style={{ maxWidth: "350px" }}>
                          <label>Confirm Passsword</label>
                          <TextField
                            className={`${classes.inputvalue} textFeilds`}
                            placeholder="Enter Your Confirm Password"
                            size="small"
                            variant="outlined"
                            fullWidth
                            step="any"
                            value={values.confirm}
                            name="confirm"
                            error={Boolean(touched.confirm && errors.confirm)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type={showPassword2 ? "text" : "password"}
                            InputProps={{
                              className: classes.TextBox,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setShowPassword2(!showPassword2)
                                    }
                                    edge="end"
                                  >
                                    <Box className={classes.passsec}>
                                      {showPassword2 ? (
                                        <BiLockOpen
                                          style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            color: "#1069C2",
                                            alignItems: "center",
                                          }}
                                        />
                                      ) : (
                                        <BiLock
                                          style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            color: "#1069C2",
                                            alignItems: "center",
                                          }}
                                        />
                                      )}
                                    </Box>
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                          <FormHelperText error>
                            {touched.confirm && errors.confirm}
                          </FormHelperText>
                        </Box>

                        <Box mt={3}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={isLoading}
                            style={{
                              padding: "10px 40px",
                              borderRadius: "8px",
                            }}
                          >
                            Update {isLoading && <ButtonCircularProgress />}
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Container>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Page>
    </>
  );
};

export default ChangePassword;
