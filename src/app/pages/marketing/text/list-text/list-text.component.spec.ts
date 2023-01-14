import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTextComponent } from './list-text.component';

describe('ListTextComponent', () => {
  let component: ListTextComponent;
  let fixture: ComponentFixture<ListTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
