const mqtt = require('async-mqtt');
const { codes } = require('./fiscalcodes.json');
const { buildings } = require('./places.json');

const topic = 'iot/scanners/person'

const client = mqtt.connect('mqtt://guest:guest@192.168.0.1:1883');

client.on('connect', () => {
  setInterval(async () => {
    const data = randomData();
    await client.publish(topic, Buffer.from(JSON.stringify(data)), {qos: 2});
    console.log(`Sent message to topic with fiscal code: ${data.fiscalcode}`);
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
