import App from "../App";
import useGasPrice from "../GasPrice/useGasPrice";

const GasPriceController = () => {
  const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
  const gasState = useGasPrice({ apiKey });

  return <App {...gasState} />;
};

export default GasPriceController;
