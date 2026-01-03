# MarketPulse Dashboard
MarketPulse Dashboard is a React dashboard that displays low, average, and high gas prices on the Ethereum network in real time, along with a 12‑month ETH price chart. The app fetches gas oracle data from the Etherscan API and uses CoinGecko for the ETH price history, updating on a configurable interval. This tool can be useful for Ethereum users who want to keep track of gas prices to optimize transaction costs.

## Features
Displays low, average, and high gas prices in Gwei format
Shows a chart of the current ETH price in USD

Automatically refreshes gas price data every 15 seconds

Countdown timer showing the time remaining until the next refresh

Responsive and mobile-friendly design


## Setup
To set up MarketPulse Dashboard, follow these steps:

### Clone the repository:

git clone https://github.com/GabriFili850/marketpulse-dashboard.git

cd marketpulse-dashboard

### Install the required dependencies:

`npm install`

### Create a .env.local file to store your Etherscan API key:

`touch .env.local`

### Open the .env.local file and add your Etherscan API key:

`REACT_APP_ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY`

Replace YOUR_ETHERSCAN_API_KEY with your actual Etherscan API key. You can obtain one by signing up at https://etherscan.io/myapikey.

### Optional: configure the refresh interval (milliseconds):

`REACT_APP_REFRESH_INTERVAL_MS=15000`

### Start the development server:

`npm start`

The MarketPulse Dashboard app should now be running on http://localhost:3000.

### Technologies Used
React

Etherscan API

Axios

Styled Components

Create React App

Netlify (for deployment)

## Live Demo
MarketPulse Dashboard is deployed on Netlify and can be accessed through this link:

https://marketpulse-dashboard.netlify.app

Feel free to visit the live demo to see the app in action without needing to set up the project locally.
