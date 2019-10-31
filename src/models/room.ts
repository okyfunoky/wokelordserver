import Tenant from './tenant'


export default class Room {
    name: string;
    type: string;
    rent: number;
    roomHappiness: number;
    maintenanceCost: number;

    Tenants: Tenant[]

    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
        
        //test method only
        this.Tenants = testNames.map((name)=>{
            return new Tenant(name);
        })

        this.rent = 500;
        this.maintenanceCost = 75;
    }

    calculateHappinessForRoom(){
        var maintenenceRatio = this.rent/this.maintenanceCost;
        console.log(`Maint ratio is ${maintenenceRatio}`)
        //when a room makes 10x it's maintenance cost, it's unhappy
        if(maintenenceRatio >10){
            this.roomHappiness -= 10;
        }
    }
}


let testNames = ["Mike","Mary","Bill","Joe","Steve","George","John","Julia"]