---
version: 1.0.0
lastUpdated: 2025-12-22
---

# Specification: Start KFT transaction

Request the validator to initiate an EMV Known Fare Transaction (KFT) for a specified amount and product selection, then wait for a contactless card tap.

Once started, the validator activates the reader and awaits card presentation within the configured timeout period. Upon tap, it processes the EMV transaction and publishes an outcome message indicating the result.

Prerequisites for the KFT tap are defined in [kft.md](../../kft.md).

- Topic: `validators/emv/kft/[deviceId]/start`
- Direction: Consume (Outbound from client)
- JSON Schema: [kft.start.schema.json](./start.schema.json)
- MQTT QoS: 1 (At least once)

## Possible outcomes

### Request rejected

The request may be immediately rejected when:
- Validation of the request message against the schema fails
- Another request is already being processed by the validator
- EMV-related issues occur (e.g. prolonged transaction or denylist sync failures)

### Request timeout

The request will time out if no card is presented within the specified `tapTimeoutSec` duration.

### Request accepted with EMV result

The outcome is dependent on the EMV card verification logic; the full list of EMV-related results is specified in the [outcome schema](./outcome.schema.json).


## Optional dynamic configuration

- `tapTimeoutSec` (optional): Overrides the default KFT tap timeout configured in the validator.
- `cancelWindowSec` (optional): Overrides the default cancellation window configured in the validator.

If omitted, the validator will apply its static configuration defaults.

## Related

- Abort KFT transaction: `validators/emv/kft/[deviceId]/abort`
- Cancel KFT transaction: `validators/emv/kft/[deviceId]/cancel`
- KFT transaction outcome: `validators/emv/kft/outcome`

## Examples

Start EMV payment transaction for a single ticket

```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "currencyExponent": 2,
  "currencyCode": 578,
  "products": [{
    "qty": 1,
    "category": "adult",
    "type": "singleTicket",
    "price": 25000,
    "vatPercentage": 12.0
  }],
  "productMedium": {
    "type": "card",
    "serial": "0123456789"
  },
  "operator": {
    "countryCode": 578,
    "networkId": "Vestfold",
    "companyId": "VyBuss",
    "userId": "user-123",
    "shiftId": "shift-123"
  },
  "tapTimeoutSec": 30,
  "cancelWindowSec": 600,
  "message": "Place your EMV card below",
  "eventTimestamp": "2025-10-15T10:30:00.337Z"
}
```