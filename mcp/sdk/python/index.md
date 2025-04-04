---
title: Python SDK
---

# Quickstart

## Create a Demo Project

Now let create a demo project using [uv](https://docs.astral.sh/uv/):

```bash
uv init mcp_over_mqtt_demo
cd mcp_over_mqtt_demo
```

## Create a Simple MCP Server

In the `mcp_over_mqtt_demo` project, let's create a simple MCP server that exposes a calculator tool and some resources. Create a file named `demo_mcp_server.py` in the project directory and add the following code:

```python
# demo_mcp_server.py
from mcp.server.fastmcp import FastMCP

# Create an MCP server
mcp = FastMCP(
    "demo_mcp_server/calculator",
    log_level="DEBUG",
    mqtt_service_description="A simple FastMCP server that exposes a calculator tool",
    mqtt_options={
        "host": "broker.emqx.io",
    },
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

## Create a Simple MCP Client

In the same project, let's create a simple MCP client that connects to the server and lists the available tools and resources. Create a file named `demo_mcp_client.py` in the project directory and add the following code:

```python
# demo_mcp_client.py
import anyio
import mcp.client.mqtt as mcp_mqtt
import logging
from mcp.shared.mqtt import configure_logging

configure_logging(level="DEBUG")
logger = logging.getLogger(__name__)

async def on_mcp_server_presence(client, service_name, status):
    if status == "online":
        logger.info(f"Connecting to {service_name}...")
        await client.initialize_mcp_server(service_name)

async def on_mcp_connect(client, service_name, connect_result):
    capabilities = client.service_sessions[service_name].server_info.capabilities
    if capabilities.prompts:
        prompts = await client.list_prompts(service_name)
        logger.info(f"Prompts of {service_name}: {prompts}")
    if capabilities.resources:
        resources = await client.list_resources(service_name)
        logger.info(f"Resources of {service_name}: {resources}")
        resource_templates = await client.list_resource_templates(service_name)
        logger.info(f"Resource templates of {service_name}: {resource_templates}")
    if capabilities.tools:
        toolsResult = await client.list_tools(service_name)
        tools = toolsResult.tools
        logger.info(f"Tools of {service_name}: {tools}")
        if tools[0].name == "add":
            result = await client.call_tool(service_name, name = tools[0].name, arguments={"a": 1, "b": 2})
            logger.info(f"Calling the tool as add(a=1, b=2), result: {result}")

async def on_mcp_disconnect(client, service_name, reason):
    logger.info(f"Disconnected from {service_name}, reason: {reason}")
    logger.info(f"Services now: {client.service_sessions.keys()}")

async def main():
    async with mcp_mqtt.MqttTransportClient(
        "test_client",
        auto_connect_to_mcp_server = True,
        on_mcp_server_presence = on_mcp_server_presence,
        on_mcp_connect = on_mcp_connect,
        on_mcp_disconnect = on_mcp_disconnect,
        mqtt_options = mcp_mqtt.MqttOptions(
            host="broker.emqx.io",
        )
    ) as client:
        client.start()
        while True:
            logger.info("Other works while the MQTT transport client is running in the background...")
            await anyio.sleep(10)

if __name__ == "__main__":
    anyio.run(main)
```

## Run the Demo

1. First, install the required dependencies:

```bash
uv add git+https://github.com/emqx/mcp-python-sdk --branch main
uv add "mcp[cli]"
```

2. Now run the client:

```bash
uv run demo_mcp_client.py
```

3. Open a new terminal and run the server:

```bash
uv run mcp run --transport mqtt ./demo_mcp_server.py
```

Although the client was started first, it will discover the servers and connect to it. The client will then list the available tools and resources, and call the `add` tool with the arguments `a=1` and `b=2`.
