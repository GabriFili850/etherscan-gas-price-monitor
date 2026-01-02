import React from "react";
import GasPriceView from "./GasPriceView";

const GasPriceContainer = ({ gasPrices, countdown, error, status }) => {
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
