'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

import BoxButtons from './BoxButtons';

import '../styles/box.scss';

/**
* TheBox component
*
* @class TheBox
* @constructor
*/
class TheBox extends React.Component {

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
			<div className="thebox">
				<div className="lid lid-left"></div>
				<div className="lid lid-right"></div>
				<div id="hub" className="hub">
					<div className="front"></div>
					<div className="back"></div>
				</div>
				<div id="tray" className="tray"></div>
				<BoxButtons />
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
TheBox.propTypes = {
	
};

export default TheBox;