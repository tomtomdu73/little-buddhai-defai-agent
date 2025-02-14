import { GetEthPriceResponse } from "./types";

const BASE_URL =
    "https://rest.coinapi.io/v1/quotes/BINANCE_SPOT_ETH_USDC/history?limit=1";

export const createCoinAPIService = (apiKey: string) => {
    const getEthPrice = async (
        time_start: string
    ): Promise<GetEthPriceResponse> => {
        if (!apiKey) {
            throw new Error("Invalid parameters");
        }

        try {
            const url = BASE_URL + "&time_start=" + time_start;
            const response = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "X-CoinAPI-Key": apiKey,
                },
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error?.message || response.statusText);
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error("CoinApi API Error:", error.message);
            throw error;
        }
    };

    return { getEthPrice };
};
