import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  ETHERSCAN_API_BASE_URL,
  ETHERSCAN_CHAIN_ID,
  DEFAULT_REFRESH_INTERVAL_MS,
  GENERIC_FETCH_ERROR_MESSAGE,
  MAX_BACKOFF_MS,
  MISSING_API_KEY_MESSAGE,
} from "./constants";

const useGasPrice = (apiKey) => {
  const resolveRefreshIntervalMs = () => {
    const rawValue = process.env.REACT_APP_REFRESH_INTERVAL_MS;
    const parsed = Number.parseInt(rawValue, 10);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
    return DEFAULT_REFRESH_INTERVAL_MS;
  };
  const baseRefreshMs = resolveRefreshIntervalMs();
  const [gasPrices, setGasPrices] = useState(null);
  const [countdown, setCountdown] = useState(() =>
    Math.round(baseRefreshMs / 1000)
  );
  const [error, setError] = useState(null);
  const refreshMsRef = useRef(baseRefreshMs);
  const abortControllerRef = useRef(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    refreshMsRef.current = baseRefreshMs;
    setCountdown(Math.round(baseRefreshMs / 1000));

    const getRefreshSeconds = () => Math.round(refreshMsRef.current / 1000);

    if (!apiKey) {
      setError(MISSING_API_KEY_MESSAGE);
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
        const requestUrl = `${ETHERSCAN_API_BASE_URL}?chainid=${ETHERSCAN_CHAIN_ID}&module=gastracker&action=gasoracle&apikey=${apiKey}`;
        const response = await axios.get(
          requestUrl,
          { signal: controller.signal }
        );
        if (response.data?.status === "0") {
          const apiMessage =
            response.data?.result ||
            response.data?.message ||
            response.data?.error?.message;
          throw new Error(`Etherscan error: ${apiMessage || "Unknown error"}`);
        }
        const oracle = response.data?.result;
        const safeGas = Number.parseFloat(oracle?.SafeGasPrice);
        const averageGas = Number.parseFloat(oracle?.ProposeGasPrice);
        const fastGas = Number.parseFloat(oracle?.FastGasPrice);
        if (
          !Number.isFinite(safeGas) ||
          !Number.isFinite(averageGas) ||
          !Number.isFinite(fastGas)
        ) {
          throw new Error("Invalid gas oracle response");
        }
        if (isMountedRef.current) {
          setGasPrices({
            safe: safeGas.toFixed(2),
            average: averageGas.toFixed(2),
            fast: fastGas.toFixed(2),
          });
          setError(null);
        }
        refreshMsRef.current = baseRefreshMs;
      } catch (error) {
        if (error?.code === "ERR_CANCELED" || axios.isCancel?.(error)) {
          return;
        }
        console.error("Error fetching gas price:", error);
        if (isMountedRef.current) {
          setError(error?.message || GENERIC_FETCH_ERROR_MESSAGE);
        }
        refreshMsRef.current = Math.min(
          MAX_BACKOFF_MS,
          refreshMsRef.current * 2
        );
      } finally {
        if (isMountedRef.current) {
          setCountdown(getRefreshSeconds());
        }
      }
    };

    const updateCountdown = () => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          fetchGasPrice();
          return getRefreshSeconds();
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
  }, [apiKey, baseRefreshMs]);

  const status = error ? "error" : gasPrices ? "ready" : "loading";

  return { gasPrices, countdown, error, status };
};

export default useGasPrice;
