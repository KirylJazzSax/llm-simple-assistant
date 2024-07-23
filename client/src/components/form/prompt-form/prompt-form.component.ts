import {Component, output, OutputEmitterRef} from "@angular/core";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {PromptType} from "../../../types/PromptType";

@Component({
  selector: "prompt-form",
  templateUrl: "./prompt-form.component.html",
})
export class PromptFormComponent {
  promptForm = new FormGroup({
    prompt: new FormControl('', {}),
    model: new FormControl('', {}),
  });

  submit: OutputEmitterRef<PromptType> = output<PromptType>();
  // @TODO: Fetch by api.
  readonly models = [
    'dolphin-llama3',
    'codegemma',
    'duckdb-nsql'
  ];

  onSubmit(): void {
    this.submit.emit(this.promptForm.value as PromptType);
  }
}
