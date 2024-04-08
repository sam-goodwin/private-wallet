import { Resource } from "sst";

export default {
  async fetch(req: Request) {
    if (req.method == "PUT") {
      const key = crypto.randomUUID();
      await Resource.MyBucket.put(key, req.body, {
        httpMetadata: {
          contentType: req.headers.get("content-type"),
        },
      });
      return new Response(`Object created with key: ${key}`);
    }
  },
};