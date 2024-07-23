proto:
	#rm -r "server/src/protobuf"
	mkdir "server/src/protobuf"
	python -m grpc_tools.protoc -I. --python_out=server/src --grpc_python_out=server/src protobuf/llm.proto

serve:
	python server/src/main.py

ui-dev:
	cd client; npm run start

ui-test:
	cd client; npm run test

grpc-proxy:
	grpcwebproxy --backend_addr=localhost:50051 --run_tls_server=false --allow_all_origins --server_http_max_write_timeout=1h
