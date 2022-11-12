import { BehaviorSubject } from "rxjs";

export class SharedService {
    
    subject: BehaviorSubject<any> = new BehaviorSubject<any>('');
    
    constructor() {}

}