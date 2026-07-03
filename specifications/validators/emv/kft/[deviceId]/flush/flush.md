---
version: 1.0.0
lastUpdated: 2026-02-06
---

# Specification: Flush KFT transactions

Request the validator to flush all EMV payment transactions (KFT) awaiting the cancellation window to elapse. The awaiting transactions will then be immediately sent to the EMV backend. Their cancellation will no longer be possible.

An outcome message will be returned by the validator indicating the operation status.

- Topic: `validators/emv/kft/[deviceId]/flush`
- Direction: Consume (Outbound from client)
- JSON Schema: [kft.flush.schema.json](./flush.schema.json)
- MQTT QoS: 1 (At least once)

## Related

- Start KFT transaction: `validators/emv/kft/[deviceId]/start`
- Cancel KFT transaction: `validators/emv/kft/[deviceId]/cancel`
- KFT transaction outcome: `validators/emv/kft/outcome`

## Examples

```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "eventTimestamp": "2025-10-15T10:35:00.337Z"
}
```