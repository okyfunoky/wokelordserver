import Tower from "../models/tower";

console.log("Starting test...")

let newTower = new Tower("Mike's Tower");

console.log(`${newTower.name} has ${newTower.Floors.length} floors`);

newTower.getPopulation(true);
console.log(`The population of ${newTower.name} is ${newTower.Population}`)

newTower.areElevatorsCrowded(true);
console.log(`Are the elevators crowded? ${newTower.ElevatorsAreCrowded}`)

newTower.calcuateMonthlyIncome(true);
console.log(`Current Money: ${newTower.Money}`)

// newTower.Floors.forEach(floor => {
//     console.log(`${floor.Number} has ${floor.Rooms.length}`);
//     floor.Rooms.forEach((room)=>{
//         console.log(`The tenants in ${room.name}, which is a ${room.type} are ${room.Tenants}`)
//     })
// });