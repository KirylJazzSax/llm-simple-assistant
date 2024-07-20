import { Component } from '@angular/core';
import {SimpleLlmClientService} from "../services/simple-llm-client.service";
import {FormsModule, NgForm} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    FormsModule,
    CommonModule,
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  responses: string[] = [];

  constructor(private llmClient: SimpleLlmClientService) {}

  onSubmit(f: NgForm) {
    this.responses = [];
    this.llmClient.generateContent(f.value.prompt).subscribe(
      {
        next: response => this.responses.push(response),
        error: err => console.log(err),
        complete: () => console.log('complete'),
      }
    );
  }
}
