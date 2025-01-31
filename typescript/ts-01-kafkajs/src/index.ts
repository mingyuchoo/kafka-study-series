import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-client-id',
  brokers: ['localhost:9092'],
});


// Producer
const producer = kafka.producer({
  maxInFlightRequests: 1,
  idempotent: true,
  transactionalId: "unique-producer-id",
});
const runProducer = async () => {
  await producer.connect();
  await producer.send({
    topic: 'quickstart-events',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  });
  await producer.disconnect();
}

// Consumer
const consumer = kafka.consumer({ groupId: 'test-group' });
const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'quickstart-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("Received: ", { partition, offset: message.offset, value: message.value.toString(), })
    },
  });
}

runProducer();
runConsumer();