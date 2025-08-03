import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

import { validateImageDimensions } from "../utils/imageValidator.utils.js";

const __dirname = path.resolve();

export async function handleStream(type) {
  if (type === "tv") {
    const uniqueID = process.env.UNIQUE_ID;
    const categoryIds = [
      "67b052ba9748d1eacb867573",
      "1234567890abcdef12345678"
    ];

    const jsonPath = path.join(__dirname, "public", "streams.json");
    const fileData = await fs.readFile(jsonPath, "utf-8");
    const rawChannels = JSON.parse(fileData);

    const streams = [];

    for (const channel of rawChannels) {
      const id = "1";
      const imageMeta = await validateImageDimensions(channel.imageUrl);

      streams.push({
        id: channel.id,
        slug: channel.slug,
        name: channel.name,
        category: `${id}`,
        summary: `Watch ${channel.name}`,
        rating: "PG",
        plutoOfficeOnly: false,
        featured: false,
        featuredOrder: -1,
        isStitched: true,
        image: channel.imageUrl,
        stitched: {
          paths: [
            {
              type: "hls",
              path: channel.hls,
            },
          ],
        },
        tmsid: null,
      });
    }

    return { streams, categoryIds };
  }

  return { streams: [], categoryIds: [] };
}
