# Button

Generic button component (stateless). Renders text unless a valid icon name is specified. Also supports two different icons based on button state.

Uses the BEM naming convention (http://getbem.com/) for class names.

## Autor:

Thomas Christoffersen

## Dependencies:

- `classnames`
- `prop-types`
- [Icon component](../Icon)

## Usage

```jsx
<Button
  text="clikety!"
  iconName="menu"
  iconNameActive="menu--active"
  theme="big"
  onClick={() => this.handleOnClick()}
  isActive={true}
/>
```
