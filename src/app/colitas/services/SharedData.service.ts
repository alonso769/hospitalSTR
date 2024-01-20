import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

// export class SharedData {
//     public data: any = null;
// }


export class SharedData {
    public data: any[] = [];
  
    setData(data: any[]) {
      this.data = data;
    }
  }