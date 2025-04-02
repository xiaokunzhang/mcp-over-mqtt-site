---
title: Specification
type: docs
weight: 2
prev: docs/python-sdk
next: docs/specification/draft/architecture
sidebar:
  open: true
---

The specification for the MCP over MQTT protocol.

This protocol is based on the [official MCP protocol](https://spec.modelcontextprotocol.io/specification/draft/), with modifications to remove content specific to stdio and HTTP SSE transport layers, and additions for the MQTT transport layer. The modified sections are:

- [Architecture](/docs/specification/draft/architecture/)
- [Transports](/docs/specification/draft/basic/transports/)
- [Lifecycle](/docs/specification/draft/basic/lifecycle/)
- [Resources](/docs/specification/draft/server/resources/)
