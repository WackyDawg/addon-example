import fs from "fs/promises";
import path from "path";
import { validateImageDimensions } from "../utils/imageValidator.utils.js";

const __dirname = path.resolve();

export async function handleStream(type) {
  if (type === "tv") {
    const jsonPath = path.join(__dirname, "public", "streams.json");
    const fileData = await fs.readFile(jsonPath, "utf-8");
    const rawChannels = JSON.parse(fileData);

    const streams = [];

    for (const channel of rawChannels) {
      const imageMeta = await validateImageDimensions(channel.imageUrl);

      streams.push({
        id: "1", 
        slug: channel.slug,
        name: channel.name,
        hash: "#Comedy",
        category: "1", 
        summary: `Watch ${channel.name} - a Comedy channel.`,
        rating: "PG",
        image: channel.imageUrl || imageMeta?.url || "",
        background: channel.background || "URL_ADDRESSghghg/jpg",
        stitched: {
          paths: [
            {
              type: "hls",
              path: channel.hls,
            },
          ],
        },
      });
    }

    return streams;
  }

  return [];
}
