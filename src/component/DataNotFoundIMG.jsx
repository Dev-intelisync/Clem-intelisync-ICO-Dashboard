import { Box, Typography } from "@material-ui/core";
import React from "react";

export default function DataNotFoundIMG() {
  return (
    <Box
      style={{
        margin: "0 auto",
        justifyContent: "center",
        width: "100%",
        marginTop: "20px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <img
          // onClick={() => history.push("/")}
          // ..="/images/dataNotFound.png"
          src={"/images/dataNotFound.png"}
          alt="Data Not Found"
          style={{ cursor: "pointer" }}
          // {...props}
        />
      </div>

      <Typography
        style={{
          color: "#fff",
          fontSize: "16px",
          fontFamily: "Inter",
          textAlign: "center",
        }}
      >
        No data found
      </Typography>
    </Box>
  );
}
