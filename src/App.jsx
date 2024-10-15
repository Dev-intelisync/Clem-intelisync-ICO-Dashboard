import React, { Suspense, Fragment, useContext, useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { routes } from "./routes";
import { createBrowserHistory } from "history";
import AuthContext from "./context/Auth";
import UserContext from "./context/User";
import PageLoading from "./component/PageLoading";
import AuthGuard from "./component/AuthGuard";
import { ThemeProvider } from "@material-ui/core";
import { createnewTheme } from "./theme";
import SettingsContext from "./context/SettingsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import '@rainbow-me/rainbowkit/styles.css';
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {

  polygon,
  polygonMumbai

} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ALCHEMY_API_KEY, PROJECT_ID } from './constants';


const { chains, publicClient } = configureChains(
  [ polygonMumbai],
  [
    alchemyProvider({ apiKey: ALCHEMY_API_KEY}),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Zozo',
  projectId: PROJECT_ID,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})




const history = createBrowserHistory();

function App() {
  
  const themeSeeting = useContext(SettingsContext);
  const theme = createnewTheme({
    theme: themeSeeting.settings.theme,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">

      <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
      <ToastContainer />

      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AuthContext>
            <UserContext>
              <Router history={history}>
                <RenderRoutes data={routes} />
              </Router>
            </UserContext>
          </AuthContext>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
      <ToastContainer />
      </RainbowKitProvider>
    </WagmiConfig>
    </div>
  );
}

export default App;

function RenderRoutes(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        {props.data.map((route, i) => {
          const Component = route.component;
          const Guard = route.guard ? AuthGuard : Fragment;

          const Layout = route.layout || Fragment;
          return (
            <Route
              exact={route.exact}
              key={i}
              path={route.path}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      <RenderRoutes data={route.routes} />
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}
