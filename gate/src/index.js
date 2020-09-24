const Koa = require("koa");
const path = require("path");
const PROTO_PATH = path.join(__dirname, "../../proto/index.proto");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  longs: String,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const grpcClient = new protoDescriptor.BackService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const app = new Koa();

app.use(async (ctx) => {
  const { value } = await new Promise((resolve, reject) => {
    grpcClient.echo(
      {
        value: ctx.url,
      },
      (err, result) => {
        err ? reject(err) : resolve(result);
      }
    );
  });
  ctx.body = value;
});

app.listen(8080);
