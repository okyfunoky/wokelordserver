"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const floor_1 = require("./floor");
const elevetorshaft_1 = require("./elevetorshaft");
const elevatorcar_1 = require("./elevatorcar");
class Tower {
    constructor(name) {
        this.name = name;
        this.Floors = floors.map((floor) => {
            return new floor_1.default(floor);
        });
        this.testPopulateElevatorCars();
        this.Money = 500000;
    }
    getPopulation(preview) {
        let population = 0;
        this.Floors.forEach(floor => {
            floor.Rooms.forEach((room) => {
                population += room.Tenants.length;
            });
        });
        this.Population = population;
    }
    getEleveatorTotalCapacity(preview) {
        let capacity = 0;
        let rightCapacity = 0;
        let leftCapacity = 0;
        this.RightElevatorShaft.Cars.forEach((car) => {
            rightCapacity += car.capacity;
        });
        this.LeftElevatorShaft.Cars.forEach((car) => {
            leftCapacity += car.capacity;
        });
        capacity = rightCapacity + leftCapacity;
        this.TotalElevatorCapacity = capacity;
    }
    //TODO: I could provide capacity info back to the user, instead of just giving them pissed off tenants
    areElevatorsCrowded(preview) {
        this.getPopulation(preview);
        this.getEleveatorTotalCapacity(preview);
        if (this.Population > this.TotalElevatorCapacity) {
            this.ElevatorsAreCrowded = true;
        }
        else {
            this.ElevatorsAreCrowded = false;
        }
    }
    //TODO: Spread this value to all tenants
    calculateGlobalHappiness(preview) {
        let happiness = 0;
        if (this.ElevatorsAreCrowded) {
            happiness -= 10;
        }
    }
    calcuateMonthlyIncome(preview) {
        let startingMoney = this.Money;
        this.Floors.forEach((floor) => {
            floor.Rooms.forEach((room) => {
                let roomProfit = room.rent - room.maintenanceCost;
                startingMoney += roomProfit;
            });
        });
        if (startingMoney < 0) {
            this.MonthsWithNoMoney++;
            if (!preview && this.MonthsWithNoMoney >= 3) {
                //lose
            }
        }
        this.Money = startingMoney;
    }
    calculateStarLevel(preview) {
        this.getPopulation(preview);
        if (this.Population > 100) {
            this.StarLevel = 2;
        }
        if (this.Population > 500) {
            this.StarLevel = 3;
        }
        if (this.Population > 1500) {
            this.StarLevel = 4;
        }
        if (this.Population > 3000) {
            this.StarLevel = 5;
        }
    }
    testPopulateElevatorCars() {
        this.RightElevatorShaft = new elevetorshaft_1.default("Right", "Right");
        this.LeftElevatorShaft = new elevetorshaft_1.default("Left", "Left");
        this.RightElevatorShaft.Cars = new Array();
        this.LeftElevatorShaft.Cars = new Array();
        elevatorCars.forEach((number) => {
            this.RightElevatorShaft.Cars.push(new elevatorcar_1.default(number.toString(), ""));
            this.LeftElevatorShaft.Cars.push(new elevatorcar_1.default(number.toString(), ""));
        });
    }
}
exports.default = Tower;
let floors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let elevatorCars = [1, 2, 3];
//# sourceMappingURL=tower.js.map