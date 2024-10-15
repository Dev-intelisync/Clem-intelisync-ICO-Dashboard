import React from 'react';

import {
  Container,
  Box,
  TextField,
  Grid,
  Typography,
  Link,
  Button,
} from '@material-ui/core';
import Page from '@component/Page';

function Fauth(props) {
  return (
    <Page title="2 Factor Authentication">
      <Box m={4}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid sm={12}>
              <Typography variant="h5" className="extra-bold padding10">
                2 Factor Authentication
              </Typography>
              <form className="customForm" Validate autoComplete="off">
                <div>
                  <TextField
                    id="outlined-error"
                    label="Google Authentication Code"
                    size="small"
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    id="outlined-error-helper-text"
                    label="SMS Code"
                    size="small"
                    variant="outlined"
                    fullWidth
                  />
                  <Typography
                    color="primary.main"
                    variant="body2"
                    className="padding10"
                  >
                    <Link color="error.main" href="#">
                      Didn't recieve code? Resend!
                    </Link>
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    className="rightButton"
                  >
                    Let's Start
                  </Button>
                </div>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
}

export default Fauth;
