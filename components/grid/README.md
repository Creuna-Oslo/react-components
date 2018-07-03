# Grid

Generic grid component (stateless). Utilizes the css-grid syntax to create a specified number of columns. Generates rows automatically.

Uses the BEM naming convention (http://getbem.com/) for class names.

## Autor:

Thomas Christoffersen

## Dependencies:

- `classnames`
- `prop-types`

## Usage

```jsx
<Grid numberOfColumns={3}>
  <div>column 1, row 1</div>
  <div>column 2, row 1</div>
  <div>column 3, row 1</div>
  <div>column 1, row 2</div>
  <div>column 2, row 2</div>
  <div>column 3, row 2</div>
</Grid>
```
