'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

import '../styles/tooltip.scss';

/**
* ToolTip component
*
* @class ToolTip
* @constructor
*/
class ToolTip extends React.Component {

	constructor(props) {
		super(props);
	}

	_onEnter = (e) => {
		document.getElementById(this.props.tipId).classList.add('show');
	}

	_onExit = (e) => {
		document.getElementById(this.props.tipId).classList.remove('show');
	}

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		return(
			<div onMouseEnter={this._onEnter} onMouseLeave={this._onExit} className="tooltip-container">
				{this.props.children}
				<div id={this.props.tipId} className="tooltip">
					<h5>{this.props.title}</h5>
					<p>{this.props.content}</p>
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
ToolTip.propTypes = {
	
};

export default ToolTip;