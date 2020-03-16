# Ion
Electron addition that features all the styles and js stuff i use

# Documentation
```html
<app-settings app-name="APP-NAME-HERE" main-color="#COLOR" shadow-color="rgba(COLOR)" panel-color="#COLOR"></app-settings>
```
Tag that won't be displayed. Overall settings for the app.

	`app-name` Name for the app.
	`main-color` Main color of the app. Sets the background color as well as others.
	`shadow-color` Color for the shadow that panels, dropdowns and such have in their edges.
	`panel-color` The color of the panel borders.

```html
<app-titlebar name="NAME-HERE" background-color="#COLOR" text-color="#COLOR" onhomeclick="FUNCTION()"></app-titlebar>
```

The titlebar for the app. Will be replaced with a div containing close, minimize, fullscreen and home buttons on startup.

	`name` The name that should be written in the titlebar.
	`background-color` Color of the titlebar.
	`text-color` Color of the text and buttons in the titlebar.
	`onhomeclick` Function that should be performed when the home button is clicked.

```html
<app-main></app-main>
```

Main app div. This is where all your panels go.

```html
<app-group direction="left-right || top-down" size="SIZEpx" min-size="SIZEpx"></app-group>
```

Groups are containers for panels.

	`direction` Whether panels inside the group should be placed from left to right or from top to bottom. Acceptable values: **top-down** or **left-right**
	`size` Size of the group to it's direction. Type px after the value, e.g. `200px` > optional
	`min-size` Minimum size of the group, cannot be resized below this value. Type px after the value. > optional

```html
<app-panel size="SIZEpx" min-size="SIZEpx"></app-panel>
```

Panels are containers for your elements. Basically the divs where content goes!

	`size` Size of the group to it's direction. Type px after the value, e.g. `200px` > optional
	`min-size` Minimum size of the group, cannot be resized below this value. Type px after the value. > optional

```html
<app-dragger refer="above || below"></app-dragger>
```

Dragger is an element that lets you resize a panel / group that it's next to. Will default to affect the one besides it that has the `size` tag, or the left/above one.

	`refer` Force whether the dragger should refer to the left/above panel or right/below panel. Acceptable values: **above** or **below** > optional

```html
<app-tabs plus-button="name: __prompt || NAME-HERE; tab-menu: {}; tab-class: CLASS-NAME; tab-id: ID"></app-tabs>
```

***WIP FEATURE*** - Tabs container. Fills the group / panel they're inside. 
	`plus-button` If included, a + button that let's the user add more tabs is available. Specify what clicking the button should do along with adding a tab. Arguments should be separated with a semicolon.
		`name` Name for the new tab. If given the value of `__prompt`, app will prompt the user the enter a name for the tab.
		`tab-menu` The menu that should appear when tab is right-clicked. Requires a `CONTEXT-MENU` value.
		`tab-class` The class the new tab should have.
		`tab-id` The ID the new tab should have.

### Other features
```html
<element data-menu="CONTEXT-MENU"></element>
```
Can be added to any element. When element is right-clicked, a contextmenu appears.

```html
<element data-tip="TOOLTIP-TEXT"></element>
```
Can be added to any element. When an element is hovered over, a tooltip appears containing the text passed in as an argument.


##### CONTEXT-MENU type argument:

Options are separated with a semicolon `;`.

Option actions are written right after the option text succeeding a `=>`.

Nested option menus are declared inside block brackets `{` and `}`.

Example of a contextmenu:

> Option 1=>Function();Option 2=>Function();Option 3=>{Nested 1=>Function();Nested 2=>Function();Nested 3=>Function()};Option 4=>Function();