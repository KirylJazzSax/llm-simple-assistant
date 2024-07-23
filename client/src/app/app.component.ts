import { Component } from '@angular/core';
import {SimpleLlmClientService} from "../services/simple-llm-client.service";
import {NgForm} from "@angular/forms";
import {FormModule} from "../components/form/form.module";
import {PromptType} from "../types/PromptType";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    FormModule,
    NgIf,
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  responses: string[] = [];

  constructor(private llmClient: SimpleLlmClientService) {}

  onSubmit(f: PromptType) {
    this.responses = [];
    this.llmClient.generateContent(f.prompt).subscribe(
      {
        next: response => this.responses.push(response),
        error: err => console.log(err),
        complete: () => console.log('complete'),
      }
    );
  }
}
