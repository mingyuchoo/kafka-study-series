const { Kafka, logLevel } = require("kafkajs")

const clientId = "my-client-id"
const brokers = ["localhost:9092"]
const topic = "quickstart-events"

const kafka = new Kafka({
  clientId,
  brokers,
  logLevel: logLevel.ERROR,
})

const consumer = kafka.consumer({
  groupId: "my-group-id",
  minBytes: 5,
  maxBytes: 1e6,
  maxWaitTimeInMs: 3000,
})

const consume = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    eachMessage: ({ message }) => {
      console.log(`Received: ${message.value}`)
    },
  })
}

consume().catch((err) => {
  console.error("Error in consumer: ", err)
})