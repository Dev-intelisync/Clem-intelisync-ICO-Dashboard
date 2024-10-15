import React, { useState } from "react";
import {
  makeStyles,
  Box,
  Grid,
  TextField,
  FormHelperText,
  Button,
} from "@material-ui/core";
import { toast } from "react-toastify";
import ButtonCircularProgress from "../component/ButtonCircularProgress";
import { Form, Formik } from "formik";
import Axios from "axios";
import * as yep from "yup";
import ApiConfig from "../config/APIConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px",
  },
}));

function UpdateReplySupportTicket(props) {
  const classes = useStyles();
  const { ticketReply_Idd, handleCloseEditText } = props;
  const [btnText, setBtnText] = useState("SUBMIT");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [urlImage, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const formValidationSchema = yep.object().shape({
    description: yep
      .string()
      .required(" Message is required")
      .min(10, "Please enter atleast 10 characters")
      .max(350, "You can enter only 350 characters"),
  });

  const FormHandleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.updateReplyTicket,
        params: {
          ticketReplyId: ticketReply_Idd,
        },
        data: {
          isEdited: true,
          message: values.description,
        },
      });
      if (res.data.status === 200) {
        toast.success("Your message has been edited successfully");
        setIsLoading(false);
        props.getTicketReplyData();
        handleCloseEditText();
      }
      if (res.data.status === 203) {
        toast.warn(res.data.message);
        setIsLoading(false);
        setOpen(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleChangeStatus = async ({ meta, file }, status) => {
    if (status !== "done") {
      return;
    }
    setUploadImageLoading(true);
    const formDataImages = new FormData();
    formDataImages.append("file", file);
    const response = await Axios({
      method: "POST",
      url: ApiConfig.uploadFile,
      data: formDataImages,
    });
    if (response.data.status === 200) {
      toast.success("Images submitted successfully");
      setImage(response.data.data);
      setUploadImageLoading(false);
    } else {
      setUploadImageLoading(false);
      toast.error("Image not uploaded");
    }
  };

  return (
    <>
      <Box className={classes.root}>
        <Formik
          initialValues={{ description: " " }}
          initialStatus={{
            success: false,
            successMsg: "",
          }}
          validationSchema={formValidationSchema}
          onSubmit={(values) => FormHandleSubmit(values)}
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
              <Grid container spacing={2} direction={"column"}>
                <Grid item xs={12} md={12}>
                  <label>
                    Message<sup>*</sup>
                  </label>
                  <TextField
                    placeholder="Enter your message"
                    type="text"
                    size="small"
                    variant="outlined"
                    multiline
                    fullWidth
                    maxRows={4}
                    Scroll="auto"
                    name="description"
                    value={values.description}
                    error={Boolean(touched.description && errors.description)}
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
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                  >
                    {btnText} {isLoading && <ButtonCircularProgress />}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}

export default UpdateReplySupportTicket;
