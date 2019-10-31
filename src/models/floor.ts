import Room from "./room";

export default class Floor {
  Number: number;
  Rooms: Room[];

  constructor(number: number) {
    this.Number = number;
    this.Rooms = new Array<Room>();

    //test method only
    for (let index = 0; index < testNames.length; index++) {
      const name = testNames[index];
      const type = testRoomNames[index];
      

      this.Rooms.push(new Room(name, type,500,500));
    }
  }
}

let testNames = [
  "Dunder Mifflin",
  "Apartment",
  "McDonalds",
  "Wendy's",
  "Condo"
];
let testRoomNames = [
  "Office",
  "Apartment",
  "Restaurant",
  "Restaurant",
  "Condo"
];
