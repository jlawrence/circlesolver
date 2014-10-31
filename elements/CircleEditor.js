var CircleEditor = Utils.createFactory({
	displayName: 'CircleEditor',
	
	_FORMULAS_FROM_RADIUS: { 
		circumference: function(radius) { return radius * 2 * Math.PI; },
		radius: function(radius) { return radius; },
		diameter: function(radius) { return radius * 2; },
		area: function(radius) { return Math.pow(radius, 2) * Math.PI; }
	},
	
	_FORMULAS_TO_RADIUS: { 
		circumference: function(circumference) { return circumference / 2 / Math.PI; },
		radius: function(radius) { return radius; },
		diameter: function(diameter) { return diameter  / 2; },
		area: function(area) { return Math.sqrt(area / Math.PI); }
	},
		
	getInitialState: function() {
		return {radius: 0, circleLeft: 0, circleTop: 0};
	},
	
	componentDidMount: function() {
		this._adjustToViewPort();
		window.addEventListener('resize', this._adjustToViewPort);
	},
	
	componentWillUnmount: function() {
		window.removeEventListener('resize', this._adjustToViewPort);
	},
	
	render: function() {
		var radius = this.state.radius;
		var circleLeft = this.state.circleLeft;
		var circleTop = this.state.circleTop;
		
		var labelLeft = circleLeft + radius / 2;

		return (
			Div({
					className: "circleEditor",
					ref: "circleEditor"
				},
				CircleDiagram({
					radius: radius,
					left: circleLeft,
					top: circleTop,
					borderWidth: Styles.CIRCLE_BORDER_WIDTH
				}),
				EditBox({
					label: "Circumference",
					name: "circumference",
					ref: "circumference",
					color: Styles.CIRCUMFERENCE_COLOR,
					left: labelLeft,
					top: circleTop - 40,
					onBlur: this._editBoxBlurred
				}),
				EditBox({
					label: "Radius",
					name: "radius",
					ref: "radius",
					color: Styles.RADIUS_COLOR,
					left: labelLeft,
					top: circleTop + radius / 2,
					onBlur: this._editBoxBlurred
				}),
				EditBox({
					label: "Diameter",
					name: "diameter",
					ref: "diameter",
					color: Styles.DIAMETER_COLOR,
					left: labelLeft,
					top: circleTop + radius + 5,
					onBlur: this._editBoxBlurred
				}),
				EditBox({
					label: "Area",
					name: "area", 
					ref: "area", 
					color: Styles.AREA_LABEL_COLOR, 
					left: labelLeft, 
					top: circleTop + radius * 1.5, 
					onBlur: this._editBoxBlurred
				})
			)
		);
	},
	
	_adjustToViewPort: function() {
		var container = this.refs.circleEditor.getDOMNode();
		var PADDING_LEFT = 30;
		var PADDING_TOP = 50;
		var PADDING_BOTTOM = 30;

		var availableWidth = container.offsetWidth - (PADDING_LEFT * 2);
		var availableHeight = container.offsetHeight - (PADDING_TOP + PADDING_BOTTOM);

		var radius = Math.min(availableWidth / 2, availableHeight / 2);

		this.setState({
			radius: radius,
			circleLeft: container.offsetWidth / 2 - radius - Styles.CIRCLE_BORDER_WIDTH,
			circleTop: (PADDING_TOP + availableHeight / 2) - radius - Styles.CIRCLE_BORDER_WIDTH
		});
	},
	
	_editBoxBlurred: function(e) {
		this._updateEditBoxes(e.target.name, parseFloat(e.target.value));
	},
	
	_updateEditBoxes: function(sourceKey, sourceValue) {
		var radius = this._FORMULAS_TO_RADIUS[sourceKey](sourceValue);
		
		Object.keys(this._FORMULAS_FROM_RADIUS).forEach(function(key){
			if (key !== sourceKey) {
				this.refs[key].setValue(this._FORMULAS_FROM_RADIUS[key](radius).toString());
			}
		}, this);
	}
});