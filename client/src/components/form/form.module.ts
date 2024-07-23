import {NgModule} from "@angular/core";
import {PromptFormComponent} from "./prompt-form/prompt-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    PromptFormComponent,
  ],
  exports: [
    PromptFormComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FormModule {}
