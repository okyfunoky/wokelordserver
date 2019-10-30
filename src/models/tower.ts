import Floor from './floor'


export default class Tower {
    name: string;
    Floors: Floor[]

    constructor(name: string) {
        this.name = name;
        this.Floors = floors.map((floor)=>{
            return new Floor(floor)
        })
        
    }
}

let floors = [1,2,3,4,5,6,7]