# Get Kafka

```bash
$ tar -xzf kafka_2.13-3.1.0.tgz
$ cd kafka_2.13-3.1.0
```

# Start the Kafka environment

## Start the ZooKeeper service

Note: Soon, ZooKeeper will no longer be required by Apache Kafka.

```bash
$ bin/zookeeper-server-start.sh config/zookeeper.properties
```

## Start the Kafka broker service

```bash
$ bin/kafka-server-start.sh config/server.properties
```

# Create a topic to store my events

## Create a topic so that write my first events

```bash
$ bin/kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092
```

## Check details such as the partition count of the new topic

```bash
$ bin/kafka-topics.sh --describe --topic quickstart-events --bootstrap-server localhost:9092
Topic: quickstart-events	TopicId: O98YGs7FR5-fPWIFCL9yhA	PartitionCount: 1	ReplicationFactor: 1	Configs: segment.bytes=1073741824
	Topic: quickstart-events	Partition: 0	Leader: 0	Replicas: 0	Isr: 0
```

# Write some events into the topic
```bash
$ bin/kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092
>This is my first event
>This is my second event
>
```

# Read the events from the topic

```bash
$ bin/kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server localhost:9092
This is my first event
This is my second event
```

# Terminate the Kafka environment

1. Stop the producer and consumer clients with `Ctrl+c`
2. Stop the Kfka broker with `Ctrl+c`
3. Stop the Zookeeper server with `Ctrl+c`
4. Delete any data of my local Kafka environment

```bash
$ rm -rf /tmp/kafka-logs /tmp/zookeeper
```
