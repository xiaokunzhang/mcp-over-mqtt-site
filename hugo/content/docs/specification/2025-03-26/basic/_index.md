---
title: Base Protocol
cascade:
  type: docs
weight: 20
---

{{< callout type="info" >}}
This page is modified from [MCP-Basic-Protocol](https://spec.modelcontextprotocol.io/specification/2025-03-26/basic/) for the MQTT transport layer, modifications include:

- [Auth](#auth): added auth methods for MQTT transport
- [Schema](#schema): added some notification messages for MQTT transport
{{< /callout >}}

{{< callout type="info" >}} **Protocol Revision**: 2025-03-26 {{< /callout >}}

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

## Messages

All messages between MCP clients and servers **MUST** follow the
[JSON-RPC 2.0](https://www.jsonrpc.org/specification) specification. The protocol defines
these types of messages:

### Requests

Requests are sent from the client to the server or vice versa, to initiate an operation.

```typescript
{
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

- Requests **MUST** include a string or integer ID.
- Unlike base JSON-RPC, the ID **MUST NOT** be `null`.
- The request ID **MUST NOT** have been previously used by the requestor within the same
  session.

### Responses

Responses are sent in reply to requests, containing the result or error of the operation.

```typescript
{
  jsonrpc: "2.0";
  id: string | number;
  result?: {
    [key: string]: unknown;
  }
  error?: {
    code: number;
    message: string;
    data?: unknown;
  }
}
```

- Responses **MUST** include the same ID as the request they correspond to.
- **Responses** are further sub-categorized as either **successful results** or
  **errors**. Either a `result` or an `error` **MUST** be set. A response **MUST NOT**
  set both.
- Results **MAY** follow any JSON object structure, while errors **MUST** include an
  error code and message at minimum.
- Error codes **MUST** be integers.

### Notifications

Notifications are sent from the client to the server or vice versa, as a one-way message.
The receiver **MUST NOT** send a response.

```typescript
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

- Notifications **MUST NOT** include an ID.

### Batching

JSON-RPC also defines a means to
[batch multiple requests and notifications](https://www.jsonrpc.org/specification#batch),
by sending them in an array. MCP implementations **MAY** support sending JSON-RPC
batches, but **MUST** support receiving JSON-RPC batches.

## Auth

MCP provides an [Authorization]({{< ref "authorization" >}}) framework for use with HTTP.
Implementations using an HTTP-based transport **SHOULD** conform to this specification,
whereas implementations using STDIO transport **SHOULD NOT** follow this specification,
and instead retrieve credentials from the environment.

Additionally, clients and servers **MAY** negotiate their own custom authentication and
authorization strategies.

For further discussions and contributions to the evolution of MCP’s auth mechanisms, join
us in
[GitHub Discussions](https://github.com/modelcontextprotocol/specification/discussions)
to help shape the future of the protocol!

### Authentication and Authorization in MQTT Transport

MCP Clients and MCP Servers authenticate with the MQTT Broker using methods supported by the MQTT Broker. This can include username and password-based authentication or more advanced methods such as SCRAM.

By restricting the topics that MCP Clients can use on the MQTT Broker, you can limit the MCP Servers that MCP Clients can access.

## Schema

The full specification of the protocol is defined as a
[TypeScript schema](https://github.com/emqx/mcp-over-mqtt-site/tree/main/schema/draft/schema.ts).
This is the source of truth for all protocol messages and structures.

There is also a
[JSON Schema](https://github.com/emqx/mcp-over-mqtt-site/tree/main/schema/draft/schema.json),
which is automatically generated from the TypeScript source of truth, for use with
various automated tooling.
