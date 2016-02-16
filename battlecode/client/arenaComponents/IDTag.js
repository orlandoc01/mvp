class IDTag extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div className="playName">{this.props.id}</div>);
	}
}



window.IDTag = IDTag;