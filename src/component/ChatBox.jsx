// import React, { useContext, useEffect, useRef, useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   Avatar,
//   makeStyles,
//   TextField,
//   Grid,
// } from "@material-ui/core";
// import { GrAddCircle } from "react-icons/gr";
// import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// import { BsThreeDotsVertical, BsPlusLg } from "react-icons/bs";
// import { BiSend } from "react-icons/bi";
// import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
// import SettingsContext from "../context/SettingsContext";
// import axios from "axios";
// // import axios from "axios";
// // import ApiConfig, { baseUrl } from "../config/APICongig";
// import { AuthContext } from "../context/Auth";
// import Axios from "axios";
// import { toast } from "react-toastify";
// import { css } from "@emotion/css";
// import ScrollToBottom, {
//   useScrollToBottom,
//   useSticky,
// } from "react-scroll-to-bottom";

// const socket = window.io(baseUrl, {
//   transports: ["websocket", "polling", "flashsocket"],
// });
// console.log("socket----", socket);

// const useStyles = makeStyles((theme) => ({
//   mainBox: {
//     backgroundPosition: "center",
//     backgroundAttachment: "fixed",
//     backgroundSize: "contain",

//     width: "100%",
//     "& h6": {
//       fontSize: "13px",
//       color: "#1D2D3F",
//     },
//     "& .tymcolor": {
//       color: "#797979",
//       fontWeight: "400",
//       fontSize: "13px",
//     },
//     "& p": { fontSize: "10px", display: "flex", alignItems: "flex-end" },
//     "& .headerBox": {
//       background: theme.palette.background.chatBox,
//       border: "1px solid rgba(0, 0, 0, 0.1)",
//       padding: "18px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       "& .aligning": {
//         display: "flex",
//         alignItems: "center",
//       },
//     },
//     "& .chatArea": {
//       // maxHeight: "50vh",
//       // minHeight: "40vh",
//       padding: "15px",
//       // overflowY: "scroll",

//       border: "1px solid rgba(0, 0, 0, 0.1)",

//       "& .adminBox": {
//         background: "#FFFFFF",
//         borderRadius: "10px 10px 0px 10px",
//         padding: "13px 20px",
//         width: "fit-content",
//         "& img": {
//           maxHeight: "200px",
//         },
//       },
//       "& .userBox": {
//         background: "#F7E4DA",
//         borderRadius: "10px 0px 10px 10px",
//         padding: "13px 20px",
//         width: "fit-content",
//         "& img": {
//           maxHeight: "200px",
//         },
//       },
//     },
//     "& .inputArea": {
//       background: theme.palette.background.chatBox,
//       // background: " #FFFFFF",
//       borderWidth: "0px 1px 1px 1px",
//       borderStyle: "solid",
//       borderColor: "rgba(0, 0, 0, 0.1)",
//       // borderColor: "#6f6969",
//       display: "flex",
//       // justifyContent: "space-between",
//       alignItems: "center",
//       flexDirection: "row",
//       padding: "10px 10px",
//       [theme.breakpoints.only("xs")]: {
//         justifyContent: "space-between",
//       },
//       "& .chatIconBox": {
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         marginLeft: "14px",
//         width: "100px",
//         "& svg": {
//           color: "#00B0ED",
//           fontSize: "20px",
//         },
//       },
//       "& .addicon": {
//         color: "red !important",
//       },

//       "& .inputFeildBox": {
//         width: "80%",
//         "@media(max-width:470px)": {
//           width: "80%",
//         },
//       },
//     },
//   },
//   inputF: {
//     top: "0",
//     left: "0",
//     width: "100%",
//     cursor: "pointer",
//     height: "100%",
//     opacity: "0",
//     position: "absolute",
//   },
// }));

// const ROOT_CSS = css({
//   height: "385px",
// });

// const ChatBox = ({ receiverId, orderId, chatId }) => {
//   const classes = useStyles();
//   const auth = useContext(AuthContext);
//   const themeSeeting = useContext(SettingsContext);

//   const [sendResponse, setsendResponse] = useState();
//   const [sendResponse1, setsendResponse1] = useState("");
//   const tradeId = window.location.search.split("?")[1];
//   const toUserId = window.location.hash.split("#")[1];
//   const [onlineUsersList, setOnlineUsersList] = useState([]);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [chatHistoryList, setChatHistoryList] = useState([]);
//   const [allHistoryList, setAllHistoryList] = useState([]);
//   const [imageUrl, setImgeUrl] = useState("");
//   const [iamgeURL, setIamgeURL] = useState("");
//   const [message, setMessage] = useState("");

//   const chatListHandler = async () => {
//     try {
//       const res = await Axios({
//         method: "POST",
//         url: ApiConfig.chatList,
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       });
//       if (res.data.responseCode === 200) {
//         setChatHistory(res.data.result);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const chattingHancler = async (id) => {
//     try {
//       const res = await Axios({
//         method: "GET",
//         url: ApiConfig.chat + id,
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       });
//       if (res) {
//         toast.success("chat found");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     chatListHandler();
//     if (chatId) {
//       chattingHancler(chatId);
//     }
//   }, [chatId]);

//   useEffect(() => {
//     socket.on("connection", function () {});
//     return () => {
//       socket.close();
//     };
//   }, []);

//   const onlineUser = (id) => {
//     if (id) {
//       socket.emit("onlineUser", { orderId: id });
//       socket.on("onlineUser", (event) => {
//         setOnlineUsersList(event);
//       });
//     } else {
//     }
//   };
//   // useEffect(() => {
//   //   if (auth?.userData?._id) {
//   //     onlineUser(auth?.userData?._id);
//   //   }
//   // });
//   const offlineUser = (id) => {
//     if (id) {
//       socket.emit("offlineUser", { orderId: id });
//       socket.on("offlineUser", (event) => {
//         setOnlineUsersList(event);
//       });
//     } else {
//     }
//   };
//   const oneToOneChat = () => {
//     if (receiverId) {
//       socket.emit("oneToOneChat", {
//         senderId: auth?.userData?._id,
//         receiverId: receiverId,
//         message: iamgeURL ? iamgeURL : message,
//         mediaType: iamgeURL ? "image" : "text",
//         chatId: chatId,
//       });
//       socket.on("oneToOneChat", (event) => {
//         setAllHistoryList(event.result);
//         setMessage("");
//         setIamgeURL("");

//         chatHistoryHandler(chatId || auth?.userData?._id);
//       });
//     } else {
//     }
//   };

//   const chatHistoryHandler = (id) => {
//     if (id) {
//       socket.emit("viewChat", {
//         chatId: chatId ? chatId : id,
//         senderId: auth?.userData?._id ? auth?.userData?._id : id,
//         userId: auth?.userData?._id ? auth?.userData?._id : id,
//       });
//       socket.on("viewChat", (event) => {
//         setChatHistoryList(event.result);
//       });
//     }
//   };

//   useEffect(() => {
//     onlineUser(auth?.userData?._id);
//     offlineUser(receiverId);
//     if (auth?.userData?._id && chatId) {
//       // chatHistoryHandler(auth?.userData?._id);
//     }
//   }, [auth?.userData, receiverId, auth?.userData?._id]);
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       // onlineUser(auth?.userData?._id);
//       // offlineUser(receiverId);
//       if (auth?.userData?._id && chatId) {
//         chatHistoryHandler(auth?.userData?._id);
//       }
//     }, 1500);

//     return () => clearTimeout(timer);
//   });

//   const uploadFileHandler = async (imageUrl) => {
//     const bodyFormData = new FormData();

//     bodyFormData.append("imageUrl", imageUrl);

//     try {
//       const res = await Axios({
//         method: "POST",
//         url: ApiConfig.uploadFile,
//         data: bodyFormData,
//       });
//       if (res) {
//         setIamgeURL(res.data.result);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Box
//       className={classes.mainBox}
//       style={
//         themeSeeting?.themekey?.theme === "DARK"
//           ? { backgroundColor: "#0c1012" }
//           : { backgroundColor: "#F0F0F0" }
//       }
//       align="left"
//     >
//       <Box className="headerBox">
//         <Box className="aligning">
//           {auth?.userData?._id === chatHistoryList?.senderId?._id && (
//             <>
//               <Avatar
//                 className="avatarIcon"
//                 ..={chatHistoryList?.receiverId?.profilePic}
//               />{" "}
//               &nbsp;&nbsp;
//               <Typography variant="h5">
//                 {chatHistoryList?.receiverId?.firstName}
//               </Typography>
//             </>
//           )}

//           {auth?.userData?._id === chatHistoryList?.receiverId?._id && (
//             <>
//               <Avatar
//                 className="avatarIcon"
//                 ..={chatHistoryList?.senderId?.profilePic}
//               />{" "}
//               &nbsp;&nbsp;
//               <Typography variant="h5">
//                 {chatHistoryList?.senderId?.firstName}
//               </Typography>
//             </>
//           )}
//         </Box>
//         {/* <Box>
//           <IconButton>
//             <BsThreeDotsVertical />
//           </IconButton>
//         </Box> */}
//       </Box>
//       <ScrollToBottom className={ROOT_CSS}>
//         <Box className="chatArea">
//           <Grid container spacing={2}>
//             {chatHistoryList &&
//               chatHistoryList?.messages?.map((values) => {
//                 return (
//                   <>
//                     {values?.senderId?._id === receiverId ? (
//                       <Grid item xs={12} align="left">
//                         <Box className="userBox">
//                           {/* <GoTriangleLeft />
//                   &nbsp;&nbsp; */}
//                           {values?.mediaType === "image" ? (
//                             <>
//                               <img ..={values?.message} />
//                             </>
//                           ) : (
//                             <Typography variant="h6">
//                               {values?.message}
//                             </Typography>
//                           )}
//                         </Box>
//                       </Grid>
//                     ) : (
//                       ""
//                     )}
//                     {values.type === "Time" && (
//                       <Grid item xs={12} align="center">
//                         <Box>
//                           <Typography variant="h6" className="tymcolor">
//                             {values.message}
//                           </Typography>
//                           {/* &nbsp;&nbsp;
//                   <GoTriangleRight /> */}
//                         </Box>
//                       </Grid>
//                     )}
//                     {values?.receiverId?._id === receiverId && (
//                       <Grid item xs={12} align="right">
//                         <Box className="adminBox" mt={1}>
//                           {values?.mediaType === "image" ? (
//                             <>
//                               <img ..={values?.message} alt="" />
//                             </>
//                           ) : (
//                             <Typography variant="h6">
//                               {values?.message}
//                             </Typography>
//                           )}

//                           {/* &nbsp;&nbsp;
//                   <GoTriangleRight /> */}
//                         </Box>
//                       </Grid>
//                     )}
//                   </>
//                 );
//               })}
//           </Grid>
//         </Box>
//       </ScrollToBottom>
//       {iamgeURL && (
//         <Box>
//           <img
//             ..={iamgeURL}
//             alt=""
//             style={{ maxWidth: "100px", height: "100px " }}
//           />
//         </Box>
//       )}

//       <Box className="inputArea">
//         <Box className="inputFeildBox">
//           <TextField
//             variant="outlined"
//             fullWidth
//             placeholder="Enter your message"
//             onChange={(e) => setMessage(e.target.value)}
//             value={message}
//           />
//         </Box>
//         {/* <Grid container spacing={2}>
//           <Grid item xs={4}>
//           <GrAddCircle style={{ color: "00B0ED" }} />
//           </Grid>
//           <Grid item xs={4}>
//           <Box style={{borderLeft:"1px solid gray"}}></Box>
//           </Grid>
//           <Grid item xs={4}>
//           <BiSend style={{ color: "00B0ED", fontSize: "30px" }} />
//           </Grid>
//         </Grid> */}

//         <Box className="chatIconBox">
//           <IconButton>
//             <AddCircleOutlineIcon style={{ fontSize: "30px" }} />
//             {/* <img ..="images/Icon-Plus.png" style={{ width: "20px" }} /> */}

//             <input
//               className={classes.inputF}
//               accept="image/*, application/pdf,doc,.docx,.xls,.xlsx"
//               multiple
//               type="file"
//               name="imageUrl"
//               id="file-upload"
//               onChange={(e) => {
//                 setImgeUrl(e.target.files[0]);

//                 if (e.target.files[0]) {
//                   uploadFileHandler(e.target.files[0]);
//                 }
//               }}
//             />
//           </IconButton>
//           {/* <IconButton>
//           <GrAddCircle style={{ color: "00B0ED" }} />
//           </IconButton> */}

//           <Box
//             style={{ borderLeft: "1px solid #CBCBCB", height: "50px" }}
//           ></Box>
//           <div onClick={() => oneToOneChat()} style={{ cursor: "pointer" }}>
//             <img
//               ..="images/send.png"
//               style={{ width: "30px", cursor: "pointer" }}
//             />
//           </div>
//           {/* <BiSend style={{ color: "00B0ED", fontSize: "30px" }} /> */}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ChatBox;
