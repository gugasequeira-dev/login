import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

type InputTypes = "text" | "email" | "password"

@Component({
  selector: 'app-primary-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimaryInputComponent),
      multi: true
    }
  ],
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.scss'
})
export class PrimaryInputComponent implements ControlValueAccessor {
  @Input() type: InputTypes = "text";
  @Input() placeholder: string = "";
  @Input() label: string = "";
  @Input() inputName: string = "";
  @Input() inputId = 'input-' + Math.random().toString(36).substring(2, 9);

  value: string = ''
  onChange: any = () => {}
  onTouched: any = () => {}

  // Dispara evento quando o usuário digita no input
  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value
    this.onChange(value)
  }

  // Método chamado pelo Angular para atualizar o valor do campo
  writeValue(value: any): void {
    this.value = value
  }

  // Registra a função que será chamada quando o valor mudar
  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  // Registra a função que será chamada quando o campo for tocado
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {}
}
