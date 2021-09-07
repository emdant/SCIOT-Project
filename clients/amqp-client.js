const amqp = require('amqplib');

const queue = '/iot/scanners';
amqp.connect('amqp://localhost:5672').then(async (connection) => {
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from('Hello World!'));
  console.log('Sent message to queue');

  await channel.close();
  await connection.close()
})
.catch(console.warn);