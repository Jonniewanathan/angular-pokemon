import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteButtonComponent } from './favourite-button.component';

describe('FavouriteButtonComponent', () => {
  let component: FavouriteButtonComponent;
  let fixture: ComponentFixture<FavouriteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavouriteButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
