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
				<img className="hs-logo" src="/images/loading/main-logo.png" />
				<img className="blizz-logo" src="/images/loading/blizz-logo.jpg" />
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