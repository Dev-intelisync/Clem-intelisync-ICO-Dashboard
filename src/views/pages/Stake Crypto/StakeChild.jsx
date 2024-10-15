import ButtonCircularProgress from "@component/ButtonCircularProgress";
import { Box, Button, Typography } from "@material-ui/core";
import React, { useEffect } from "react";

export default function StakeChild({
  classes,
  handleClickOpen,
  stateData,
  user,
  setCoinName,
  setInterest,
  setMinimumBal,
  fixedDepositHandler,
  isLoading,
  newsvalueAmount,
  interestAmount,
  availableBalance,
  setCoinPrice,
}) {
  const setCoinNAme = () => {
    let coin = user?.coinName;
    let coinPrice = user?.balance;
    let interest = stateData?.interest;
    let mimimumbal = stateData?.minimumLockedAmount;
    setCoinName(coin);
    setInterest(interest);
    setMinimumBal(mimimumbal);
    setCoinPrice(coinPrice);
  };
  useEffect(() => {
    setCoinNAme();
  }, [user?.coinName, stateData?.interestRate, stateData?.minimumLockedAmount]);

  return (
    <Box>
      <Box
        mt={2}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box>
            <Typography>
              Available :{" "}
              <span style={{ color: "#2E7FCA" }}>
                {user?.balance}{" "}
                {user?.coinName === "VD" ? (
                  "VDT"
                ) : (
                  <>{user?.coinName ? user?.coinName : "N/A"}</>
                )}
              </span>{" "}
            </Typography>
            <Typography>
              Maximum :{" "}
              <span style={{ color: "#2E7FCA" }}>
                {" "}
                {stateData?.max}&nbsp;
                {user?.coinName === "VD" ? "VDT" : <>{user?.coinName}</>}
              </span>{" "}
            </Typography>
            <Typography>
              Minimum :{" "}
              <span style={{ color: "#2E7FCA" }}>
                {" "}
                {stateData?.min}&nbsp;
                {user?.coinName === "VD" ? "VDT" : <>{user?.coinName}</>}
              </span>{" "}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box className={classes.Percentage}>
            <Button className={classes.Percentage1}>
              {stateData?.days && "1 year"
                ? stateData?.days && "1 year"
                : "1 year"}
            </Button>
          </Box>

          <Box style={{ textAlign: "right" }}>
            <Typography>
              Payout Amount :{" "}
              <span style={{ color: "#2E7FCA" }}>
                {newsvalueAmount ? newsvalueAmount : 0}
              </span>
            </Typography>
            {/* <Typography>
            44.444 %
            <span style={{ color: "#2E7FCA" }}>
              higher than our base returns
            </span>{" "}
          </Typography> */}
          </Box>
        </Box>
      </Box>

      <Box mt={1}>
        <Typography style={{ fontSize: "14px" }}>
          INTEREST {stateData?.interest} % APY
        </Typography>
      </Box>

      <Box mt={3} align="center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={
            user?.balance === 0 ||
            interestAmount <= "0" ||
            interestAmount === "" ||
            interestAmount > availableBalance ||
            interestAmount < stateData?.minimumLockedAmount ||
            interestAmount > stateData?.maximumLockedAmount
          }
          onClick={() => fixedDepositHandler()}
        >
          Stake {isLoading && <ButtonCircularProgress />}
        </Button>
      </Box>
    </Box>
  );
}
