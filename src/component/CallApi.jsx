// import apiConfig from "../ApiConfig/ApiConfig";
import axios from "axios";

export const getParticulatManagementDataList = async (endPoint) => {
  try {
    const res = await axios({
      method: "GET",
      //   url: apiConfig[endPoint],
      headers: {
        token: window.sessionStorage.getItem("token"),
      },
    });
    if (res.data.responseCode === 200) {
      return res.data.result;
    }
  } catch (error) {
    console.log(error);
  }
};

export const blockHandler = async (endPoint, dataToSend, _id) => {
  const credentials =
    endPoint === "blockUnblockUser"
      ? {
          _id: dataToSend._id,
          status: dataToSend.status,
        }
      : {
          abx: "xyz",
        };
  //   try {
  //     const res = await axios({
  //       method: "PATCH",
  //       url: apiConfig[endPoint],
  //       headers: {
  //         token: window.sessionStorage.getItem("token"),
  //       },
  //       data: credentials,
  //     });
  //     if (res.data.responseCode === 200) {
  //       return res.data.result;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
};
