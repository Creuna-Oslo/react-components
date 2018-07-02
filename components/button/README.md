# Button

Generic button component (stateless). Tightly coupled with the Creuna lib `Icon`-component. Renders text unless a valid icon name is specified. Also supports two different icons based on button state.

Uses the BEM naming convention (http://getbem.com/) for class names.

## Autor:

Thomas Christoffersen

## Dependencies:

- classnames
- prop-types
- @creuna/lib Icon

## Usage

```
<Button
    text="clikety!"
    iconName="menu"
    iconNameActive="menu--active"
    theme="big"
    isActive={true}
/>
```
