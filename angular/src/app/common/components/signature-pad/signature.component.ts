import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import SignaturePad from 'signature_pad';


@Component({
  selector: 'signature-pad',
  templateUrl: './signature.component.html',
  styleUrl: './signature.component.less',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SignatureComponent,
      multi: true
    }
  ]
})
export class SignatureComponent implements AfterViewInit, ControlValueAccessor {

  @ViewChild('signatureCanvas', { static: false }) signatureCanvas!: ElementRef;
  signaturePad: any;
  signature: any;
  onChange: any = () => {};
  onTouched: any = () => {};


  ngAfterViewInit(){
    this.signaturePad = new SignaturePad(this.signatureCanvas.nativeElement,{
      minWidth:0.3,
      maxWidth:1
    });
    this.signaturePad.on();
    this.signaturePad.addEventListener("endStroke", () => {
      const signature = this.signaturePad.toDataURL();
      if (this.signaturePad.isEmpty()) {
        this.signature = null;
      } else {
        this.signature = signature;
      }
      this.onChange(this.signature);
    });
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
