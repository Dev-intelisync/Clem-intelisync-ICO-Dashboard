import React, { useState } from "react";
import { Grid, Box } from "@material-ui/core";
import Page from "@component/Page";
import SubMenuWithLink from "@component/SubMenu";
import { FaMoneyCheckAlt, FaShoppingCart } from "react-icons/fa";
import Buy from "@views/pages/Trade/Buy/";
import Sell from "@views/pages/Trade/Sell";

function Index() {
  const [openBuy, setOpenBuy] = useState(false);
  const [openSell, setOpenSell] = useState(false);
  return (
    <Page title="Trade">
      <Box className="tradebox">
        {openBuy && <Buy open={openBuy} close={() => setOpenBuy(false)} />}
        {openSell && <Sell open={openSell} close={() => setOpenSell(false)} />}
        <Box mt={5}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <SubMenuWithLink
                Icon={FaShoppingCart}
                title="Buy"
                routerLink="/buy"
                onclick={() => {
                  setOpenBuy(true);
                }}
                desc="ddddddddddddddddddd"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SubMenuWithLink
                Icon={FaMoneyCheckAlt}
                title="Sell"
                onclick={() => {
                  setOpenSell(true);
                }}
                desc="ddddddddddddddddddd"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Page>
  );
}

export default Index;
