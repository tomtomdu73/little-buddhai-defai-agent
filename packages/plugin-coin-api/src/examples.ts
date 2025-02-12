import { ActionExample } from "@elizaos/core";

export const getEthPriceExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "What is the price of Ethereum today?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me fetch the price of Ethereum for you.",
                action: "COIN_API_GET_ETH_PRICE",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "What was the price of Ethereum yesterday?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me fetch the price of Ethereum for you.",
                action: "COIN_API_GET_ETH_PRICE",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "What was the price of Ethereum on July 1st 2022?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me fetch the price of Ethereum for you.",
                action: "COIN_API_GET_ETH_PRICE",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "What was the bid and ask price of Ethereum now?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me fetch the bid and ask price of Ethereum for you.",
                action: "COIN_API_GET_ETH_PRICE",
            },
        },
    ],
];
