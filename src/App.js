import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
  render() {
    const nextPointDisplay = (nextPoint, id) => {
		return (<div key={id}>Next value for Line {id}: {nextPoint}</div>);
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
			<div className="chart"></div>
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
