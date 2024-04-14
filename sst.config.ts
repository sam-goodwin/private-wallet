/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "snark",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const rootKey = new sst.Secret("RootKey", "my-secret-value");

    const bucket = new sst.aws.Bucket("Storage");

    const table = new sst.aws.Dynamo("Table", {
      fields: {
        userId: "string",
      },
      primaryIndex: {
        hashKey: "userId",
      },
    });

    const web = new sst.aws.Nextjs("Web", {
      link: [bucket, table, rootKey],
    });

    return {
      url: web.url,
    };
  },
});
