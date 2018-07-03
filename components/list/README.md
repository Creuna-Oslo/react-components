# List

Generic list component (stateless). Generates a `<ul>` or `<ol>` with inline or block elements, through component parameters. Children of this component will be wrapped in `<li>` elements.

Uses the BEM naming convention (http://getbem.com/) for class names.

## Autor:

Thomas Christoffersen

## Dependencies:

- `classnames`
- `prop-types`

## Usage

```jsx
<List ordered={true} inline={true}>
  <RandomComponent />
  <RandomComponent />
  <RandomComponent />
</List>
```
