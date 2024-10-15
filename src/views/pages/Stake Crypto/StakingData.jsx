import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";
import React, { useContext } from "react";
import { AuthContext } from "@context/Auth";
import moment from "moment";
import { Pagination } from "@material-ui/lab";
import DataNotFoundIMG from "@component/DataNotFoundIMG";
import ButtonCircularProgress from "@component/ButtonCircularProgress";

export default function StakingData({ classes }) {
  const auth = useContext(AuthContext);
  const view = auth?.view;
  return (
    <div>
      {auth.isLoading ? (
        <ButtonCircularProgress />
      ) : (
        <>
          <TableContainer className="TableContainerBox">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">Sr. No.</TableCell>
                  <TableCell align="right">Coin Name</TableCell>
                  <TableCell align="right">Staked Amount</TableCell>
                  <TableCell align="right">Payout Amount </TableCell>
                  <TableCell align="right"> Date </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {view &&
                  view.map((value, index) => {
                    return (
                      <TableRow>
                        <TableCell align="right">{index + 1}</TableCell>
                        <TableCell align="right">
                          {value?.coinId?.coinName
                            ? value?.coinId?.coinName
                            : "N/A"}
                        </TableCell>

                        <TableCell align="right">
                          {value.price ? value.price : "N/A"}
                        </TableCell>
                        <TableCell align="right">
                          {value.payOutAmount ? value.payOutAmount : " N/A"}
                        </TableCell>
                        <TableCell align="right">
                          {moment(value.updatedAt).format("lll")}{" "}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {view && view.length == 0 && <DataNotFoundIMG />}
          {view && view.length > 0 && (
            <Pagination
              count={Math.ceil(auth.pagesCount)}
              page={auth?.page}
              onChange={(e, value) => auth.setPage(value)}
            />
          )}
        </>
      )}
    </div>
  );
}
