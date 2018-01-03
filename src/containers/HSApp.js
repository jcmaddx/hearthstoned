'use strict';

// import the npm modules we need
import React from 'react';
import reqwest from 'reqwest';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
* HSApp component
*
* @class HSApp
* @constructor
*/
class HSApp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		
	}

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		return(
			<div className="hsapp">
				Hearthstone!
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
HSApp.propTypes = {
	
};

export default HSApp;