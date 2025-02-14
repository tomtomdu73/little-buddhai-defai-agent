import { z } from "zod";
import type { GetEthPriceContent } from "../types";

export const GetPriceSchema = z.object({
    symbol: z.string(),
    date: z.string(),
});

export function isGetEthPriceContent(
    content: GetEthPriceContent
): content is GetEthPriceContent {
    return (
        typeof content.symbol === "string" && typeof content.date === "string"
    );
}
