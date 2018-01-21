'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

/**
* Tray component
*
* @class Tray
* @constructor
*/
class Tray extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	_mouseIn(e) {
		createjs.Sound.play("hub-hover");	
	};

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		return(
			<div id="tray" className="tray">
				<div onMouseEnter={this._mouseIn} className="tray-packs">
					<h4>Open<br/>Packs</h4>
					<div className="pack-count">11</div>
				</div>
				<div onMouseEnter={this._mouseIn} className="tray-collection">
					<h4>My Collection</h4>
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
Tray.propTypes = {
	
};

export default Tray;