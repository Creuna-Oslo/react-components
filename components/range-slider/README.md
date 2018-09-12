# RangeSlider

Accessible range slider component. Supports setting 'from' and 'to'.

### Author

[Asbjørn Hegdahl](mailto:asbjorn.hegdahl@creuna.no)

### Dependencies

- `prop-types`
- `classnames`
- `@creuna/utils`

### Usage

```jsx
<RangeSlider
  from={{
    label: "Fra",
    name: "range-from",
    value: "10"
  }}
  label="Range select"
  max={30}
  min={0}
  to={{
    label: "Til",
    name: "range-to",
    value: "20"
  }}
/>
```
