# TextInput

Generic `<input type="">` component (stateful). Has themes based on whether the input type is text, password, etc. Sets `--focus` component state and css class on blur/focus.

Uses the BEM naming convention (http://getbem.com/) for class names.

## Autor:

Thomas Christoffersen

## Dependencies:

- classnames
- prop-types

## Usage

```jsx
<TextInput
  label="Password"
  placeholder="insert password here"
  theme={TextInput.themes.password}
/>
```
