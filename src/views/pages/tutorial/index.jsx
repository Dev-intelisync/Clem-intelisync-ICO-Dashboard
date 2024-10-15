import React from "react";

import { Container, Box, Typography, Grid, Button } from "@material-ui/core";
import Page from "@component/Page";
function Tutorial(props) {
  return (
    <Page title="Tutorial">
      <Box m={4}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid sm={6}>
              <Box mb={3}>
                <Typography variant="h4">About Alende</Typography>
              </Box>
              <Typography variant="body2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Typography>
            </Grid>
            <Grid sm={6}>
              <img
                src="/images/login.png"
                style={{ width: "100%", maxWidth: 380 }}
                alt=""
              />
            </Grid>
            <Grid container direction={"column"} spacing={3}>
              <Grid item>
                <Typography variant="body2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" size="medium">
                  Next
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
}

export default Tutorial;
