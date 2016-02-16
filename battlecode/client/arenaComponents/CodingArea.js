class CodingArea extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div className="coding-area">
				<textarea rows='20' className={'play' + this.props.player} id= {'play' + this.props.player + 'Code'}>{this.props.content}</textarea>
				<div className='btn-container'>
					<button className={'submit' + this.props.player}>Submit Code Player {this.props.player}!</button>
				</div>
				<div className={'play' + this.props.player +'result'}>Output for Player 0</div>
			</div>);
	}
}

window.CodingArea = CodingArea;