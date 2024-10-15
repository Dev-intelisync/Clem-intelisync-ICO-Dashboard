import React from 'react';
import '@scss/main.css';
import Logo from '@component/Logo';
import { BsCheckCircle } from 'react-icons/bs';
import { Typography, Grid, Link } from '@material-ui/core';

function ForgetasswordLink(props) {
  return (
    <Grid container>
      <Grid sm={3} md={4} />
      <Grid
        className="d-flex"
        container
        sm={6}
        md={4}
        direction={"column"}
        spacing={1}
        style={{ textAlign: "center", height: "100vh" }}
      >
        <Grid item>
          <Logo width="180" style={{ padding: "30px 0", cursor: "pointer" }} />
          <BsCheckCircle
            display="block"
            fontSize="80"
            style={{ margin: "0 auto" }}
          />
          <Typography variant="h5" className="extra-bold">
            Instructions sent!
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" className="padding10">
            We have Sent you instructions on your mail <b>mail@mail.com</b>
            .please check and follow the steps.
          </Typography>
        </Grid>

        <Grid item>
          <Typography
            color="primary.main"
            variant="body2"
            style={{ marginTop: "20px" }}
          >
            <Link href="#">Back To Login</Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ForgetasswordLink;
