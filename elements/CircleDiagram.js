var CircleDiagram = Utils.createFactory({
	displayName: 'CircleDiagram',
	
	componentDidMount: function() {
		this._updateCanvas();
	},
	
	componentDidUpdate: function() {
		this._updateCanvas();
	},
	
	render: function() {
		var radius = this.props.radius;

		return (
			Div({className: "circleDiagram", style: this._computeCircleStyle()},
				Canvas({width: radius * 2, height: radius * 2, ref: "canvas"})
			)
		);
	},
	
	_computeCircleStyle: function() {
		return {
			width: this.props.radius * 2,
			height: this.props.radius * 2,
			left: this.props.left,
			top: this.props.top,
			borderRadius: "50% 50%",
			borderWidth: this.props.borderWidth,
			borderColor: Styles.CIRCUMFERENCE_COLOR,
			backgroundColor: Styles.AREA_COLOR
		};
	},
	
	_updateCanvas: function() {
		var canvas = this.refs.canvas.getDOMNode();
		var context = canvas.getContext("2d");
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.lineWidth = 2;

		this._drawRadius(context);
		this._drawDiameter(context);
	},
	
	/*
	 * Draws the radius at a 45 degree angle.
	 */
	_drawRadius: function(context) {
		context.save();

		var radius = this.props.radius;
		var offset = radius / Math.SQRT2;

		context.strokeStyle = Styles.RADIUS_COLOR;
		context.beginPath();
		context.moveTo(radius, radius);
		context.lineTo(radius + offset, radius - offset);
		context.stroke();

		context.restore();
	},
	
	_drawDiameter: function(context) {
		context.save();

		var radius = this.props.radius;

		context.strokeStyle = Styles.DIAMETER_COLOR;
		context.beginPath();
		context.moveTo(0, radius);
		context.lineTo(radius * 2, radius);
		context.stroke();

		context.restore();
	}
});