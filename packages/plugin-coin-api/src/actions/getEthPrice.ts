import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@elizaos/core";
import { validateCoinApiConfig } from "../environment";
import { getEthPriceExamples } from "../examples";
import { createCoinAPIService } from "../services";

export const getEthPrice: Action = {
    name: "COINAPI_GET_ETH_PRICE",
    similes: ["ETH price", "Ethereum price", "ETH price of the day"],
    description: "Get the current price of Ethereum",
    validate: async (runtime: IAgentRuntime) => {
        await validateCoinApiConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        const config = await validateCoinApiConfig(runtime);
        const coinApiService = createCoinAPIService(config.COINAPI_API_KEY);

        try {
            const ethPriceData = await coinApiService.getEthPrice(null);
            elizaLogger.success(`Successfully fetched Eth price`);
            if (callback) {
                callback({
                    text: `Here is the Eth price of the Day: ${ethPriceData}`,
                });
                return true;
            }
        } catch (error: any) {
            elizaLogger.error("Error in Coin api plugin handler:", error);
            callback({
                text: `Error fetching eth price: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getEthPriceExamples as ActionExample[][],
} as Action;
