# Mini-Value-Card

A minimalistic card for [Home Assistant](https://github.com/home-assistant/home-assistant) Lovelace UI. The design fits to the [kalkih@mini-graph-card](https://github.com/kalkih/mini-graph-card).

The card works with most entities like **input_number**, **sensor** and **binary_sensor** and displays the sensors current state as well as a optional information about the last change.

## Information
This card was only tested in a Lovelace UI ioBroker environment.


## Options

### Card options
| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| type ***(required)*** | string |  | v0.0.1 | `custom:mini-value-card`.
| entity ***(required)*** | string |  | v0.0.1 | a single entity.
| title | string |  | v0.0.1 | Set a custom title which is displayed beside the icon.
| icon | string |  | v0.0.1 | Set a custom icon from any of the available mdi icons.
| state_map | [state map object](#state-map-object) |  | v0.0.1 | List of entity states to convert (order matters as position becomes a value on the graph).
| showChanged | boolean | true | v0.0.1 | show change date and time.
| fontSize | integer | 24 | v0.0.1 | font size of the display value.


### Entities object

| Name | Type | Default | Description |
|------|:----:|:-------:|-------------|
| entity ***(required)*** | string |  | Entity id of the sensor.


### State map object
| Name | Type | Default | Description |
|------|:----:|:-------:|-------------|
| value ***(required)*** | string |  | Value to convert.
| label | string | same as value | String to show as label (if the value is not precise).

## Example usage

### card with all options
```yaml
type: 'custom:mini-value-card'
entity: binary_sensor.door
title: DOOR
icon: 'mdi:door'
fontSize: 15
showChanged: true
state_map:
  - value: 'off'
    label: closed
  - value: 'on'
    label: open
```

![door](https://user-images.githubusercontent.com/22733082/99452161-7c3e8b80-2923-11eb-987a-0245557eb143.png)

### minimal card
```yaml
type: 'custom:mini-value-card'
entity: input_number.volume
title: VOLUME
icon: 'mdi:music'
fontSize: 30
showChanged: false
```

![volume](https://user-images.githubusercontent.com/22733082/99452207-8d879800-2923-11eb-8892-003fc868c7a6.png)

## License

This project is under the MIT license.
