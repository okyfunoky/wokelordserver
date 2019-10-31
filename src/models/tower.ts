import Floor from './floor'
import Tenant from './tenant'
import ElevatorShaft from './elevetorshaft'


export default class Tower {
    name: string;
    Floors: Floor[];
    Reputation: number;
    Money: number;
    Population: number;
    TrackedTenants: Tenant[];
    RightElevatorShaft: ElevatorShaft;
    LeftElevatorShaft: ElevatorShaft;

    constructor(name: string) {
        this.name = name;
        this.Floors = floors.map((floor)=>{
            return new Floor(floor)
        })
    }

    getPopulation(){
        let population = 0;
        this.Floors.forEach(floor => {
            floor.Rooms.forEach((room)=>{
                population += room.Tenants.length;
            })
        });
        this.Population = population;
    }
}

let floors = [1,2,3,4,5,6,7]