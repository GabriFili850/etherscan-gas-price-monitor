import React from "react";
import {
  CountdownText,
  ErrorText,
  GasPriceContainer,
  GasPriceGrid,
  GasPriceItem,
  GasPriceLabel,
  GasPriceUnit,
  GasPriceValue,
  StatusText,
} from "../GasPrice/styles";

const GasPriceView = ({ gasPrices, countdown, error, status = "loading" }) => {
  return (
    <GasPriceContainer>
      {status === "error" ? (
        <ErrorText>{error}</ErrorText>
      ) : status === "ready" ? (
        <>
          <GasPriceGrid>
            <GasPriceItem>
              <GasPriceLabel>Low</GasPriceLabel>
              <GasPriceValue>
                {gasPrices.low} <GasPriceUnit>Gwei</GasPriceUnit>
              </GasPriceValue>
            </GasPriceItem>
            <GasPriceItem>
              <GasPriceLabel>Average</GasPriceLabel>
              <GasPriceValue>
                {gasPrices.average} <GasPriceUnit>Gwei</GasPriceUnit>
              </GasPriceValue>
            </GasPriceItem>
            <GasPriceItem>
              <GasPriceLabel>High</GasPriceLabel>
              <GasPriceValue>
                {gasPrices.high} <GasPriceUnit>Gwei</GasPriceUnit>
              </GasPriceValue>
            </GasPriceItem>
          </GasPriceGrid>
          <CountdownText>Refreshing in {countdown} seconds...</CountdownText>
        </>
      ) : (
        <StatusText>Loading gas price...</StatusText>
      )}
    </GasPriceContainer>
  );
};

export default GasPriceView;
