'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

import '../styles/button.scss';

/**
* Button component
*
* @class Button
* @constructor
*/
class Button extends React.Component {

	constructor(props) {
		super(props);
	}

	_mouseIn = () => {
		this.props.hover.play();
	};

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		return(
			<div onMouseEnter={this._mouseIn} onClick={this.props.cb} className="button">
				<div className="button-bracket">
					<div className="button-inner">
						{this.props.text}
					</div>
				</div>
			</div>
		);
	}
}

export default Button;