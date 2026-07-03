---
version: 1.0.0
lastUpdated: 2025-12-22
---

# Specification: PAYG card tap

Published by the validator once EMV card tap for Pay-As-You-Go (PAYG) transaction is completed, whether accepted or rejected.

Prerequsites for the KFT tap defined in [payg.md](../../payg.md)

- Topic: `validators/emv/payg/tap`
- Direction: Publish (Inbound to client)
- JSON Schema: [payg.tap.schema.json](./tap.schema.json)
- MQTT QoS: 1 (At least once)

## Examples

Tap success
```json
{
  "traceId": "543070fe-ef30-21es-125b-0242ac120009",
  "deviceId": "flv202500011",
  "status": "accepted",
  "result": {
    "rejectReason": "none",
    "tapId": "b3e8d7a0-2c41-4e92-8e6a-3e4d6e1f7c11",
    "cardAid": "A0000000031010",
    "cardAtc": 101,
    "maskedPan": "123456******1234"
  },
  "eventTimestamp": "2025-10-16T10:15:06.122Z"
}
```

Tap rejected (card on denylist)
```json
{
  "traceId": "543070fe-ef30-21es-125b-0242ac120009",
  "deviceId": "flv202500011",
  "status": "rejected",
  "result": {
    "rejectReason": "denyList",
    "tapId": "b3e8d7a0-2c41-4e92-8e6a-3e4d6e1f7c11",
    "cardAid": "A0000000031010",
    "cardAtc": 101,
    "maskedPan": "123456******5678"
  },
  "eventTimestamp": "2025-10-16T10:15:06.122Z"
}
```
