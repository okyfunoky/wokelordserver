import Tower from './tower'


export default class User {
    name: string;
    towers: Tower[];
    

    constructor(name: string) {
        this.name = name;

    }
}