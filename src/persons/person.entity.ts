import { IPerson } from './person.interface';

export class PersonEntity implements IPerson {
    id?: number;
    fullname: string;
    birth_year: number;
    death_year?: number | null;

    constructor(person: IPerson) {
        this.id = person.id;
        this.fullname = person.fullname;
        this.birth_year = person.birth_year;
        this.death_year = person.death_year;
    }
}