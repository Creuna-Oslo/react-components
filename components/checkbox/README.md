# Checkbox

Stateless checkbox component. Hides the input element and styles either a `<label>` or an `<a>` tag (based on how you prefer your backend implemented). Dependent on the @creuna/lib Icon component.

Uses the BEM naming convention (http://getbem.com/) for class names.

### Author

Thomas Christoffersen

### Dependencies

- `prop-types`
- `classnames`
- `@creuna/lib Icon`

### Usage

```jsx
<Checkbox
  id="123456"
  text="check me!"
  iconName="checkbox"
  inputName="TrueOrFalse"
  theme={Checkbox.themes.big}
  onChange={() => this.handleOnChange()}
/>
```
