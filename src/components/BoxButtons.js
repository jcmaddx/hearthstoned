'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

import '../styles/box.scss';

/**
* BoxButtons component
*
* @class BoxButtons
* @constructor
*/
class BoxButtons extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		
	}

	_mouseIn() {
		createjs.Sound.play("quest-hover");	
	};

	_questClick() {
		createjs.Sound.play("small-click");	
		this.props.questCallback();
	};

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		return(
			<div className="buttons">
				<div className="shop-button"></div>
				<div onClick={this._questClick.bind(this)} onMouseEnter={this._mouseIn} className="quest-button">
					<img src="/images/quest-button.png" />
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
BoxButtons.propTypes = {
	
};

export default BoxButtons;