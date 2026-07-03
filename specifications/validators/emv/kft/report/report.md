---
version: 1.1.0
lastUpdated: 2026-06-16
---

# Specification: KFT shift report

Published by the validator in response to a KFT shift report request. Contains the list of EMV Known Fare Transactions (KFT) performed by the validator within the specified operator shift.

- Topic: `validators/emv/kft/report`
- Direction: Publish (Inbound to client)
- JSON Schema: [kft.report.schema.json](./report.schema.json)
- MQTT QoS: 1 (At least once)

## Related

- KFT shift report request: `validators/emv/kft/[deviceId]/report`
- KFT transaction outcome: `validators/emv/kft/outcome`

## Notes on `status`

The `status` field reports the outcome of the report generation itself, independent of the per-transaction `status` values inside `transactions`:

- `success` — the report was generated and the listed transactions are complete.
- `error` — report generation failed. The validator still publishes the message so the requestor receives a response instead of a silent failure; `transactions` may be empty in this case.

## Notes on `tapId`

A `tapId` can only be cross-referenced against the EMV backend once the tap has been synced. Cancelled transactions are removed from the local sending queue and never reach the backend, so their `tapId` cannot be cross-referenced there. A cancelled entry shares the same `tapId` as its originating accepted entry, so the two can be paired within this report.

## Examples

```json
{
  "traceId": "883070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202500011",
  "requestId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "shiftId": "2026-05-20-0001",
  "readerId": "1A002B003C004D005E006F0070008000",
  "status": "success",
  "transactions": [
    {
      "datetime": "2026-05-20T08:10:55.000Z",
      "status": "accepted",
      "tapId": "a1b2c3d4-1111-4aaa-8bbb-ccccdddd0001",
      "cardAid": "A0000000031010",
      "amount": { "value": 150, "currencyCode": 978, "exponent": 2 }
    },
    {
      "datetime": "2026-05-20T08:14:22.000Z",
      "status": "accepted",
      "tapId": "b3e8d7a0-2c41-4e92-8e6a-3e4d6e1f7c11",
      "cardAid": "A0000000031010",
      "amount": { "value": 320, "currencyCode": 978, "exponent": 2 }
    },
    {
      "datetime": "2026-05-20T08:30:48.000Z",
      "status": "accepted",
      "tapId": "c5f9e8b1-3d52-4fa3-9f7b-4f5e7f2a8d22",
      "cardAid": "A0000000041010",
      "amount": { "value": 150, "currencyCode": 978, "exponent": 2 }
    },
    {
      "datetime": "2026-05-20T08:31:05.000Z",
      "status": "cancelled",
      "tapId": "c5f9e8b1-3d52-4fa3-9f7b-4f5e7f2a8d22",
      "cardAid": "A0000000041010",
      "amount": { "value": 150, "currencyCode": 978, "exponent": 2 }
    },
    {
      "datetime": "2026-05-20T08:45:11.000Z",
      "status": "rejected",
      "rejectReason": "denyList",
      "tapId": "d7a1c9f2-4e63-4eb4-8a8c-5a6f8a3b9e33",
      "cardAid": "A0000000031010",
      "amount": { "value": 200, "currencyCode": 978, "exponent": 2 }
    }
  ],
  "eventTimestamp": "2026-05-20T18:00:12.337Z"
}
```

Failed report generation:

```json
{
  "traceId": "991070fe-ef32-11ed-a05b-0242ac120003",
  "deviceId": "flv202500011",
  "requestId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "shiftId": "2026-05-20-0001",
  "readerId": "1A002B003C004D005E006F0070008000",
  "status": "error",
  "transactions": [],
  "eventTimestamp": "2026-05-20T18:00:12.337Z"
}
```
