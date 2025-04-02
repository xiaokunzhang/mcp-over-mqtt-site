---
title: Base Protocol
cascade:
  type: docs
weight: 2
prev: docs/specification/draft/architecture/
next: docs/specification/draft/basic/transports
---

{{< callout type="info" >}}
This page is modified from [MCP-Basic-Protocol](https://spec.modelcontextprotocol.io/specification/draft/basic/) for the MQTT transport layer, modifications include:

- [Authentication](#authentication)
- [Authorization](#authorization)
- [Schema](#schema)
{{< /callout >}}

{{< callout type="info" >}} **Protocol Revision**: draft {{< /callout >}}

All messages between MCP clients and servers **MUST** follow the
[JSON-RPC 2.0](https://www.jsonrpc.org/specification) specification. The protocol defines
three fundamental types of messages:

| Type            | Description                            | Requirements                           |
| --------------- | -------------------------------------- | -------------------------------------- |
| `Requests`      | Messages sent to initiate an operation | Must include unique ID and method name |
| `Responses`     | Messages sent in reply to requests     | Must include same ID as request        |
| `Notifications` | One-way messages with no reply         | Must not include an ID                 |

**Responses** are further sub-categorized as either **successful results** or **errors**.
Results can follow any JSON object structure, while errors must include an error code and
message at minimum.

## Protocol Layers

The Model Context Protocol consists of several key components that work together:

- **Base Protocol**: Core JSON-RPC message types
- **Lifecycle Management**: Connection initialization, capability negotiation, and
  session control
- **Server Features**: Resources, prompts, and tools exposed by servers
- **Client Features**: Sampling and root directory lists provided by clients
- **Utilities**: Cross-cutting concerns like logging and argument completion

All implementations **MUST** support the base protocol and lifecycle management
components. Other components **MAY** be implemented based on the specific needs of the
application.

These protocol layers establish clear separation of concerns while enabling rich
interactions between clients and servers. The modular design allows implementations to
support exactly the features they need.

See the following pages for more details on the different components:

{{< cards >}}
{{< card link="/docs/specification/draft/basic/lifecycle" title="Lifecycle" icon="refresh" >}}
{{< card link="/docs/specification/draft/server/resources" title="Resources" icon="document" >}}
{{< card link="/docs/specification/draft/server/prompts" title="Prompts" icon="chat-alt-2" >}}
{{< card link="/docs/specification/draft/server/tools" title="Tools" icon="adjustments" >}}
{{< card link="/docs/specification/draft/server/utilities/logging" title="Logging" icon="annotation" >}}
{{< card link="/docs/specification/draft/client/sampling" title="Sampling" icon="code" >}}
{{< /cards >}}

## Authentication

MCP Clients and MCP Servers authenticate with the MQTT Broker using methods supported by the MQTT Broker. This can include username and password-based authentication or more advanced methods such as SCRAM.

## Authorization

By restricting the topics that MCP Clients can use on the MQTT Broker, you can limit the MCP Servers that MCP Clients can access.

## Schema

The full specification of the protocol is defined as a
[TypeScript schema](https://github.com/emqx/mcp-over-mqtt-site/tree/main/schema/draft/schema.ts).
This is the source of truth for all protocol messages and structures.

There is also a
[JSON Schema](https://github.com/emqx/mcp-over-mqtt-site/tree/main/schema/draft/schema.json),
which is automatically generated from the TypeScript source of truth, for use with
various automated tooling.
