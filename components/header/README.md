# DebounceRender

Simple header component that support a logo, a list of links, social media icons, and a menu button that expands and animates a menu.

Uses the BEM naming convention (http://getbem.com/) for class names.

### Author

Thomas Christoffersen

### Dependencies

- `classnames`
- `prop-types`
- `react-tiny-transition`

### Usage

```jsx
<Header header={
    logo: {
      src: './assets/logo.png',
      alt: 'company logo',
      href: '#take-me-home'
    },
    menuButton: {
      iconUrl: './assets/menu-button.svg',
      activeIconUrl: './assets/menu-button-active.svg',
      text: 'Menu'
    },
    links: [
      { text: 'About', href: '#header-link1' },
      { text: 'Headers', href: '#header-link2' },
      { text: 'Mockup Masterclass', href: '#header-link3' }
    ],
    menu: {
      navigationLinks: [
        {
          heading: 'Who',
          links: [
            { text: 'Navigation', href: '#menu-link-1-1' },
            { text: 'Crowbar', href: '#menu-link-1-2' }
          ]
        },
        {
          heading: 'What',
          links: [
            { text: 'Lobster', href: '#menu-link-2-1' }
          ]
        },
        {
          heading: 'Where',
          links: [
            { text: 'Business', href: '#menu-link-3-1' }
          ]
        }
      ],
      socialMediaLinks: [
        {
          iconUrl: './assets/facebook.svg',
          href: '#facebook'
        },
        {
          iconUrl: './assets/instagram.svg',
          href: '#instagram'
        }
      ]
  }}/>
```
