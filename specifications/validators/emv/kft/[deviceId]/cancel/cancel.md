---
version: 1.0.0
lastUpdated: 2025-12-22
---

# Specification: Cancel KFT transaction

Request the validator to cancel an already accepted EMV payment transaction (KFT). The transaction reference is returned as the `tapId` identifier present in the KFT transaction outcome message.

An outcome message will be returned by the validator indicating the operation status. The request may be rejected if the `tapId` is incorrect or if the cancellation window has already expired and the transaction has been sent to the EMV backend.

- Topic: `validators/emv/kft/[deviceId]/cancel`
- Direction: Consume (Outbound from client)
- JSON Schema: [kft.cancel.schema.json](./cancel.schema.json)
- MQTT QoS: 1 (At least once)

## Related

- Start KFT transaction: `validators/emv/kft/[deviceId]/start`
- Abort KFT transaction: `validators/emv/kft/[deviceId]/abort`
- KFT transaction outcome: `validators/emv/kft/outcome`

## Examples

```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "tapId": "b3e8d7a0-2c41-4e92-8e6a-3e4d6e1f7c11",
  "eventTimestamp": "2025-10-15T10:35:00.337Z"
}
```