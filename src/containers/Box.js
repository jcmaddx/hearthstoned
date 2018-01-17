'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

import TheBox from '../components/TheBox';

import '../styles/box.scss';

/**
* Box component
*
* @class Box
* @constructor
*/
class Box extends React.Component {

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
		let boxClasses = classnames({
			"hs-full": true,
			"hs-box": true,
			"hidden": this.props.stage !== 1
		});
		return(
			<div className={boxClasses}>
				<TheBox questCallback={this.props.questCallback}/>
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
Box.propTypes = {
	
};

export default Box;