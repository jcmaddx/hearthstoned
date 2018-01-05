'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

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
				<div className="thebox">
					<div className="lid lid-left"></div>
					<div className="lid lid-right"></div>
					<div className="hub">
						<div className="front"></div>
						<div className="back"></div>
					</div>
					<div className="tray"></div>
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
Box.propTypes = {
	
};

export default Box;