import { Resource } from "sst";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export default async function Account() {
  const response = await client.send(
    new GetCommand({
      TableName: Resource.Table.name,
      Key: {
        userId: "my-user-id",
      },
    }),
  );

  return <div>{response.Item?.balance ?? 0}</div>;
}
