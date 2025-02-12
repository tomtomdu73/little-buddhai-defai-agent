import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const coinApiEnvSchema = z.object({
    COINAPI_API_KEY: z.string().min(1, "CoinApi API key is required"),
});

export type coinApiConfig = z.infer<typeof coinApiEnvSchema>;

export async function validateCoinApiConfig(
    runtime: IAgentRuntime
): Promise<coinApiConfig> {
    try {
        const config = {
            COINAPI_API_KEY: runtime.getSetting("COINAPI_API_KEY"),
        };
        console.log("config: ", config);
        return coinApiEnvSchema.parse(config);
    } catch (error) {
        console.log("error::::", error);
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `CoinApi API configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}
