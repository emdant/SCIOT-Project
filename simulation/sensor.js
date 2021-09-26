const mqtt = require('async-mqtt');
const { codes } = require('./fiscalcodes.json');
const { buildings } = require('./places.json');

const topic = 'iot/scanners/person'

const client = mqtt.connect('mqtt://guest:guest@localhost:1883');

client.on('connect', () => {
  setInterval(async () => {
    await client.publish(topic, Buffer.from(JSON.stringify(randomData())), {qos: 2});
    console.log('Sent message to topic');
  }, 4000);
});

process.on('SIGINT', async () => {
  console.log("Gracefully shutting down from SIGINT (Ctrl-C)");
  await client.end();
  process.exit();
});

function randomData() {
  let building = buildings[randomInt(buildings.length)]

  return {
    "fiscalcode": codes[randomInt(codes.length)],
    "building": building.name,
    "room": building.rooms[randomInt(building.rooms.length)],
    "datetime": new Date().toISOString()
  }
}

function randomInt(max) {
  return Math.floor(Math.random() * (max));
}
