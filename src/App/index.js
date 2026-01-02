import React from "react";
import GasPriceContainer from "../components/GasPriceContainer";
import EthereumLogo from "../assets/images/ethereum-logo.svg";
import {
  AppContainer,
  AppHeader,
  AppHeaderMeta,
  AppShell,
  AppSubtitle,
  AppTitle,
  GlobalStyle,
  LogoBadge,
  LogoMark,
} from "./styles";

function App({ gasPrices, countdown, error, status }) {
  return (
    <AppContainer>
      <GlobalStyle />
      <AppShell>
        <AppHeader>
          <LogoBadge>
            <LogoMark src={EthereumLogo} alt='Ethereum Logo' />
          </LogoBadge>
          <AppHeaderMeta>
            <AppTitle>Etherscan Gas Oracle</AppTitle>
            <AppSubtitle>
              Low, average, and high estimates from the Etherscan oracle.
            </AppSubtitle>
          </AppHeaderMeta>
        </AppHeader>
        <GasPriceContainer
          gasPrices={gasPrices}
          countdown={countdown}
          error={error}
          status={status}
        />
      </AppShell>
    </AppContainer>
  );
}

export default App;
