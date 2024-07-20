import {LlmServiceClient} from "../../pb/LlmServiceClientPb";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {GenerateContentRequest, GenerateContentResponse} from "../../pb/llm_pb";

@Injectable({
  providedIn: 'root',
})
export class SimpleLlmClientService {
  private client: LlmServiceClient;

  public constructor() {
    this.client = new LlmServiceClient('http://localhost:8080');
  }

  public generateContent(prompt: string): Observable<string> {
    return new Observable(observer => {
      const request = new GenerateContentRequest();
      request.setPrompt(prompt);
      request.setModel('dolphin-llama3')

      const stream = this.client.generateContent(request, {});
      stream.on('data', (response: GenerateContentResponse) => {
        observer.next(response.getContent());
      });

      stream.on('error', (err: any) => {
        observer.error(err);
      });

      stream.on('end', () => {
        observer.complete();
      });
    });
  }
}
