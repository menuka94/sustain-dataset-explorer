#!/bin/bash

rm ./*_pb.js
protoc -I=. census.proto --js_out=import_style=commonjs,binary:. \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
