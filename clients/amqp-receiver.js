var amqp = require('amqplib');

const queue = '/iot/scanners';
amqp.connect('amqp://localhost:5672').then(async (connection) => {
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, {
      durable: true
    });
  await channel.prefetch(1);

  await channel.consume(queue, (msg) => {
    console.log(JSON.parse(msg.content.toString()));

    channel.ack(msg); // acknowledge
  }, {
    noAck: false // manual acknoledgment
  });
  
  await channel.close();
  await connection.close();
});