var EditBox = Utils.createFactory({
	displayName: 'EditBox',
	
	getInitialState: function() {
		return {value: ''};
	},

	setValue: function(newValue) {
		this.setState({value: newValue});
	},
	
	render: function() {
		return (
			Div({className: "editBox", style: {left: this.props.left, top: this.props.top}},
				Label({style: {color: this.props.color}}, this.props.label + ":"),
				Input({type: "text", name: this.props.name, value: this.state.value, onChange: this._onChange, onBlur: this._onBlur, style: {font: Styles.LABEL_FONT, width: this._computeWidth() }})
			)
		);
	},
	
	_onChange: function(e) {
		this.setState({value: e.target.value});
	},
	
	_onBlur: function(e) {
		this.props.onBlur(e);
	},
	
	_computeWidth: function() {
		var EXTRA_SPACE = 10; // add extra space to compensate for browser behavior
		var MIN_WIDTH = 30;
		
		var textWidth = Utils.getTextWidth(this.state.value, Styles.LABEL_FONT);
			
		return Math.max(MIN_WIDTH, textWidth) + EXTRA_SPACE;
	}	
});
