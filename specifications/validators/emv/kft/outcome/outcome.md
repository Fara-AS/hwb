---
version: 1.0.0
lastUpdated: 2025-12-22
---

# Specification: KFT transaction outcome

Published by the validator once EMV card tap for Known Fare Transaction (KFT) is completed, whether accepted or rejected.
This outcome message is a common one shared for start/abort/cancel KFT message types.
Journey metadata must be provided to the validator via the dedicated MQTT topic to enable the creation of detailed reports in the backoffice.

- Topic: `validators/emv/kft/outcome`
- Direction: Publish (Inbound to client)
- JSON Schema: [kft.outcome.schema.json](./outcome.schema.json)
- MQTT QoS: 1 (At least once)
- MQTT Retained: true

## Related

- Start KFT transaction: `validators/emv/kft/[deviceId]/start`
- Abort KFT transaction: `validators/emv/kft/[deviceId]/abort`
- Cancel KFT transaction: `validators/emv/kft/[deviceId]/cancel`

## Examples

### Payment transaction outcome

Tap accepted
```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202500011",
  "requestId": "c28f206d-8016-4d22-b21b-70d8d6d2fea4",
  "requestType": "start",
  "status": "accepted",
  "result": {
    "rejectReason": "none",
    "tapId": "b3e8d7a0-2c41-4e92-8e6a-3e4d6e1f7c11",
    "cardAid": "A0000000031010",
    "cardAtc": 101,
    "maskedPan": "123456******1234"
  },
  "eventTimestamp": "2025-10-15T10:30:00.337Z"
}
```

Tap rejected (card on denylist)
```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202500011",
  "requestId": "c28f206d-8016-4d22-b21b-70d8d6d2fea4",
  "requestType": "start",
  "status": "rejected",
  "result": {
    "rejectReason": "denyList",
    "tapId": "b3e8d7a0-2c41-4e92-8e6a-3e4d6e1f7c11",
    "cardAid": "A0000000031010",
    "cardAtc": 101,
    "maskedPan": "123456******5678"
  },
  "eventTimestamp": "2025-10-15T10:30:00.337Z"
}
```

Tap rejected (card expired)
```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202500011",
  "requestId": "c28f206d-8016-4d22-b21b-70d8d6d2fea4",
  "requestType": "start",
  "status": "rejected",
  "result": {
    "rejectReason": "expired",
    "tapId": "b3e8d7a0-2c41-4e92-8e6a-3e4d6e1f7c11",
    "cardAid": "A0000000031010",
    "cardAtc": 101,
    "maskedPan": "567890******9012"
  },
  "eventTimestamp": "2025-10-15T10:30:00.337Z"
}
```

Tap timeout (card not presented)
```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202500011",
  "requestId": "c28f206d-8016-4d22-b21b-70d8d6d2fea4",
  "requestType": "start",
  "status": "timeout",
  "eventTimestamp": "2025-10-15T10:30:00.337Z"
}
```

### Abort transaction outcome

Abort accepted
```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202500011",
  "requestId": "f52f206d-8016-4d22-b21b-70d8d6d2fea4",
  "requestType": "abort",
  "status": "accepted",
  "eventTimestamp": "2025-10-15T10:30:00.337Z"
}
```

Abort rejected
```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202500011",
  "requestId": "f52f206d-8016-4d22-b21b-70d8d6d2fea4",
  "requestType": "abort",
  "status": "rejected",
  "eventTimestamp": "2025-10-15T10:30:00.337Z"
}
```

### Cancel transaction outcome

Cancel accepted
```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202500011",
  "requestId": "f52f206d-8016-4d22-b21b-70d8d6d2fea4",
  "requestType": "cancel",
  "status": "accepted",
  "eventTimestamp": "2025-10-15T10:30:00.337Z"
}
```

Cancel rejected
```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202500011",
  "requestId": "f52f206d-8016-4d22-b21b-70d8d6d2fea4",
  "requestType": "cancel",
  "status": "rejected",
  "eventTimestamp": "2025-10-15T10:30:00.337Z"
}
```

### Flush transactions outcome

Flush accepted
```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202500011",
  "requestId": "f52f206d-8016-4d22-b21b-70d8d6d2fea4",
  "requestType": "flush",
  "status": "accepted",
  "eventTimestamp": "2025-10-15T10:30:00.337Z"
}
```

Flush rejected
```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202500011",
  "requestId": "f52f206d-8016-4d22-b21b-70d8d6d2fea4",
  "requestType": "flush",
  "status": "rejected",
  "eventTimestamp": "2025-10-15T10:30:00.337Z"
}
```