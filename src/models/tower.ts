import Floor from './floor'
import Tenant from './tenant'
import ElevatorShaft from './elevetorshaft'
import ElevatorCar from './elevatorcar';


export default class Tower {
    name: string;
    Floors: Floor[];
    Reputation: number;
    Money: number;
    Population: number;
    TrackedTenants: Tenant[];
    RightElevatorShaft: ElevatorShaft;
    LeftElevatorShaft: ElevatorShaft;
    TotalElevatorCapacity: number;
    ElevatorsAreCrowded: boolean;
    GlobalHappiness: number;
    MonthsWithNoMoney: number;
    StarLevel: number;

    constructor(name: string) {
        this.name = name;
        this.Floors = floors.map((floor)=>{
            return new Floor(floor)
        })

        this.testPopulateElevatorCars();
        this.Money = 500000;
    }

    getPopulation(preview: boolean){
        let population = 0;
        this.Floors.forEach(floor => {
            floor.Rooms.forEach((room)=>{
                population += room.Tenants.length;
            })
        });
        this.Population = population;
    }

    getEleveatorTotalCapacity(preview: boolean){
        let capacity = 0;
        let rightCapacity = 0;
        let leftCapacity = 0;

        this.RightElevatorShaft.Cars.forEach((car)=>{
            rightCapacity += car.capacity;
        })

        this.LeftElevatorShaft.Cars.forEach((car)=>{
            leftCapacity += car.capacity;
        })
        capacity = rightCapacity + leftCapacity;
        this.TotalElevatorCapacity = capacity;
    }

    //TODO: I could provide capacity info back to the user, instead of just giving them pissed off tenants
    areElevatorsCrowded(preview: boolean){
        this.getPopulation(preview);
        this.getEleveatorTotalCapacity(preview);

        if(this.Population > this.TotalElevatorCapacity){
            this.ElevatorsAreCrowded = true;
        }else{
            this.ElevatorsAreCrowded = false;
        }
    }

    //TODO: Spread this value to all tenants
    calculateGlobalHappiness(preview: boolean){
        let happiness = 0;

        if(this.ElevatorsAreCrowded){
            happiness -= 10;
        }

    }

    calcuateMonthlyIncome(preview: boolean){
        let startingMoney = this.Money;

        this.Floors.forEach((floor)=>{
            floor.Rooms.forEach((room)=>{
                let roomProfit = room.rent -room.maintenanceCost;
                startingMoney += roomProfit;
            })
        })

        if(startingMoney < 0){
            this.MonthsWithNoMoney++;
            if(!preview && this.MonthsWithNoMoney >= 3){
                //lose
            }
        }
        this.Money = startingMoney;
    }

    calculateStarLevel(preview: boolean){
        this.getPopulation(preview);

        if(this.Population > 100){
            this.StarLevel = 2;
        }
        if(this.Population > 500){
            this.StarLevel = 3;
        }
        if(this.Population > 1500){
            this.StarLevel = 4;
        }
        if(this.Population > 3000){
            this.StarLevel = 5;
        }
    }

    testPopulateElevatorCars(){
        this.RightElevatorShaft = new ElevatorShaft("Right","Right");
        this.LeftElevatorShaft = new ElevatorShaft("Left","Left");
        this.RightElevatorShaft.Cars = new Array<ElevatorCar>();
        this.LeftElevatorShaft.Cars = new Array<ElevatorCar>();

        elevatorCars.forEach((number)=>{
            this.RightElevatorShaft.Cars.push(new ElevatorCar(number.toString(),""))
            this.LeftElevatorShaft.Cars.push(new ElevatorCar(number.toString(),""))
        })
    }
}

let floors = [1,2,3,4,5,6,7,8,9,10,11,12]
let elevatorCars = [1,2,3]