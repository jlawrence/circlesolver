# Circle Solver #

## Summary ##

An interactive tool to compute various properties of circles, such as circumference and area. Useful for demonstrating the React.js library.

## Details ##

This application is designed to demonstrate a usage of the React.js library. It is sufficiently complex to demonstrate non-trivial use cases, but simple enough to be easy to follow. For this project I didn't use JSX, but I didn't want the JavaScript to be ugly, so I wrote a few simple utility functions in Utils.js to allow elegant syntax in pure JavaScript. Example:

JSX
```
<div id="content">
	<Logo/>
	<small className="instructions">Type a value in any blank and then click outside to update calculations.</small>
	<CircleEditor/>
</div>

```

Compiled JSX
```
React.createElement("div", {id: "content"}, 
	React.createElement(Logo, null), 
	React.createElement("small", {className: "instructions"}, "Type a value in any blank and then click outside to update calculations."), 
	React.createElement(CircleEditor, null)
);
```

Syntax Used in This Project
```
Div({id: "content"},
	Logo(),
	Small({className: "instructions"}, "Type a value in any blank and then click outside to update calculations."),
	CircleEditor()
)
```

This application automatically scales to fit the window size and works on mobile devices.

## Usage ##

Type a value in any blank and then click outside to update calculations. Resize the window to adjust the size of the circle.

## License ##

Public Domain except for third-party libraries