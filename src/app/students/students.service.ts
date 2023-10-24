import { Injectable } from '@angular/core';
import { Observable, delay, interval, of } from 'rxjs';

export interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
}

export interface Country {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }

  getCounter(): Observable<number> {
    return interval(1000);
  }

  getLanguages(): Observable<string[]> {
    return of (['Ingles', 'Portugues', 'Español', 'Italiano']).pipe(delay(5000));
  }

  getCountries(): Observable<Country[]>  {
    return of ([
      {
        id: 1,
        name: 'Peru'
      },
      {
        id: 2,
        name: 'Uruguay'
      },
      {
        id: 3,
        name: 'Colombia'
      },
      {
        id: 4,
        name: 'Argentina'
      }
    ]).pipe(delay(2000));
  }

  getStudents(): Observable<Student[]> {
    return new Observable((subscriber) => {
      subscriber.next([
        {
          id: 1,
          name: 'Carlos',
          email: 'carlos@g.com',
          course: 'Angular'
        },
        {
          id: 2,
          name: 'Maria',
          email: 'maria@g.com',
          course: 'React'
        },
        {
          id: 3,
          name: 'Isaac',
          email: 'isaac@g.com',
          course: 'Vue'
        }
      ]);
      subscriber.complete();
    });
  }
}
