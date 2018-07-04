# Checkbox

Checkbox component. Outputs either a `<label>` with a hidden `<input>`, or just an `<a>`-tag (based on how you prefer your backend implemented). Is stateless, so dependent on the `onChange` func property to dictate whether it's checked or not.

Uses the BEM naming convention (http://getbem.com/) for class names.

### Author

Thomas Christoffersen

### Dependencies

- `prop-types`
- `classnames`

### Usage

```jsx
<Checkbox
  id="123456"
  text="check me!"
  iconName="checkbox"
  inputName="TrueOrFalse"
  onChange={() => this.handleOnChange()}
/>
```
