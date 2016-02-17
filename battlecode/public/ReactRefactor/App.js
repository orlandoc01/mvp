class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			problem: "Test prob 1",
			code0Text: "code 0",
			code1Text: "code 1",
			id: 0
		}
	}

	render() {

		return (<div>
			<Prompt problem={this.state.problem} />
			<CodingArea content={this.state.code0Text} player={0}/>  
			<CodingArea content={this.state.code1Text} player={1}/>
			<IDTag id={this.state.id} />
			</div>);
	}
}

window.App = App;
ReactDOM.render(<App />, document.getElementById('app'));