## Hardware topology

All communication happens through a local MQTT Broker, eg. a hardware gateway.
Newer versions of ITxPT also specifies MQTT as a standard way of interacting
with devices.

```mermaid
---
title: Component connections w/protocols
---

graph TB

    subgraph terminal
    A("Sales Client (Client)")
    end
    A <--MQTT--> B("Gateway (Broker)")

    subgraph READERS
        D("Barcode/NFC/EMV (Device)")
        E("Barcode/NFC/EMV (Device)")
        F("Barcode/NFC/EMV (Device)")
    end

    B <--MQTT--> READERS
    B<--MQTT-->G("GPS (Device)")

    B<-.MQTT.->C("APC (Device)")

    style C opacity:0.7,stroke-dasharray: 4
```

### Terminology

- **Client**: Sales client used by operators.
- **Broker**: Local running MQTT Broker that relays all messages.
- **Device**: Hardware devices in bus communicating with sales client.
