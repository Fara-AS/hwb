# KFT state flow

This diagram shows the internal state transitions of a KFT (Known-Fare-Transaction) flow when a passenger taps their payment card or when a transaction is started, aborted, or canceled. It illustrates how the validator handles EMV KFT transactions and returns to the idle state after completion.

``` mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> AwaitingTap: Start EMV KFT transaction
    AwaitingTap --> Processing: EMV card tapped
    AwaitingTap --> Completed: Timeout
    AwaitingTap --> Completed: Abort started EMV KFT transaction
    Processing --> Completed: EMV KFT outcome
    Completed --> Idle: EMV KFT outcome published
    Idle --> Processing: Cancel accepted EMV KFT transaction
    Idle --> Processing: Flush all awaiting EMV KFT transactions
```

### States Description
- **Idle**: The validator is waiting for the user to start or cancel the transaction.
- **AwaitingTap**: A transaction has started, and the validator is waiting for the passenger to present their EMV card.
- **Processing**: The validator processes the EMV card or Cancel request and determines the transaction outcome.
- **Completed**: The EMV KFT outcome is determined (accepted, rejected, aborted or timeout) and published to the host.
- **Transition back to Idle**: After publishing the outcome, the validator returns to idle, ready for the next transaction.
- **Cancel**: The transaction is being canceled by the driver, which the validator processes before returning to idle.
- **Flush**: All EMV transactions awaiting the cancellation window are immediately sent to the EMV backend, bypassing the remaining wait time.
- **Report**: A read-only query that lists all KFT transactions performed within a shift. It does not affect transaction state and is therefore omitted from the diagram above.

# KFT sequence diagram

This sequence diagram shows the communication between the bus driver, passenger, validator and host over MQTT during a KFT transaction. It covers starting a transaction, card tap, timeout, abort, cancel and also flushing awaiting transactions.

``` mermaid
sequenceDiagram
    actor Passenger
    participant Validator
    participant Host
    actor Driver

    Driver->>Host: Start EMV transaction

    Host->>Validator: [MQTT] validators/emv/kft/[deviceId]/start

    Validator->>Validator: Display payment screen with amount and currency

    opt
    Passenger->>Validator: Present card
    Validator->>Validator: Process tap
    end

    alt Card tapped
        Validator->>Host: [MQTT] validators/emv/kft/outcome (start: accepted/rejected)
    else Timeout
        Validator->>Host: [MQTT] validators/emv/kft/outcome (timeout)
    else Abort requested
        Driver->>Host: Abort started EMV transaction
        Host->>Validator: [MQTT] validators/emv/kft/[deviceId]/abort
        Validator->>Host: [MQTT] validators/emv/kft/outcome (abort: accepted/rejected)
    end

    Validator->>Validator: Display payment outcome

    opt Cancel requested
        Driver->>Host: Cancel accepted EMV transaction
        Host->>Validator: [MQTT] validators/emv/kft/[deviceId]/cancel
        Validator->>Host: [MQTT] validators/emv/kft/outcome (cancel: accepted/rejected)
    end

    opt Transaction flush requested
        Driver->>Host: Finish bus driver shift
        Host->>Validator: [MQTT] validators/emv/kft/[deviceId]/flush
        Validator->>Host: [MQTT] validators/emv/kft/outcome (flush: accepted/rejected)
    end

    opt Shift report requested
        Driver->>Host: Request KFT shift report
        Host->>Validator: [MQTT] validators/emv/kft/[deviceId]/report
        Validator->>Host: [MQTT] validators/emv/kft/report (list of shift transactions)
    end
```

### Sequence Description
- **Driver initiates transaction**: The driver requests the host to start an EMV transaction.
- **Host notifies validator**: The host sends a start command over MQTT to the validator.
- **Passenger presents card**: The passenger taps their EMV card (optional, if a tap occurs).
- **Validator processes tap**: The validator reads the card and determines the EMV outcome.
- **Publish outcome to host**: The validator sends the result to the host via MQTT (accepted/rejected, timeout, abort or flush).
- **Display outcome**: The validator shows the transaction result to the passenger.
- **Cancel request**: The driver can cancel the transaction; the validator publishes the cancellation outcome to the host.
- **Flush request**: The driver can flush all awaiting transactions; the validator immediately sends them to the EMV backend and publishes the outcome to the host.
- **Report request**: The driver can request a shift report; the validator publishes the list of KFT transactions performed within the specified shift to the host.
- **EMV backend sync**: The validator sends the transactions to the EMV backend system, but that process is outside the scope of this diagram.

# Additional information

## Prerequisites

For accurate reporting, the validator should receive up-to-date journey metadata via MQTT prior to initiating an EMV Known-Fare-Transaction (KFT). This metadata allows the backoffice system to associate each transaction with its operational context (e.g., service, route, or stop).

All journey metadata fields are optional. When provided, they enhance the quality and granularity of reports; when omitted, the corresponding contextual information will simply be absent from the backoffice data.

Commonly supported fields include:

- **stopId** – identifies the stop or station where the transaction occurred.
- **serviceId** – identifies the scheduled service on which the validator operates.
- **tripId** – links the transaction to a specific trip or journey instance.
- **blockId** – groups multiple trips operated by the same vehicle or driver shift.

As multiple standards and data sources may exist for publishing journey information, the origin and structure of the journey metadata must be explicitly defined and documented within this specification to ensure consistent data collection and reporting across deployments.