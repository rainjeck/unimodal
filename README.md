# Unimodal

Simple Vanilla Javascript Modal

- Universal
- Simple
- Style what you want
- Hash support

[Demo & Documentation](//rainjeck.github.io/unimodal/)

---

## Get Started

Include css

This is basic styles. You can change what you want and need.

```
<link rel='stylesheet' href='unimodal.css'>
```

 Include JS

 ```
 <script src='unimodal.min.js'>
 ```

---

## Use

HTML:

```
<!--
Important attributes:
  - [data-unimodal] - modal element
  - [data-unimodal-body] - modal body element
  - [data-unimodal-close] - modal close button
-->

<!--- Open Modal Button -->
<a href='#!' data-unimodal-open='simple-modal'>Open Modal</a>

<!--- Modal Markup -->
<div class='unimodal' id='simple-modal' data-unimodal></div>
  <div class='unimodal-body' data-unimodal-body>
    <button type='button' data-unimodal-close>Close</button>
    <!--- Your Content Here -->
  </div>
</div>
```

JavaScript:

```
const modal = new Unimodal({
  scrollWindow: false, /* enable or disable window scroll */
  hash: false, /* hash support */
  onOpen: ( modal, button ) => {
    /* ... do your staff here ... */
  },
  onClose: ( modal ) => {
    /* ... do your staff here ... */
  }
});
```

Public Methods:

```
/* Open Modal */
Unimodal.open('your-modal-id', () => {
  /* ... your callback here ... */
});

/* Close Modal */
Unimodal.close('your-modal-id', () => {
  /* ... your callback here ... */
});

/* Close All Modals */
Unimodal.closeAll();

/* OR */
modal.open('your-modal-id');
modal.close('your-modal-id');
modal.closeAll();
```

```
npm i @babel/core @babel/plugin-proposal-class-properties @babel/plugin-transform-modules-umd @babel/preset-env browser-sync gulp gulp-autoprefixer gulp-babel gulp-clean-css gulp-concat gulp-header-comment gulp-jsmin gulp-load-plugins gulp-notify gulp-pug gulp-rename gulp-sourcemaps gulp-stylus gulp-umd
```
