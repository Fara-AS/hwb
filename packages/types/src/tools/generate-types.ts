import { writeFile } from "fs/promises";
import { join } from "path";
import listSpecifications from "./fs-to-topics";

generate().then(() => {
  console.log("Generated types");
});

async function generate() {
  const topicSet = await listSpecifications();
  const topics = Object.keys(topicSet).sort();
  const topicNames = topics.map((i) => `'${i}'`).join(" | ");

  const sortedTopicSet = topics.reduce((acc, key) => {
    acc[key] = topicSet[key]!;
    return acc;
  }, {} as Record<string, string>);

  const types = `
export type TopicName = ${!topicNames ? "''" : topicNames};
export const availableTopics = ${JSON.stringify(
    topics
  )} as readonly TopicName[];
export const topicSet = ${JSON.stringify(
    topics.length ? sortedTopicSet : { "": "" }
  )} satisfies Record<TopicName, string>;
`;

  await writeFile(join(__dirname, "..", "types.ts"), types);
}
