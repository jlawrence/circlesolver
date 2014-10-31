var Utils = {
	/*
	 * Returns a function that creates a ReactElement. Use instead of React.createClass.
	 * This method is almost equivalent to calling React.createFactory(React.createClass(param)), except 
	 * that it returns a factory function that allows you to omit the "options" argument 
	 * altogether instead of requiring you to explicitly pass null.
	 *  
	 * @param {Object} obj The object that defines the class.
	 * @returns {function} a factory function
	 */
	createFactory: function(obj) {
		var reactFactory = React.createFactory(React.createClass(obj));
		
		return Utils.convertFactory(reactFactory);
	},
	
	/*
	 * Converts a React factory function into another factory function that allows you to omit the "options" argument 
	 * altogether instead of requiring you to explicitly pass null.
	 * 
	 * @param {function} reactFactory React factory function
	 * @returns {function} a factory function
	 */
	convertFactory: function(reactFactory) {
		return function(maybeOptions) {
			// An options object was explicitly passed.
			if (maybeOptions !== undefined && !React.isValidElement(maybeOptions) && typeof (maybeOptions) !== "string") {
				return reactFactory.apply(null, arguments);
			} else {
				return reactFactory.apply(null, [null].concat(arguments));
			}
		};
	},
	
	/**
	 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
	 * 
	 * @param {String} text The text to be rendered
	 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
	 * 
	 * @see http://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
	 */
	getTextWidth: function(text, font) {
		// re-use canvas object for better performance
		var canvas = Utils.getTextWidth.canvas || (Utils.getTextWidth.canvas = document.createElement("canvas"));
		var context = canvas.getContext("2d");
		context.font = font;
		var metrics = context.measureText(text);
		return metrics.width;
	},
	
	/**
	 * Capitalizes the first letter in a string.
	 * 
	 * @param {String} str
	 * @returns {String}
	 */
	capitalize: function(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
};

// Add all standard element factories in React.DOM to the window to provide a nicer syntax for using standard DOM elements.
Object.keys(React.DOM).forEach(function(key) {
	var windowKey = Utils.capitalize(key);
	
	if (window.hasOwnProperty(windowKey)) {
		windowKey += 'Element';
	}
	
	window[windowKey] = Utils.convertFactory(React.DOM[key]);
});


