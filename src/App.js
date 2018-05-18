import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Plotly from 'plotly';
import './App.css';

// const plot = Plotly().plot;
const Plotly = require('plotly.js/lib/core');

const draw = (el, props) => {
    Plotly.newPlot(el, [
	  {
		name: 'Line 1',
		x: props.line1.map((item, idx) => {
			return idx;
		}),
		y: props.line1,
	  },
	  {
		name: 'Line 2',
		x: props.line2.map((item, idx) => {
			return idx;
		}),
		y: props.line2,
	  },
	  {
		name: 'Line 3',
		x: props.line3.map((item, idx) => {
			return idx;
		}),
		y: props.line3,
	  }
	]);
};

class App extends Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef();
  }
  componentDidMount() {
	draw(this.chart.current, this.props);
  }
  componentDidUpdate() {
	draw(this.chart.current, this.props);
  }
  render() {
    const nextPointDisplay = (nextPoint, id) => {
		return (<div key={id}>Next value for Line {id + 1}: {nextPoint}</div>);
	};

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Moving Timeseries</h1>
        </header>
		<div className="App-body">
			<div>
				{this.props.nextPoints.map(((nextPoint, id) => nextPointDisplay(nextPoint, id)))}
			</div>
			<input type="button" value="line1+" onClick={() => this.props.setNextPoint(0, this.props.nextPoints[0] + 1)}/>
			<input type="button" value="line1-" onClick={() => this.props.setNextPoint(0, this.props.nextPoints[0] - 1)}/>
			<input type="button" value="line2+" onClick={() => this.props.setNextPoint(1, this.props.nextPoints[1] + 1)}/>
			<input type="button" value="line2-" onClick={() => this.props.setNextPoint(1, this.props.nextPoints[1] - 1)}/>
			<input type="button" value="line3+" onClick={() => this.props.setNextPoint(2, this.props.nextPoints[2] + 1)}/>
			<input type="button" value="line3-" onClick={() => this.props.setNextPoint(2, this.props.nextPoints[2] - 1)}/>
			<div ref={this.chart}></div>
		</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
	return state;
};

const mapDispatchToProps = dispatch => {
	return {
	  setNextPoint: (id, value) => {
	    dispatch({
	      type: 'SET_NEXT_POINT',
		  id,
		  value,
		});
	  },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
