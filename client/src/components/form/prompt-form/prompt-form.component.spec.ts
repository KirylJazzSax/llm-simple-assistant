import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PromptFormComponent } from './prompt-form.component';
import {FormModule} from "../form.module";
import {DebugElement} from "@angular/core";

describe('PromptFormComponent', () => {
  let component: PromptFormComponent;
  let fixture: ComponentFixture<PromptFormComponent>;
  let modelSelectElement: HTMLSelectElement;
  let promptTextAreaElement: HTMLTextAreaElement;
  let submitButtonElement: HTMLButtonElement;
  let form: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PromptFormComponent],
      imports: [FormModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    modelSelectElement = fixture.debugElement.query(By.css('select[name="model"]')).nativeElement;
    promptTextAreaElement = fixture.debugElement.query(By.css('textarea[name="prompt"]')).nativeElement;
    submitButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    form = fixture.debugElement.query(By.css('form'));
  });

  it('should emit the form value on submit', waitForAsync(() => {
    spyOn(component.submit, 'emit');

    modelSelectElement.selectedIndex = 1;
    modelSelectElement.dispatchEvent(new Event('change'));

    promptTextAreaElement.value = 'codegemma prompt';
    promptTextAreaElement.dispatchEvent(new Event('input'));

    form.triggerEventHandler('submit', {});

    expect(component.submit.emit).toHaveBeenCalledWith({
      model: 'codegemma',
      prompt: 'codegemma prompt'
    });
  }));
});
