const { Kafka, logLevel } = require("kafkajs")

const clientId = "my-client-id"
const brokers = ["localhost:9092"]
const topic = "quickstart-events"

const kafka = new Kafka({ clientId, brokers, logLevel: logLevel.ERROR })
const producer = kafka.producer({})

const produce = async () => {
  await producer.connect()
  let i = 0

  try {
    await producer.send({
      topic,
      acks: 1,
      messages: [
        {
          key: String(i),
          value: "This is message " + i,
        },
      ],
    })

    console.log("Writes: ", i)
    i++
  } catch (err) {
    console.error("Could not write message " + err)
  }
}

produce().catch((err) => {
  console.error("Error in producer: ", err)
})