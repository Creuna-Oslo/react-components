# StaticContainer

Use this if you are using state-driven animation on components that have children with expensive render methods. With this small component it's easy too prevent re-renders of children while an animation is running. See demo for usage.

### author:

[Asbjørn Hegdahl](mailto:asbjorn.hegdahl@creuna.no)

### dependencies:

- `prop-types`

### usage:

```javascript
<StaticContainer shouldUpdate={!this.state.isAnimating}>
  <ChildComponent />
</StaticContainer>
```
