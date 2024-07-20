from concurrent import futures
from protobuf import llm_pb2, llm_pb2_grpc
import grpc
from ollama import generate

# TODO: sql generation
# TODO: function execution
class LlmService(llm_pb2_grpc.LlmServiceServicer):
    def GenerateContent(self, request, context):
        for part in generate(model=request.model, prompt=request.prompt, stream=True):
            if not context.is_active():
                return
            yield llm_pb2.GenerateContentResponse(content=part['response'])

    def SummarizeText(self, request, context):
        # TODO: add prompt to summarizer
        for part in generate(model=request.model, prompt=request.text, stream=True):
            yield llm_pb2.SummarizeTextResponse(content=part['response'])

def serve() -> None:
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    llm_pb2_grpc.add_LlmServiceServicer_to_server(LlmService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()
