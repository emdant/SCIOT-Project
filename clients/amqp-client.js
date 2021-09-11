const amqp = require('amqplib');
const { codes } = require('./fiscalcodes.json');
const { buildings } = require('./places.json');

const exchange = 'iot/scanners'
const key = 'person';

setInterval(() => {
  amqp.connect('amqp://localhost:5672').then(async (connection) => {
    const channel = await connection.createChannel();
  
    await channel.assertExchange(exchange, 'topic', {durable: false})
  
    channel.publish(exchange, key, Buffer.from(JSON.stringify(randomData())));
  
    console.log('Sent message to exchange');
  
    await channel.close();
    await connection.close()
  })
  .catch(console.warn);
}, 5000);

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
