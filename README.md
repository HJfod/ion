# Ion
Electron addition that features all the styles and js stuff i use

# How to use
In the head of your HTML file, just call `ion-scripts/ion.js`, which loads all the other files automatically.

#### Example:
```html
<head>
	<script type='text/javascript' src='ion-scripts/ion.js' defer></script>
</head>
```

# Documentation
```html
<app-settings app-name="APP-NAME-HERE" main-color="#COLOR" extra-color="#COLOR" shadow-color="rgba(COLOR)" dark-color="#COLOR" darker-color="#COLOR"></app-settings>
```
Tag that won't be displayed. Overall settings for the app.

+ **app-name** Name for the app.
+ **main-color** Main base color of the app. Sets the background color as well as others.
+ **extra-color** Subsidiary secondary color of the app. Sets the scrollbar hover color as well as others.
+ **shadow-color** Color for the shadow that panels, dropdowns and such have in their edges.
+ **dark-color** A color brighter than the main color.
+ **darker-color** A color brighter than the main color yet darker than `dark-color.`
+ **font** Main font for the app.

```html
<app-titlebar name="NAME-HERE" background-color="#COLOR" text-color="#COLOR" onhomeclick="FUNCTION()"></app-titlebar>
```

The titlebar for the app. Will be replaced with a div containing close, minimize, fullscreen and home buttons on startup.

+ **name** The name that should be written in the titlebar.
+ **background-color** Color of the titlebar.
+ **text-color** Color of the text and buttons in the titlebar.
+ **onhomeclick** Function that should be performed when the home button is clicked. If left out, home button will not appear. `optional`
+ **disable-fs** Disable the fullscreen button. `optional`
+ **disable-mz** Disable the minimize button. `optional`
+ **no-fs** Remove the fullscreen button. `optional`
+ **no-mz** Remove the minimize button. `optional`

```html
<app-main>CONTENTS</app-main>
```

Main app div. This is where all your panels go.

```html
<app-group direction="left-right || top-down" size="SIZEpx" min-size="SIZEpx">CONTENTS</app-group>
```

Groups are containers for panels.

+ **direction** Whether panels inside the group should be placed from left to right or from top to bottom. Acceptable values: `top-down` or `left-right`
+ **size** Size of the group to it's direction. Type px after the value, e.g. `200px` `optional`
+ **min-size** Minimum size of the group, cannot be resized below this value. Type px after the value. `optional`

```html
<app-panel size="SIZEpx" min-size="SIZEpx">CONTENTS</app-panel>
```

Panels are containers for your elements. Basically the divs where content goes!

+ **size** Size of the group to it's direction. Type px after the value, e.g. `200px` `optional`
+ **min-size** Minimum size of the group, cannot be resized below this value. Type px after the value. `optional`

```html
<app-dragger refer="above || below"></app-dragger>
```

Dragger is an element that lets you resize a panel / group that it's next to. Will default to affect the one besides it that has the `size` tag, or the left/above one.

+ **refer** Force whether the dragger should refer to the left/above panel or right/below panel. Acceptable values: `above` or `below` `optional`

```html
<app-tabs tab-height="SIZEpx" destination="LINK-NAME" text-color="#COLOR" selected-text-color="#COLOR" selected-color="#COLOR">TAB-ELEMENTS</app-tabs>
```

Tabs container. Fills the group / panel they're inside. 
+ **tab-height** Height of the tabs. Type px after the value.
+ **destination** What `app-pages` element these tabs should refer to.
+ **text-color** Color of the text inside an unselected tab. `optional`
+ **selected-text-color** Color of the text inside a selected tab. `optional`
+ **selected-color** Color of the background of a selected tab. `optional`


```html
<app-tab name="NAME" link="LINK-NAME" default></app-tab>
```

A tab. Will switch a `app-pages` element to the destinated page. Must be included within a `app-tabs` element.
+ **name** The tab text.
+ **link** What page in the destination defined in the `app-tabs` container this tab should refer to.
+ **default** Toggle whether or not this tab should be the default option when app is loaded. `boolean`

```html
<app-pages from="LINK-NAME">PAGE-ELEMENTS</app-pages>
```

Container for pages toggled by tabs in an `app-tabs` element.
+ **from** Which `app-tabs` element this should be controlled by.

```html
<app-page link="LINK-NAME">CONTENTS</app-page>
```

A page that is toggled by it's linked tab. Must be contained in an `app-pages` element.
+ **link** Which tab should toggle this page.

```html
<app-slider min="NUMBER" max="NUMBER" increment="NUMBER" default="NUMBER" affect="VARIABLE-NAME"></app-slider>
```

A button stylized in the way of the app.
+ **min** Minimum value of the slider.
+ **max** Maximum value of the slider.
+ **increment** What amount a tick of the slider should increment.
+ **default** The default value of the slider.
+ **affect** A global variable which's value is automatically set to the slider's value when the slider is changed. `optional`
+ **value** If you want to get the value of the slider, get this attribute. `read-only`

```html
<app-button onclick="FUNCTION()">TEXT</app-button>
```

A button stylized in the way of the app. Behaves like a normal button.
+ **onclick** The function that should be performed when the button is clicked.

```html
<app-checkbox affect="VARIABLE-NAME" checked>TEXT</app-checkbox>
```

A checkbox stylized in the way of the app. Behaves like a normal checkbox.
+ **affect** A global variable which's value is automatically set to the checkbox's value when the checkbox is checked/unchecked. `optional`
+ **checked** Include if you want to have the checkbox start as checked. If you want to get the current value of the checkbox, get this attribute. `boolean` `optional`

## Other features
```html
<element data-menu="CONTEXT-MENU"></element>
```
Can be added to any element. When element is right-clicked, a contextmenu appears.

```html
<element data-tip="TOOLTIP-TEXT"></element>
```
Can be added to any element. When an element is hovered over, a tooltip appears containing the text passed in as an argument.


### CONTEXT-MENU type argument:

Options are separated with a semicolon `;`.

Option actions are written right after the option text succeeding a `=>`.

Nested option menus are declared inside block brackets `{` and `}`.

Example of a contextmenu:

> Option 1=>Function();Option 2=>Function();Option 3=>{Nested 1=>Function();Nested 2=>Function();Nested 3=>Function()};Option 4=>Function();
