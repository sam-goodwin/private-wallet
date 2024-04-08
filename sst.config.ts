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
    const bucket = new sst.aws.Bucket("Storage");

    const web = new sst.aws.Nextjs("Web", {
      link: [bucket],
      path: "src"
    });

    return {
      url: web.url,
    };
  },
});
