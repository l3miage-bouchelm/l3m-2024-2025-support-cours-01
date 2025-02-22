import { Injectable, signal, WritableSignal } from '@angular/core';
import rawData from '../data/data-colleges.csv';
import { processStringToDataCollege } from '../data/college.tuple';
import { College, processCollegeFromTuple } from '../data/college.interface';

@Injectable({
  providedIn: 'root'
})
export class DataProcessService {
  private readonly _colleges = signal<readonly College[]>([]);
  public readonly colleges = this._colleges.asReadonly();

  constructor() {
    // Process raw data into a usable format
    // console.log(rawData);
    const lines = rawData.split("\n");
    const Ldata = lines.map(processStringToDataCollege)
    this._colleges.set(
      Ldata.map(processCollegeFromTuple)
    );

    const LC = rawData.split("\n")
                      .map( processStringToDataCollege )
                      .map( processCollegeFromTuple )
                      
    console.log(
      "liste des collèges",
      LC,
      "dont",
      LC.filter(
        c => c.secteur === "PUBLIC"
          && (c.rep_plus || c.rep)
      ).length,
      "établissements publiques en REP+"
    )

    // Combien d'élèves dans l'académie ?
    console.log(
      "nb élèves",
      LC.reduce(
        (nb, c) => nb + c.nombre_eleves_total,
        0
      ),
      LC.map(c => c.nombre_eleves_total)
        .reduce( (nb, n) => nb + n )    
    )
  }


}
