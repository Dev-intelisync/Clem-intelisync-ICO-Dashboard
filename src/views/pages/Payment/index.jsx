import React, { useState, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "./styles.css";
import { AuthContext } from "@context/Auth";

import { makeStyles, Typography, Box } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const stripePromise = loadStripe(
  "pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
);

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#3a99c3",
      color: "#3a99c3",
      fontWeight: 500,
      fontFamily: "'Inter', sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#3a99c3",
      },
      "::placeholder": {
        color: "#3a99c3",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#3a99c3",
    },
  },
};

const useStyles = makeStyles((theme) => ({
  formGroups: {
    "& .ElementsApp, .ElementsApp .InputElement": {
      color: "#3a99c3",
    },
    color: "#3a99c3",
    // background: "#52565c",
    "& ..FormRowLabel": {
      color: "#3a99c3",
    },
    "& .FormRowInput": {
      "& :-webkit-autofill": {
        color: "black",
      },
    },
  },
  SubmitButton: {
    color: "gray",
    boxShadow:
      "0 6px 9px rgb(50 50 93 / 6%), 0 2px 5px rgb(0 0 0 / 8%), inset 0 1px 0 #f222222",
  },
}));

const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
  maxlength,
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      maxlength={maxlength}
    />
  </div>
);

const SubmitButton = ({
  processing,
  error,
  children,
  disabled,
  handleFormSubmit,
  setfinalbaydata,
}) => (
  <button
    className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const ResetButton = ({ onClick }) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#FFF"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);

const CheckoutForm = ({
  planId,
  madePayment,
  setfinalbaydata,
  planPrice,
  handleFormSubmit,
  billingDetails,
  currencyInr,
  filterData,
  setBillingDetails,
  closedata,
  setclosedata,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [closebuttonpopup, setclosebuttonpopup] = useState(false);
  const [faslepopup, setfaslepopup] = useState(false);
  const auth = useContext(AuthContext);
  const useremail = auth?.userData?.email;
  const username = auth?.userData?.firstName;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    if (error) {
      elements.getElement("card").focus();
      return;
    }
    if (cardComplete) {
      setProcessing(true);
    }
    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });

    setfinalbaydata(payload?.paymentMethod);
    setProcessing(false);

    if (payload.error) {
      setError(payload.error);
    } else {
      setPaymentMethod(payload.paymentMethod);
      setfaslepopup(false);
      handleFormSubmit(payload?.paymentMethod);
    }
  };
  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);

    setBillingDetails({
      email: "",
      phone: "",
      name: "",
    });
  };

  const classes = useStyles();
  return paymentMethod ? (
    <Box>
      <Box
        style={{ display: "flex", justifyContent: "end", width: "100%" }}
      ></Box>
      <div className="Result">
        <div className="ResultTitle" role="alert">
          Payment successful &nbsp;&nbsp;
          <span style={{ marginTop: "40px" }}>
            <CheckCircleIcon style={{ color: "#869558", fontSize: "22px" }} />
          </span>
        </div>
        <div className="ResultMessage">
          Thanks for trying Stripe Elements. No money was charged, but we
          generated a PaymentMethod:
        </div>
      </div>
    </Box>
  ) : (
    <form
      className={classes.formGroups}
      className="Form"
      onSubmit={handleSubmit}
      // onClose={setPaymentMethod}
    >
      <Typography
        style={{
          color: "black",
          marginBottom: "14px",
          marginLeft: "15px",
        }}
        variant="h4"
      >
        Enter your card details
      </Typography>
      <fieldset className={classes.formGroups} className="FormGroup">
        <Field
          label="Name"
          id="name"
          type="text"
          placeholder="Please enter your name"
          required
          autoComplete="name"
          value={billingDetails.name}
          // inputProps={{ readOnly: true }}
          onChange={(e) => {
            setBillingDetails({
              ...billingDetails,
              name: e.target.value,
            });
          }}
        />
      </fieldset>
      <fieldset className={classes.formGroups} className="FormGroup">
        <CardField
          style={{ color: "#3a99c3" }}
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton
        handleFormSubmit={handleFormSubmit}
        processing={processing}
        error={error}
        disabled={!stripe || billingDetails.phone.length > 10}
      >
        Pay $ {filterData?.toFixed(8)}
      </SubmitButton>
    </form>
  );
};

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

const Payment = ({
  planId,
  madePayment,
  setfinalbaydata,
  planPrice,
  handleFormSubmit,
  billingDetails,
  setBillingDetails,
  finalbaydata,
  currencyInr,
  filterData,
  closedata,
  setclosedata,
}) => {
  return (
    <div className="AppWrapper">
      <Elements
        stripe={stripePromise}
        options={ELEMENTS_OPTIONS}
        finalbaydata={finalbaydata}
      >
        <CheckoutForm
          closedata={closedata}
          setclosedata={(data) => setclosedata(data)}
          currencyInr={currencyInr}
          filterData={filterData}
          setBillingDetails={setBillingDetails}
          billingDetails={billingDetails}
          setfinalbaydata={setfinalbaydata}
          handleFormSubmit={handleFormSubmit}
          planId={planId}
          madePayment={madePayment}
          planPrice={planPrice}
        />
      </Elements>
    </div>
  );
};

export default Payment;
