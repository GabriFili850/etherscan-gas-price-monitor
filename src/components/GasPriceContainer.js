import React from "react";
import useGasPrice from "../GasPrice/useGasPrice";
import GasPriceView from "./GasPriceView";

const GasPriceContainer = () => {
  const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
  const { gasPrices, countdown, error, status } = useGasPrice(apiKey);

  return (
    <GasPriceView
      gasPrices={gasPrices}
      countdown={countdown}
      error={error}
      status={status}
    />
  );
};

export default GasPriceContainer;
