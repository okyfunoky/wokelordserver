import Tenant from './tenant'


export default class Room {
    name: string;
    type: string;
    Tenants: Tenant[]

    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
        
        //test method only
        this.Tenants = testNames.map((name)=>{
            return new Tenant(name);
        })
    }
}


let testNames = ["Mike","Mary","Bill","Joe","Steve","George","John","Julia"]