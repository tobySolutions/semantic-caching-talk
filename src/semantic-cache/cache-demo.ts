import { SemanticCache } from "@upstash/semantic-cache";
import { Index } from "@upstash/vector";
import { DBConfig } from "./config";

// 👇 your vector database
const index = new Index(DBConfig);

// 👇 your semantic cache
const semanticCache = new SemanticCache({ index, minProximity: 0.85 });

async function runCache() {
  // Handling Synonyms
  await semanticCache.set("largest city in USA by population", "New York");

  while (true) {
    await delay(1000);

    const startTime = performance.now();

    const result = await semanticCache.get("Largest population in USA by city");

    const endTime = performance.now();

    const timeTaken = endTime - startTime;

    // Log the result and time taken
    console.log([
      {
        type: "Cached response",
        response: result,
        timeTaken: `${timeTaken.toFixed(2)} ms`,
      },
    ]);
  }
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

runCache();
