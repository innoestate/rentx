import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignatureComponent } from 'src/app/displays/common/components/signature-pad/signature.component';
import { UiDropdownComponent } from 'src/app/ui/components/ui-dropdown/ui-dropdown.component';
import { UiFormComponent2 } from '../ui-form.component';

describe('UiFormComponent', () => {
  let component: UiFormComponent2<any>;
  let fixture: ComponentFixture<UiFormComponent2<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiFormComponent2,
        CommonModule,
        ReactiveFormsModule,
        UiDropdownComponent,
        SignatureComponent,
      ],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UiFormComponent2);
    fixture.componentRef.setInput('fields', [{key: 'test', label: 'test', type: 'text'}]);
    fixture.componentRef.setInput('values', {test: 'test'});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with correct fields and values', () => {
    expect(component).toBeTruthy();
    const fields = component.fields();
    const values = component.values();
    expect(fields).toEqual([{key: 'test', label: 'test', type: 'text'}]);
    expect(values).toEqual({test: 'test'});
  });

});
