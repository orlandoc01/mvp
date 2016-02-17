class Prompt extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div className='header'>
			<h1>BattleCode</h1>
		<div className = 'prompt'>{this.props.problem}</div>
		</div>);
	}
}


window.Prompt = Prompt