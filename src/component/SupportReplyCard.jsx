import React, { useState } from "react";
import {
  Button,
  Box,
  TextField,
  Grid,
  Typography,
  FormHelperText,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import ButtonCircularProgress from "../component/ButtonCircularProgress";
import Dropzone from "react-dropzone-uploader";
import * as yep from "yup";
import ApiConfig from "../config/APIConfig";
import Axios from "axios";

export default function SupportReplyCard(props) {
  const { ticket_ID, selectedMessage, sethandleapiclick, data12 } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [btnText, setBtnText] = useState("SUBMIT");
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [imageFront, setImageFront] = useState("");

  const formInitialValue = {
    description: "",
  };

  const formValidationSchema = yep.object().shape({
    description: yep
      .string()
      .required(" Message is required")
      .min(2, "Please enter atleast 2 characters")
      .max(750, "You can enter only 750 characters"),
  });

  const addSupportTicketReplyFormHande = async (values) => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "POST",
        url: ApiConfig.addSupportTicketReply,
        params: {
          role: "USER",
        },
        data: {
          isEdited: false,
          ticketId: ticket_ID,
          message: values.description,
          imageUrl: imageFront,
          languageCode: "string",
        },
      });
      if (res.data.status === 200) {
        setImageFront("");
        toast.success("Your request has been sent successfully");
        setIsLoading(false);
        sethandleapiclick(true);
      }
      if (res.data.status === 203) {
        toast.warn(res.data.message);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleChangeStatus = async ({ meta, file }, status) => {
    try {
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
        setImageFront(response.data.data);
        setUploadImageLoading(false);
      } else {
        setUploadImageLoading(false);
        toast.error("Image not uploaded");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={formInitialValue}
        initialStatus={{
          success: false,
          successMsg: "",
        }}
        validationSchema={formValidationSchema}
        onSubmit={(values, { resetForm }) => {
          addSupportTicketReplyFormHande(values);
          resetForm();
        }}
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
                <label style={{ marginBottom: "5px" }}>
                  {" "}
                  Attach Image <sup>*</sup>
                </label>
                {imageFront !== "" ? (
                  <>
                    <Box
                      style={{
                        maxHeight: "200px",
                        minHeight: "130px",
                        borderRadius: "5px",
                        width: "100%",
                        margin: 0,
                      }}
                    >
                      <img
                        ..={imageFront ? imageFront : "/images/can.png"}
                        alt=" "
                        style={{
                          maxHeight: "200px",
                          minHeight: "130px",
                          borderRadius: "5px",
                        }}
                      />
                      <IconButton
                        variant="contained"
                        size="large"
                        color="secondary"
                        type="submit"
                        onClick={() => {
                          setImageFront("");
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      style={{
                        maxHeight: "300px",
                        minHeight: "130px",
                        borderRadius: "20px",
                      }}
                    >
                      <Box>
                        {" "}
                        <Box
                          className="upload-btn-wrapper "
                          style={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          <Dropzone
                            maxFiles={1}
                            onChangeStatus={handleChangeStatus}
                            accept="image/*,video/*"
                            initialFiles={[imageFront]}
                            inputContent={(files, extra, rejectedFiles) =>
                              extra.files ? (
                                "Image, Video files only"
                              ) : (
                                <Box
                                  textAlign="center"
                                  py={5}
                                  className="uploadbox"
                                >
                                  <Typography
                                    color="primary"
                                    variant="h6"
                                    style={{ cursor: "pointer" }}
                                  >
                                    Upload your Issues Pic Here
                                  </Typography>
                                </Box>
                              )
                            }
                          />
                          {uploadImageLoading && (
                            <Box
                              style={{
                                position: "absolute",
                                zIndex: "1",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                              }}
                            >
                              <ButtonCircularProgress />
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading || uploadImageLoading}
                >
                  {btnText} {isLoading && <ButtonCircularProgress />}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}
