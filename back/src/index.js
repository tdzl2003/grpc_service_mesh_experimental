const path = require("path");
const PROTO_PATH = path.join(__dirname, "../../proto/index.proto");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  longs: String,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// The protoDescriptor object has the full package hierarchy

const server = new grpc.Server();
server.addService(protoDescriptor.BackService.service, {
  echo({ request }, callback) {
    callback(null, {
      value: `Requested: ${request.value}`,
    });
  },
});
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (err) => {
    if (err) {
      console.warn(err);
      return;
    }
    console.log("Ready.");
    server.start();
  }
);
