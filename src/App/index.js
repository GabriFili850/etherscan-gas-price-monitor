import EthPriceChart from "../components/EthPriceChart";
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

function App({ gasState, ethState }) {
  const { gasPrices, countdown, error, status } = gasState;
  const { price, history, error: ethError, status: ethStatus } = ethState;

  return (
    <AppContainer>
      <GlobalStyle />
      <AppShell>
        <AppHeader>
          <LogoBadge>
            <LogoMark src={EthereumLogo} alt='Ethereum Logo' />
          </LogoBadge>
          <AppHeaderMeta>
            <AppTitle>MarketPulse Dashboard</AppTitle>
            <AppSubtitle>
              Ethereum gas and price snapshot, built to grow across chains.
            </AppSubtitle>
          </AppHeaderMeta>
        </AppHeader>
        <EthPriceChart
          price={price}
          history={history}
          status={ethStatus}
          error={ethError}
        />
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
