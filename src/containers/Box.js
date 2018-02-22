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
	}

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		console.log("box-info", this.props.stage, this.props.transition);
		let boxClasses = classnames({
			"hs-full": true,
			"hs-box": true,
			"hidden": this.props.stage !== 1 && !this.props.transition,
			[this.props.transition]: this.props.transition
		});
		return(
			<div className={boxClasses}>
				<TheBox warn={this.props.warn} stater={this.props.stater} questCallback={this.props.questCallback}/>
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