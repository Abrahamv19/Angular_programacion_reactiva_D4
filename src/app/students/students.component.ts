import { Component, OnDestroy } from '@angular/core';
import { Student, StudentsService } from './students.service';
import { Observable, Subscription, filter, first, forkJoin, map, take } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnDestroy {
  students$: Observable<Student[]>;
  counter = 0;

  loading = false;

  counterSubscription: Subscription;

  constructor(private studentsService: StudentsService) {
    this.students$ = this.studentsService.getStudents();

    this.counterSubscription = this.studentsService.getCounter().pipe(
      take(5), 
      // first( ),
      map((v) => v*10),
      filter((v) => v > 15)
    ).subscribe({
      next: (v) => {
        console.log(v); 
        this.counter = v;
      }
    });
    this.loading = true;
    // this.studentsService.getCountries().subscribe({
    //   next: (v) => {
    //     console.log('Se cargaron los paises'); 
    //     this.loading = false;
    //   },
    // });

    // this.studentsService.getLanguages().subscribe({
    //   next: (v) => {
    //     console.log('Se cargaron los idiomas'); 
    //   },
    // });

    forkJoin([this.studentsService.getCountries(),
      this.studentsService.getLanguages(),
    ]).subscribe({
      next: (v) => {
        // console.log('Resultado con forkJoin, valor = ', v);
        console.log('Resultado paises ', v[0]);
        console.log('Resultado idiomas ', v[1]);
      },
      complete: () => {
        this.loading = false;
      },

      error: () => {}
    });
  }
  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
  }

}
