import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { AuthContext } from "@context/Auth";

import TableRow from "@material-ui/core/TableRow";
import { Box } from "@material-ui/core";
import Axios from "axios";
import ApiConfig from "../../../config/APIConfig";
import { toast } from "react-toastify";
import moment from "moment";
import { sortAddress } from "@utils";
import NoDataFound from "src/DataNotFound";
import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { BiCopy } from "react-icons/bi";

import { CopyToClipboard } from "react-copy-to-clipboard";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function createData(username, name, cointype, calories, fat, carbs, protein) {
  return { username, name, cointype, calories, fat, carbs, protein };
}

const rows = [
  createData("Prakash", "12-03-2022", "ETH", 159, 6.0, 24, 4.0),
  createData("Prakash", "12-03-2022", "ETH", 237, 9.0, 37, 4.3),
  createData("Prakash", "12-03-2022", "ETH", 262, 16.0, 24, 6.0),
  createData("Prakash", "12-03-2022", "ETH", 305, 3.7, 67, 4.3),
  createData("Prakash", "12-03-2022", "ETH", 356, 16.0, 49, 3.9),
];

export default function DeposityHistory() {
  const classes = useStyles();
  const [historyData, setHistoryData] = useState([]);
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const data = auth?.userData ? auth?.userData : "";

  const historyHandler = async () => {
    setIsLoading(true);
    try {
      const res = await Axios.get(ApiConfig.transactionHistoy, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          fkUserId: data?.userId,
          page: 0,
          pageSize: 10,
          txnType: "DEPOSIT",
        },
      });
      if (res.data.status === 200) {
        setHistoryData(res.data.data.resultlist);
        setIsLoading(false);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        setIsLoading(false);
      } else {
        toast.error(error.message);
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    if (data?.userId) {
      historyHandler();
    }
  }, []);

  return (
    <>
     <div style={{ borderLeft: "5px solid #56CA00", marginBottom: "20px" }}>
          
        </div>
      <Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {/* <TableCell>User Name</TableCell> */}
              <TableCell>Date</TableCell>
              <TableCell>Coin Name</TableCell>
              <TableCell align="center">Amount</TableCell>
              {/* <TableCell align="center">Trx. Hash</TableCell> */}
              <TableCell align="center">Transaction Type</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData &&
              historyData.map((row, id) => (
                <TableRow key={id}>
                  {/* <TableCell scope="row" className={classes.tables}>
                    {row?.userName ? row?.userName : "N/A"}
                  </TableCell> */}
                  <TableCell scope="row" className={classes.tables}>
                    {/* {row?.txnTime
                      ? moment(row.txnTime).format("MMMM Do YYYY, h:mm:ss a ")
                      : "0"} */}
                    {row?.txnTime ? moment(row.txnTime).format("lll") : "0"}
                  </TableCell>
                  <TableCell scope="row" className={classes.tables}>
                    {row?.coinType ? row?.coinType : "BNB"}
                  </TableCell>
                  <TableCell align="center" className={classes.tables}>
                    {row?.amount ? row?.amount : ""}
                  </TableCell>
                  {/* <TableCell align="center" className={classes.tables}>
                    {row?.txnHash ? sortAddress(row?.txnHash) : ""}
                    {row?.txnHash ? (
                      <CopyToClipboard text={data?.txnHash}>
                        <BiCopy
                          style={{
                            color: "#fff",
                            fontSize: " 14px",
                            cursor: "pointer",
                            marginLeft: "5px",
                          }}
                          onClick={() => toast.success("Copied successfully")}
                        />
                      </CopyToClipboard>
                    ) : (
                      <></>
                    )}
                  </TableCell> */}
                  <TableCell align="center" className={classes.tables}>
                    {row?.txnType ? row?.txnType : "N/A"}
                  </TableCell>
                  <TableCell align="center" className={classes.tables}>
                    {row?.status}
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading && historyData && historyData.length === 0 && (
              <Box
                style={{
                  marginTop: "1rem",
                }}
              >
                <NoDataFound />
              </Box>
            )}
            {isLoading && (
              <Box style={{ marginTop: "1rem" }}>
                <ButtonCircularProgress />
              </Box>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </>
  
  );
}
