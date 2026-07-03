---
version: 1.0.0
lastUpdated: 2026-05-21
---

# Specification: Request KFT shift report

Request the validator to publish a report of all EMV Known Fare Transactions (KFT) performed within a given operator shift.

The `shiftId` value is dictated by the KFT start message (`operator.shiftId`) — only transactions started under a matching `shiftId` are included in the report.

Upon receiving this request, the validator collects all KFT transactions associated with the provided `shiftId` and publishes the result on the `validators/emv/kft/report` topic.

- Topic: `validators/emv/kft/[deviceId]/report`
- Direction: Consume (Outbound from client)
- JSON Schema: [kft.report.schema.json](./report.schema.json)
- MQTT QoS: 1 (At least once)

## Related

- KFT shift report response: `validators/emv/kft/report`
- Start KFT transaction: `validators/emv/kft/[deviceId]/start`

## Examples

```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "shiftId": "2026-05-20-0001",
  "eventTimestamp": "2026-05-20T18:00:12.000Z"
}
```
