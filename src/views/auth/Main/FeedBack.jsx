import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Box,
  TextField,
  Grid,
  Typography,
  makeStyles,
  FormHelperText,
  Container,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Page from "@component/Page";
import { Form, Formik } from "formik";
import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { useHistory, Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReCAPTCHA from "react-google-recaptcha";
import Nav from "./nav";
import Footer from "./footer";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { toast } from "react-toastify";
import * as yep from "yup";
import {
  BsFillEmojiLaughingFill,
  BsEmojiSmileFill,
  BsFillEmojiNeutralFill,
  BsFillEmojiFrownFill,
  BsFillEmojiDizzyFill,
} from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    background: theme.palette.background.dark,
    "& h3": {
      color: theme.palette.text.primary,
      fontSize: "28px",

      marginBottom: "20px",

      [theme.breakpoints.down("xs")]: {
        fontSize: "25px",
        lineHeight: "30px",
      },
    },
    "& p": {
      color: theme.palette.text.primary,
    },
  },
  icons: {
    "& svg": {
      fontSize: "55px",
    },
  },
  customBox: {
    [theme.breakpoints.down("sm")]: {
      margin: 0,
    },
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
    "& .formbox": {
      borderRadius: "8px",
      border: "1px solid rgba(128, 128, 128, 0.22)",
      padding: "20px",
      marginTop: "65px",
    },
  },

  svgIcon: {
    color: "green !important",
    "& label": {
      "& span": {
        " & svg": {
          "&:active": {
            // color: "red !important",
          },
        },
      },
    },
  },
}));
const labels = {
  1: "Useless+",
  2: "Poor+",
  3: "Ok+",
  4: "Good+",
  5: "Excellent+",
};
export default function ContactUsForm() {
  const classes = useStyles();
  const formValidationSchema = yep.object().shape({
    description: yep
      .string()
      .required(" Message is required")
      .min(10, "Please enter at least 10 characters")
      .max(350, "You can enter only 350 characters"),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState();
  const [btnText, setBtnText] = useState("Submit");
  const [countryCode, setCountryCode] = useState("");
  const history = useHistory();
  const recaptchaRef = React.createRef();
  const [done, setDone] = useState(false);
  const [value, setValue] = React.useState(5);
  const [hover, setHover] = React.useState(5);
  const [feedback, setFeedback] = useState();
  const [message, setMessage] = useState("");

  const formInitialValue = {
    email: "",
    firstName: "",
    description: "",
    phoneNo: phone,
  };

  const refs = {
    home: useRef(null),
    about: useRef(null),
    features: useRef(null),
    faq: useRef(null),
    roadmap: useRef(null),
    contact: useRef(null),
  };
  const onButtonClick = (abc) => {
    history.push("/");
    // console.log(abc);
    // const data = refs[abc].current;
    // console.log(data);
    window.scrollTo({
      top: refs[abc].current?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const FeedbackForm = async (values) => {
    setIsLoading(true);

    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.addFeedback,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          rating: value.toString(),
          description: values.description,
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoading(false);
        toast.success(res.data.responseMessage);
        setFeedback(res.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Page title="Feedback">
      <Nav buttonClick={onButtonClick} />
      <Box className={classes.mainBox}>
        <Container>
          <Box mt={3} pb={3}>
            <Grid
              container
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box pt={3} mb={3} className="bankbox">
                  <Box className={classes.customBox}>
                    <Box mb={2}></Box>
                    <Box className="formbox">
                      <Box align="center">
                        {" "}
                        <Typography variant="h3" className="Styleword">
                          Feedback
                        </Typography>
                      </Box>

                      <Box>
                        <Formik
                          onSubmit={(values, { resetForm }) => {
                            FeedbackForm(values);
                            resetForm();
                          }}
                          initialValues={{
                            description: "",
                          }}
                          initialStatus={{
                            success: false,
                            successMsg: "",
                          }}
                          validationSchema={yep.object().shape({
                            description: yep
                              .string()
                              .required(" Message is required")
                              .min(10, "Please enter at least 10 characters")
                              .max(350, "You can enter only 350 characters"),
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
                              <Grid container>
                                <Grid item xs={12} md={12}>
                                  {/* <Box mt={2} mb={2} align="center">
                                    <Rating
                                      name="simple-controlled"
                                      value={value}
                                      onChange={(event, newValue) => {
                                        setValue(newValue);
                                      }}
                                    />
                                  </Box> */}
                                  <Box align="center" mt={2} mb={2}>
                                    <Rating
                                      className={classes.svgIcon}
                                      style={{ fontSize: "40px" }}
                                      // style={
                                      //   value === 1 ? { color: "yellow" } : {}
                                      // }
                                      name="simple-controlled"
                                      value={value}
                                      precision={1}
                                      onChange={(event, newValue) => {
                                        setValue(newValue);
                                      }}
                                      onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                      }}
                                    />
                                    {value !== null && (
                                      <Box ml={2}>
                                        {labels[hover !== -1 ? hover : value]}
                                      </Box>
                                    )}
                                    {value !== null && (
                                      <Box ml={2}>
                                        {value === 1 ? (
                                          <Rate1 />
                                        ) : value === 2 ? (
                                          <Rate2 />
                                        ) : value === 3 ? (
                                          <Rate3 />
                                        ) : value === 4 ? (
                                          <Rate4 />
                                        ) : (
                                          <Rate5 />
                                        )}
                                      </Box>
                                    )}
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                  <Typography variant="body1">
                                    Do you have any thought’s you would like to
                                    share?
                                  </Typography>
                                  <TextField
                                    placeholder="Enter your message"
                                    type="text"
                                    size="small"
                                    variant="outlined"
                                    rows={5}
                                    multiline
                                    fullWidth
                                    name="description"
                                    // onChange={(e) => setMessage(e.target.value)}
                                    value={values.description}
                                    error={Boolean(
                                      touched.description && errors.description
                                    )}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  <FormHelperText
                                    error
                                    style={{ margin: "0px", fontSize: "12px" }}
                                  >
                                    {touched.description && errors.description}
                                  </FormHelperText>
                                </Grid>
                              </Grid>
                              <Box
                                mt={2}
                                style={{ width: "100%", display: "none" }}
                              >
                                <form
                                  onSubmit={() => {
                                    recaptchaRef.current.execute();
                                  }}
                                >
                                  <ReCAPTCHA
                                    // ref={recaptchaRef}
                                    checked={done}
                                    // size="invisible"
                                    // size="invisible"
                                    // originsitekey 6Lc2nUIgAAAAAHhIawk-yJCvv4wIUcYZiE1gFlc3
                                    // sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                    // sitekey="6Lfv2toiAAAAAJdn6r5LY29svYG9NyXelaoTThpQ"
                                    sitekey="6Le-udsiAAAAAO7ZwZNaOCclOD6Ef2ulCQxEyzj2"
                                    secretkey="6Le-udsiAAAAAMMUzQOPMtG6Kcd6Phm3VFR-fbk_"
                                    onChange={() => setDone(true)}
                                  />
                                </form>
                              </Box>
                              <Box
                                mt={2}
                                style={{ display: "flex", flexWrap: "wrap" }}
                              >
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  onClick={() => history.push("/")}
                                >
                                  Cancel
                                </Button>
                                &nbsp;&nbsp;
                                <Button
                                  variant="contained"
                                  style={{ padding: "13px 30px" }}
                                  color="secondary"
                                  type="submit"
                                  onClick={() => FeedbackForm()}
                                >
                                  {btnText}{" "}
                                  {isLoading && <ButtonCircularProgress />}
                                </Button>
                              </Box>
                            </Form>
                          )}
                        </Formik>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Page>
  );
}

const Rate5 = () => {
  const classes = useStyles();
  return (
    <Box className={classes.icons}>
      <BsFillEmojiLaughingFill style={{ color: "#33a975" }} />
    </Box>
  );
};

const Rate4 = () => {
  const classes = useStyles();
  return (
    <Box className={classes.icons}>
      <BsEmojiSmileFill style={{ color: "#accb25" }} />
    </Box>
  );
};

const Rate3 = () => {
  const classes = useStyles();
  return (
    <Box className={classes.icons}>
      <BsFillEmojiNeutralFill style={{ color: "#f8c611" }} />
    </Box>
  );
};

const Rate2 = () => {
  const classes = useStyles();
  return (
    <Box className={classes.icons}>
      <BsFillEmojiFrownFill style={{ color: "#f58118" }} />
    </Box>
  );
};

const Rate1 = () => {
  const classes = useStyles();
  return (
    <Box className={classes.icons}>
      <BsFillEmojiDizzyFill style={{ color: "#e31b1a" }} />
    </Box>
  );
};
