import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeNestedComponent } from './tree-nested.component';

describe('TreeNestedComponent', () => {
  let component: TreeNestedComponent;
  let fixture: ComponentFixture<TreeNestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreeNestedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TreeNestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
