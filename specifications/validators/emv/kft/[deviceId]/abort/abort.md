---
version: 1.0.0
lastUpdated: 2025-12-22
---

# Specification: Abort KFT transaction

Request the validator to abort started EMV payment transaction (KFT) without waiting for the card to be presented.

An outcome message will be returned by the validator indicating the operation status.

- Topic: `validators/emv/kft/[deviceId]/abort`
- Direction: Consume (Outbound from client)
- JSON Schema: [kft.abort.schema.json](./abort.schema.json)
- MQTT QoS: 1 (At least once)

## Related

- Start KFT transaction: `validators/emv/kft/[deviceId]/start`
- Cancel KFT transaction: `validators/emv/kft/[deviceId]/cancel`
- KFT transaction outcome: `validators/emv/kft/outcome`

## Examples

```json
{
  "traceId": "543070fe-ef30-21es-125b-0242ac120009",
  "eventTimestamp": "2025-10-15T10:35:00.337Z"
}
```