---
title: Python SDK
type: docs
weight: 1
prev: /
next: docs/specification/
---

The getting started guide for the Python SDK.

## Quickstart

1. Create a demo project using uv:

```bash
uv init demo_mcp_server
cd demo_mcp_server
```

2. Let's create a simple MCP server that exposes a calculator tool and some data:

```python
# demo_mcp_server.py
from mcp.server.fastmcp import FastMCP

# Create an MCP server
mcp = FastMCP(
    "demo_mcp_server/calculator",
    log_level="DEBUG",
    mqtt_service_description="A simple FastMCP server that exposes a calculator tool",
)

# Add an addition tool
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

# Add a dynamic greeting resource
@mcp.resource("greeting://{name}")
def get_greeting(name: str) -> str:
    """Get a personalized greeting"""
    return f"Hello, {name}!"
```

3. Fetch dependencies and start the server:

```bash
uv add git+https://github.com/emqx/mcp-python-sdk
uv add "mcp[cli]"

uv run mcp run --transport mqtt ./demo_mcp_server.py
```
