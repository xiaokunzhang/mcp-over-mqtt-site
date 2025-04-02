---
title: Server Features
cascade:
  type: docs
weight: 30
---

{{< callout type="info" >}} **Protocol Revision**: 2025-03-26 {{< /callout >}}

Servers provide the fundamental building blocks for adding context to language models via
MCP. These primitives enable rich interactions between clients, servers, and language
models:

- **Prompts**: Pre-defined templates or instructions that guide language model
  interactions
- **Resources**: Structured data or content that provides additional context to the model
- **Tools**: Executable functions that allow models to perform actions or retrieve
  information

Each primitive can be summarized in the following control hierarchy:

| Primitive | Control                | Description                                        | Example                         |
| --------- | ---------------------- | -------------------------------------------------- | ------------------------------- |
| Prompts   | User-controlled        | Interactive templates invoked by user choice       | Slash commands, menu options    |
| Resources | Application-controlled | Contextual data attached and managed by the client | File contents, git history      |
| Tools     | Model-controlled       | Functions exposed to the LLM to take actions       | API POST requests, file writing |

Explore these key primitives in more detail below:

{{< cards >}} {{< card link="prompts" title="Prompts" icon="chat-alt-2" >}}
{{< card link="resources" title="Resources" icon="document" >}}
{{< card link="tools" title="Tools" icon="adjustments" >}} {{< /cards >}}
