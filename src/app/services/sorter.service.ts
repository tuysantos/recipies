import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SorterService {

  constructor() { }
  property: string = null;
	direction: number = -1;

  sort(collection: any[], prop: any) {
      this.property = prop;

      collection.sort((a: any,b: any) => {
          let aVal: any;
          let bVal: any;

          aVal = a[prop];
          bVal = b[prop];

          if (this.isString(aVal)) aVal = aVal.trim().toUpperCase();
          if (this.isString(bVal)) bVal = bVal.trim().toUpperCase();
        
          if(aVal === bVal){
              return 0;
          }
          else if (aVal > bVal){
              return this.direction * -1;
          }
          else {
              return this.direction * 1;
          }
      });
  }
  
  isString(val: any) : boolean {
    return (val && (typeof val === 'string' || val instanceof String));
  }

}
  