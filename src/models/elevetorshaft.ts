import ElevatorCar from './elevatorcar'

export default class EleveatorShaft {
    name: string;
    location: string;
    Cars: ElevatorCar[];
    
    constructor(name: string, location: string) {
        this.name = name;
        this.location = location;
    }
}