import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { GasPriceContainer, GasPriceText, CountdownText } from "./styles";

const REFRESH_INTERVAL_MS = 15000; // 15 seconds
const MAX_BACKOFF_MS = 60000; // 60 seconds

const GasPrice = () => {
  const [gasPrice, setGasPrice] = useState(null);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL_MS / 1000);
  const [error, setError] = useState(null);

  const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
  const refreshMsRef = useRef(REFRESH_INTERVAL_MS);
  const abortControllerRef = useRef(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    if (!apiKey) {
      setError(
        "Missing Etherscan API key. Set REACT_APP_ETHERSCAN_API_KEY in .env.local."
      );
      return () => {
        isMountedRef.current = false;
      };
    }

    const fetchGasPrice = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await axios.get(
          `https://api.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=${apiKey}`,
          { signal: controller.signal }
        );
        const result = response.data?.result;
        const parsed = Number.parseInt(result, 16);
        if (!Number.isFinite(parsed)) {
          throw new Error("Invalid gas price response");
        }
        const gasPriceInGwei = parsed / 1e9;
        if (isMountedRef.current) {
          setGasPrice(gasPriceInGwei.toFixed(2));
          setError(null);
        }
        refreshMsRef.current = REFRESH_INTERVAL_MS;
      } catch (error) {
        if (error?.code === "ERR_CANCELED" || axios.isCancel?.(error)) {
          return;
        }
        console.error("Error fetching gas price:", error);
        if (isMountedRef.current) {
          setError("Error fetching gas price");
        }
        refreshMsRef.current = Math.min(
          MAX_BACKOFF_MS,
          refreshMsRef.current * 2
        );
      } finally {
        if (isMountedRef.current) {
          setCountdown(Math.round(refreshMsRef.current / 1000));
        }
      }
    };

    const updateCountdown = () => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          fetchGasPrice();
          return Math.round(refreshMsRef.current / 1000);
        }
        return prevCountdown - 1;
      });
    };

    fetchGasPrice(); // Initial fetch
    const interval = setInterval(updateCountdown, 1000); // Update countdown every second

    return () => {
      isMountedRef.current = false;
      clearInterval(interval);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [apiKey]);

  return (
    <GasPriceContainer>
      {error ? (
        <p>{error}</p>
      ) : gasPrice ? (
        <>
          <GasPriceText>Current Gas Price: {gasPrice} Gwei</GasPriceText>
          <CountdownText>Refreshing in {countdown} seconds...</CountdownText>
        </>
      ) : (
        <p>Loading gas price...</p>
      )}
    </GasPriceContainer>
  );
};

export default GasPrice;
