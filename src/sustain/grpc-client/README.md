### Command 
`protoc -I=census.proto \
             --js_out=import_style=commonjs:. \
             --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.`
             
`protoc -I=. census.proto   --js_out=import_style=commonjs,binary:.   
--grpc-web_out=import_style=commonjs,mode=grpcwebtext:.`

             
#### Resources 
- https://github.com/grpc/grpc-web
- https://www.freecodecamp.org/news/how-to-use-grpc-web-with-react-1c93feb691b5/
- https://grpc.io/blog/grpc-web-ga/