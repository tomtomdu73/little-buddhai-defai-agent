export const getETHPriceTemplate = `Respond with a JSON object containing symbol, currency, and date. 
- Currency defaults to "USD" if not specified
- Date MUST use ISO 8601 extended format (YYYY-MM-DDTHH:mm:ss.sssZ)
- Convert relative date terms using these rules:
  • "now" -> Current UTC datetime (with milliseconds)
  • "yesterday" -> Previous day at 00:00:00.000Z
  • "last_week" -> Same time 7 days ago at 00:00:00.000Z

Symbol must ALWAYS be "ETH". Include ALL THREE fields.

Example responses:
\`\`\`json
{
    "symbol": "ETH",
    "currency": "USD",
    "date": "${new Date().toISOString()}"
}

{
    "symbol": "ETH",
    "currency": "EUR",
    "date": "2023-12-31T00:00:00.000Z"
}
\`\`\`

{{recentMessages}}

Extract parameters from the latest message:
1. Currency (default to USD)
2. Date (convert relative terms to ISO format if date is not specified or invalid)
3. Always use ETH for symbol

Respond ONLY with a JSON markdown block.`;
