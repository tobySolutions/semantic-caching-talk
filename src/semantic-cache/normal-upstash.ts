import { Index } from "@upstash/vector";
import { DBConfig } from "./config";
import { delay } from "./cache-demo";

// 👇 your vector database
const index = new Index(DBConfig);

async function callUpstashDirectly() {
  await index.upsert({
    id: "id1",
    data: "Enter data as string",
    metadata: { metadata_field: "Tobi" },
  });

  await delay(1000);
  const startTime = performance.now();
  const query = await index.query({
    data: "Enter data as string",
    topK: 1,
    includeVectors: true,
    includeMetadata: true,
  });
  const endTime = performance.now();
  const timeTaken = endTime - startTime;

  console.log([
    {
      type: "Normal upstash query",
      response: query[0]?.metadata?.metadata_field,
      timeTaken: `${timeTaken.toFixed(2)} ms`,
    },
  ]);
}

callUpstashDirectly();
