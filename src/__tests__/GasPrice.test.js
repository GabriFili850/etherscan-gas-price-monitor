import React from "react";
import { render, screen, act } from "@testing-library/react";
import axios from "axios";
import GasPrice from "../GasPrice";

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

  test("renders gas price", async () => {
    axios.get.mockResolvedValue({
      data: {
        result: "0x" + (20 * 1e9).toString(16), // Mock the response data to return 20 Gwei
      },
    });

    render(<GasPrice />);

    const gasPriceElement = await screen.findByText(
      /Current Gas Price: 20.00 Gwei/i
    );
    expect(gasPriceElement).toBeInTheDocument();
  });

  test("renders an error when the request fails", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    render(<GasPrice />);

    const errorElement = await screen.findByText(/Error fetching gas price/i);
    expect(errorElement).toBeInTheDocument();
  });

  test("retries after a failure and clears the error", async () => {
    jest.useFakeTimers();
    axios.get
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce({
        data: {
          result: "0x" + (30 * 1e9).toString(16),
        },
      });

    render(<GasPrice />);

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByText(/Error fetching gas price/i)).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(30000);
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(
      screen.getByText(/Current Gas Price: 30.00 Gwei/i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/Error fetching gas price/i)).toBeNull();
    expect(
      screen.getByText(/Refreshing in 15 seconds/i)
    ).toBeInTheDocument();
  });

  test("shows a missing API key message", () => {
    delete process.env.REACT_APP_ETHERSCAN_API_KEY;
    render(<GasPrice />);

    expect(
      screen.getByText(/Missing Etherscan API key/i)
    ).toBeInTheDocument();
    expect(axios.get).not.toHaveBeenCalled();
  });
});
