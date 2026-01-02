import React from "react";
import { render, screen, act } from "@testing-library/react";
import axios from "axios";
import GasPriceController from "../controllers/GasPriceController";
import { MISSING_API_KEY_MESSAGE } from "../GasPrice/constants";

jest.mock("axios");

describe("GasPrice component", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      REACT_APP_ETHERSCAN_API_KEY: "test-api-key",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test("renders gas prices", async () => {
    axios.get.mockResolvedValue({
      data: {
        status: "1",
        message: "OK",
        result: {
          LowGasPrice: "10",
          ProposeGasPrice: "20",
          HighGasPrice: "30",
        },
      },
    });

    render(<GasPriceController />);

    expect(await screen.findByText(/Low: 10.00 Gwei/i)).toBeInTheDocument();
    expect(screen.getByText(/Average: 20.00 Gwei/i)).toBeInTheDocument();
    expect(screen.getByText(/High: 30.00 Gwei/i)).toBeInTheDocument();
  });

  test("renders an error when the request fails", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    render(<GasPriceController />);

    const errorElement = await screen.findByText(/Network error/i);
    expect(errorElement).toBeInTheDocument();
  });

  test("retries after a failure and clears the error", async () => {
    jest.useFakeTimers();
    axios.get
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce({
        data: {
          status: "1",
          message: "OK",
          result: {
            LowGasPrice: "15",
            ProposeGasPrice: "25",
            HighGasPrice: "35",
          },
        },
      });

    render(<GasPriceController />);

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByText(/Network error/i)).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(30000);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByText(/Low: 15.00 Gwei/i)).toBeInTheDocument();
    expect(screen.queryByText(/Network error/i)).toBeNull();
    expect(screen.getByText(/Refreshing in 15 seconds/i)).toBeInTheDocument();
  });

  test("shows a missing API key message", () => {
    delete process.env.REACT_APP_ETHERSCAN_API_KEY;
    render(<GasPriceController />);

    expect(screen.getByText(MISSING_API_KEY_MESSAGE)).toBeInTheDocument();
    expect(axios.get).not.toHaveBeenCalled();
  });
});
