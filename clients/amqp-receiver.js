var amqp = require('amqplib');

const queue = '/iot/scanners';
amqp.connect('amqp://localhost:5672').then(async (connection) => {
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, {durable: false});
  await channel.consume(queue, (msg) => {
    console.log(msg.content.toString());
  }, {noAck: true});
  
  await channel.close();
  await connection.close();
});