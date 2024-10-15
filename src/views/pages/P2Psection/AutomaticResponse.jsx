import {
  Typography,
  Box,
  makeStyles,
  TextField,
  Checkbox,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainclass: {
    marginTop: "30px",
    "& h4": {
      fontSize: "18px",
    },
  },
  secuirty: {
    marginTop: "10px",
    "& h3": {
      fontSize: "18px",
    },
    "& h5": {
      fontSize: "14px",

      fontWeight: "400",
    },
  },
}));

const AutomaticResponse = ({
  priceUSD,
  priceINR,
  CryptoCoin,
  formData,
  setFormData,
  isSubmit,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [selectedValue, setSelectedValue] = React.useState("a");
  const handleChange5 = (event) => {
    setSelectedValue(event.target.value);
  };

  const _onInputChange = (name, value) => {
    const temp = { ...formData, [name]: value };
    setFormData(temp);
  };
  const _onCheckChange = (name, value) => {
    const temp = { ...formData, [name]: value };
    setFormData(temp);
  };
  return (
    <Box className={classes.mainclass}>
      <Box>
        <label style={{}}>Remarks(Optional)</label>
        <TextField
          className={`${classes.inputvalue} textFeilds`}
          placeholder="Please enter remarks"
          size="small"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          onChange={(e) => _onInputChange("termsOfTrade", e.target.value)}
          value={formData.termsOfTrade}
        />
      </Box>
      <Box>
        <label style={{}}>Auto Reply(Optional)</label>
        <TextField
          className={`${classes.inputvalue} textFeilds`}
          placeholder="Auto reply message will be sent to the countryparty once the order is created."
          size="small"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          onChange={(e) => _onInputChange("autoReplyMessage", e.target.value)}
          value={formData.autoReplyMessage}
        />
      </Box>
      <Box className={classes.secuirty}>
        <label style={{}}>Counterparty Conditions</label>
        <Box style={{ display: "flex", marginTop: "5px" }}>
          <Checkbox
            onChange={(e) => _onCheckChange("isKYC", e.target.checked)}
            value={formData.isKYC}

            // disabled
          />
          <Typography variant="h5" style={{ marginTop: "3px" }}>
            KYC Completed
          </Typography>
        </Box>
        {/* <Box mt={1}>
          <label style={{ fontSize: "14px" }}>Wallet Method</label>
          <Box mt={-2}>
            <FormControlLabel
              control={
                <Radio
                  color="primary"
                  checked={formData.walletMethod == "withEscrow"}
                  // onChange={handleChange5}
                  onChange={(e) => _onInputChange("walletMethod", "withEscrow")}
                  value="b"
                />
              }
              label="With Escrow "
            />
            <FormControlLabel
              control={
                <Radio
                  color="primary"
                  checked={formData.walletMethod == "withOutEscrow"}
                  // onChange={handleChange5}
                  onChange={(e) =>
                    _onInputChange("walletMethod", "withOutEscrow")
                  }
                  value="a"
                />
              }
              label="Without Escrow "
            />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default AutomaticResponse;
