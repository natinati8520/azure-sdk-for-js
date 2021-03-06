// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * analyzes the sentiment of a piece of text
 */

import {
  TextAnalyticsClient,
  CognitiveServicesCredential,
  AnalyzeSentimentResult,
  AnalyzeSentimentSuccessResult,
  AnalyzeSentimentErrorResult
} from "@azure/ai-text-analytics";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log(`Running analyzeSentiment sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["ENDPOINT"] || "<cognitive services endpoint>";
  const subscriptionKey = process.env["SUBSCRIPTION_KEY"] || "<subscription key>";

  const client = new TextAnalyticsClient(
    endpoint,
    new CognitiveServicesCredential(subscriptionKey)
  );

  const [result] = await client.analyzeSentiment(["I love living in Seattle!"]);

  if (isSuccess(result)) {
    console.log(`Sentiment of statement is ${result.sentiment}`);
  }
}

function isSuccess(result: AnalyzeSentimentResult): result is AnalyzeSentimentSuccessResult {
  return !(result as AnalyzeSentimentErrorResult).error;
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

