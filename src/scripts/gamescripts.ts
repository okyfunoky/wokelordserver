let db = require("../dbmodels");

const floorCost = -100000;

async function buildRoom(towerName: string, roomType: string, floorId: string) {
  console.log("Build room function...")

  let roomInfo = {
    cost: 0,
    rent: 0,
    maintenance: 0,
    tenantCount: 0,
    size: 0,
    buildable: false
  };

  switch (roomType) {
    case "apartment":
      roomInfo.cost = -1000;
      roomInfo.rent = 800;
      roomInfo.maintenance = -200;
      roomInfo.tenantCount = 3;
      roomInfo.size = 3;
      break;
    case "office":
      roomInfo.cost = -2000;
      roomInfo.rent = 1600;
      roomInfo.maintenance = -400;
      roomInfo.tenantCount = 8;
      roomInfo.size = 3;
      break;
    case "restaurant":
      roomInfo.cost = -5000;
      roomInfo.rent = 2500;
      roomInfo.maintenance = -500;
      roomInfo.tenantCount = 4;
      roomInfo.size = 6;
      break;
    case "condo":
      roomInfo.cost = -500;
      roomInfo.rent = 300; //condo rents are different, its more of dues
      roomInfo.maintenance = -100;
      roomInfo.tenantCount = 4;
      roomInfo.size = 4;
      break;
    case "entertainment":
      roomInfo.cost = -10000;
      roomInfo.rent = 4500;
      roomInfo.maintenance = -1200;
      roomInfo.tenantCount = 5;
      roomInfo.size = 6;
      break;
    case "retail":
      roomInfo.cost = -5000;
      roomInfo.rent = 2500;
      roomInfo.maintenance = -800;
      roomInfo.tenantCount = 3;
      roomInfo.size = 4;
      break;
    case "hotel":
      roomInfo.cost = -2500;
      roomInfo.rent = 1800;
      roomInfo.maintenance = -1000;
      roomInfo.tenantCount = 1;
      roomInfo.size = 1;
      break;
  }

  let floor = await getFloor(floorId);
  console.log("Build log logging floor")
  console.log(floor);
  
  let newSpace = parseInt(floor[0].occupiedSpace) + roomInfo.size;
  console.log(newSpace)
  if(newSpace <= 12){
    //we can build, allow it.
    //need $$ calc here, too
    roomInfo.buildable = true;
    //update floor in DB with new space
    
    await updateFloorSpace(towerName,floorId,newSpace);

  }


  return roomInfo;
}

export async function addRoomToFloor(floorid: string, towerName: string, room: any) {
  const filter = {_id: floorid, towerName: towerName};
  console.log("Room to build: " + room.roomName)

  let parsedRoom = await buildRoom(towerName, room.roomType, floorid);

  let tenants = populateTenants(parsedRoom.tenantCount);

  console.log("Got parsed room...")
  if(parsedRoom.buildable){
    let newTower = await adjustTowerMoney(towerName,parsedRoom.cost);
    return db.Room.create({name: room.roomName, type: room.roomType, happiness: room.happiness, rent: parsedRoom.rent, maintenance: parsedRoom.maintenance, tenants: tenants})
    .then(function(dbRoom) {
      return db.Floor.findOneAndUpdate(
        filter,
        { $push: { rooms: dbRoom._id } },
        //returns the new object
        { new: true }
      ).populate("rooms");
    })
  }else{
    return false;
  }
}

export async function adjustTowerMoney(towerName: string, adjustment){
  let filter = { name: towerName };
  let tower = await getTower(towerName);
  console.log(tower);
  let newValue = tower[0].money + adjustment;

  let update = await db.Tower.findOneAndUpdate(
    filter,
    { money: newValue},
    { new: true }
  );
  return update;
}

function populateTenants(tenantCount: number){
  let tenants = [];
  for (let index = 0; index < tenantCount; index++) {
    let tenant = {
      name: "",
      happiness: 50,
    }
    tenants.push(tenant);
  }
  return tenants;
}

export async function addFloorToTower(towerName: string, floor: number){
  const filter = {name: towerName}
  let newTower = await adjustTowerMoney(towerName,floorCost);
  return db.Floor.create({ number: floor, towerName: towerName, occupiedSpace: 0 })
  .then(function(dbFloor) {
    console.log(dbFloor);
    return db.Tower.findOneAndUpdate(
      filter,
      { $push: { floors: dbFloor._id } },
      { new: true }
    ).populate("floors");
  })
}

export function updateFloorSpace(towerName: string, floorId: string, newSpace: number){
  const filter = {_id: floorId}
  return db.Floor.findOneAndUpdate(filter, {occupiedSpace: newSpace});
}

export function createTower(towerName: string){
    return db.Tower.create({ name: towerName, money: 10000000 })
}

export function getTower(towerName: string){
  console.log("Getting..." + towerName);
  return db.Tower.find({ name: towerName }).populate("floors");
}

export function getRoomsForFloor(floorId: string){
  return db.Floor.find({ _id: floorId }).populate("rooms");
}

export function loadTowers(){
  return db.Tower.find({});
}

export function getFloor(floorId: string){
  return db.Floor.find({ _id: floorId });
}

export async function calculatePopulation(towerName: string) {
    let population = 0;
    let tower = await getTower(towerName);
    let floors = tower[0].floors;

    for (const floor of floors) {
      let currentFloor = await getRoomsForFloor(floor._id);
      for (const room of currentFloor[0].rooms) {
        population += room.tenants.length;
      }
    }
    return population;
}

export async function getTowerMoney(towerName: string) {
  let tower = await getTower(towerName);

  let money = tower[0].money;

  return money;
}

export async function calculateIncome(towerName: string) {
  let tower = await getTower(towerName);
  let floors = tower[0].floors;
  let rent = 0;
  let maintenance = 0;

  for (const floor of floors) {
    let currentFloor = await getRoomsForFloor(floor._id);
    for (const room of currentFloor[0].rooms) {
      rent += room.rent;
      maintenance += room.maintenance;
    }
  }

  let income = rent + maintenance;
  let newTower = await adjustTowerMoney(towerName, income);
}