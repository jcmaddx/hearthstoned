'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import '../styles/loading.scss';

/**
* Loading component
*
* @class Loading
* @constructor
*/
class Loading extends React.Component {

	constructor(props) {
		super(props);
	}

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		let loadClasses = classnames({
			"hs-full": true,
			"hs-load": true,
			"hidden": this.props.stage !== 0
		});
		return(
			<div className={loadClasses}>
				<div className="hs-logo">
					<img src="/images/loading/main-logo.png" />
					<h3>Beta</h3>
				</div>
				<div className="blizz-logo">
					<p>Interactive Resume For:</p>
					<img src="/images/loading/blizz-logo.jpg" />
				</div>
				<div className="loading-frame">
					<img src="/images/loading/loading-frame.png" />
					<div className="loading-container">
						<p id="loading-percent">0%</p>
						<div id="loading-bar"></div>
					</div>
				</div>
			</div>
		);
	}
}

/**
* Props available to pass in and their type
*
* @property propTypes
* @type {Object}
*/
Loading.propTypes = {
	
};

function mapStateToProps(state) {
	let data = state.hsReducer;
  return {
    stage: data.stage
  };
}

export default connect(
  mapStateToProps
)(Loading);