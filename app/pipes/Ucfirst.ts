import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Ucfirst pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'ucfirst'
})
@Injectable()
export class Ucfirst {
  /*
    Takes a value and makes it usfirst
   */
  transform(value: string, args: any[]) {
    value = value + ''; // make sure it's a string
    return value.charAt(0).toUpperCase()+ value.substr(1);
  }
}
