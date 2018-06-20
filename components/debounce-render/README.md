# DebounceRender

DebounceRender is useful for limiting fast, successive render calls, like in a state based animation.

### Author

[Asbjørn Hegdahl](mailto:asbjorn.hegdahl@creuna.no)

### Dependencies

- `prop-types`

### Usage

```jsx
<ComponentWithLotsOfUpdates>
  <DebounceRender wait={20}>
    <ExpensiveRenderMethodComponent />
  </DebounceRender>
</ComponentWithLotsOfUpdates>
```
