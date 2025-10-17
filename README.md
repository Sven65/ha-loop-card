# ha-loop-card

Custom Home Assistant card to loop through entities and render a card for each. This card is designed to provide flexibility in styling and configuration, including support for advanced CSS rules such as media queries.

## Features

- Loop through multiple entities and render a card for each.
- Support for custom styles for the parent card and child cards.
- Advanced styling options with the `extra` property for media queries and other CSS rules.

## Installation

1. Download or clone this repository.
2. Copy the `ha-loop-card` folder to your Home Assistant `www` directory.
3. Add the following to your `ui-lovelace.yaml` or the Raw Configuration Editor:

```yaml
resources:
  - url: /local/ha-loop-card/loop-card.js
    type: module
```

## Configuration

### Basic Configuration

```yaml
- type: custom:loop-card
  entities:
    - entity: sensor.battery_1
    - entity: sensor.battery_2
  card:
    type: custom:some-card
```

### Advanced Configuration with Styles

```yaml
- type: custom:loop-card
  entities:
    - entity: sensor.battery_1
    - entity: sensor.battery_2
  card:
    type: custom:some-card
  styles:
    card:
      - padding: "8px"
      - background-color: "white"
    children:
      - margin: "6px"
      - width: "calc(33% - 12px)"
    extra: |
      @media (max-width: 600px) {
        ha-card {
          padding: 4px;
        }
        ha-card > * {
          width: 100%;
          margin: 0;
        }
      }
```

### Options

#### `entities`

- **Type**: `array`
- **Description**: List of entities to loop through.
- **Required**: Yes

#### `card`

- **Type**: `object`
- **Description**: The card configuration to render for each entity.
- **Required**: Yes

#### `styles`

- **Type**: `object`
- **Description**: Custom styles for the parent card and child cards.
- **Required**: No

##### `card`

- **Type**: `array`
- **Description**: List of CSS key-value pairs for the parent card.

##### `children`

- **Type**: `array`
- **Description**: List of CSS key-value pairs for the child cards.

##### `extra`

- **Type**: `string`
- **Description**: Additional CSS rules, such as media queries.

## Example

```yaml
- type: custom:loop-card
  entities:
    - entity: sensor.battery_1
    - entity: sensor.battery_2
  card:
    type: custom:some-card
  styles:
    card:
      - padding: "8px"
      - background-color: "white"
    children:
      - margin: "6px"
      - width: "calc(33% - 12px)"
    extra: |
      @media (max-width: 600px) {
        ha-card {
          padding: 4px;
        }
        ha-card > * {
          width: 100%;
          margin: 0;
        }
      }
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
