---
title: MCP over MQTT
toc: false
---

This is the specification and SDK implementations of MCP over MQTT, an transport layer for the [Model Context Protocol](https://modelcontextprotocol.io).

{{< cards >}}
  {{< card link="docs" title="Explore the Docs" icon="book-open" >}}
{{< /cards >}}

## Why MQTT?

MQTT is a lightweight and widely used protocol for IoT and edge computing. It is designed for unreliable networks and low bandwidth, making it a good choice for edge devices and cloud services to communicate with each other.

Introducing MQTT as a transport layer for MCP enables the protocol to be used in a wider range of applications, including edge computing, IoT, and cloud services -- anywhere MQTT is to be used.

## Features

MCP over MQTT supports all the features of MCP and adds the following features:

- **Service Registry and Discovery**: MCP Clients can discover available services from the MQTT Broker.

- **Linear Scalability**: MCP Servers can be scaled horizontally by adding more server instances, while keeping the the server side stateful.

- **Load Balancing**: The MCP Server creates a pool of worker connections to handle client requests.

Additionally, by setting access control permissions on the message channels used by MCP clients and servers in the MQTT Broker, authorization for clients and servers can be very flexibly implemented.

## Limitations

MCP over MQTT is designed for remotely deployed MCP Servers, and the protocol requires a centralized MQTT Broker to function. Although locally deployed MCP Servers can also use the MCP over MQTT, it may introduce additional deployment complexity.

We are not meant to replace the existing MCP transport layers (stdio and HTTP SSE), but to provide an alternative for edge computing and IoT applications, and for the backend services that want to use MQTT as their messaging protocol.

## Explore

{{< cards >}}
  {{< card link="docs" title="Docs" icon="book-open" >}}
  {{< card link="about" title="About" icon="user" >}}
{{< /cards >}}
