import {
    composeContext,
    generateObjectDeprecated,
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
    ModelClass,
} from "@elizaos/core";
import { validateCoinApiConfig } from "../environment";
import { getEthPriceExamples } from "../examples";
import { createCoinAPIService } from "../services";
import { getETHPriceTemplate } from "./template";
import { isGetEthPriceContent } from "./validations";
import type { GetEthPriceContent } from "../types";

export const getEthPrice: Action = {
    name: "GET_ETH_PRICE",
    similes: [
        "CHECK_ETH_PRICE",
        "PRICE_CHECK_ETH",
        "GET_CRYPTO_ETH_PRICE",
        "CHECK_CRYPTO_ETH_PRICE",
        "GET_TOKEN_ETH_PRICE",
    ],
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
        elizaLogger.log("Starting CoinApi GET_ETH_PRICE handler...");

        const config = await validateCoinApiConfig(runtime);
        const coinApiService = createCoinAPIService(config.COINAPI_API_KEY);

        // Initialize or update state
        let currentState = state;
        if (!currentState) {
            currentState = (await runtime.composeState(message)) as State;
        } else {
            currentState = await runtime.updateRecentMessageState(currentState);
        }

        try {
            // Compose and generate price check content
            const priceContext = composeContext({
                state: currentState,
                template: getETHPriceTemplate,
            });

            elizaLogger.log("Generated price check context:", priceContext);
            const content = (await generateObjectDeprecated({
                runtime,
                context: priceContext,
                modelClass: ModelClass.SMALL,
            })) as unknown as GetEthPriceContent;

            elizaLogger.log("Generated price check content:", content);

            // Validate content
            if (!isGetEthPriceContent(content)) {
                throw new Error("Invalid start_date content");
            }

            const ethPriceData = await coinApiService.getEthPrice(content.date);
            elizaLogger.success(`Successfully fetched Eth price`);
            if (callback) {
                callback({
                    text: `✅ Here is the price of ETH for ${
                        content.date
                    } found on CoinApi: ${JSON.stringify(ethPriceData)}`,
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
