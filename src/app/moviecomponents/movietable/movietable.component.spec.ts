import {  HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { MovieservicesService } from '../../services/movieservices.service';

import { MovietableComponent } from './movietable.component';

describe('MovietableComponent', () => {
  let component: MovietableComponent;
  let fixture: ComponentFixture<MovietableComponent>;
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ MovietableComponent ],
      imports:[HttpClientModule],

    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovietableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shouldgetmovies', fakeAsync(()=>{

    let movieservice = fixture.debugElement.injector.get(MovieservicesService);

    let spy = spyOn(movieservice, 'getAllMovies')
    .and.returnValue(of([{
      name: 'name',
      id: 'id',
      rating: 8,
      genre: ['genre1', 'genre2'],
      genreId: [1,2],
      img: 'imgsrc',
      description: 'desc',
      releaseDate: new Date('1-1-1998'),
      duration: 150
    }]));
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      expect(component.MovieList?.length).toBeGreaterThanOrEqual(1);
    });
  }));
});
