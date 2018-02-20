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

	_mouseIn = (e) => {
		createjs.Sound.play("hub-hover");	
	};

	_loadNextStep = (manifest) => {
		let hub = document.getElementById("hub");
		hub.classList.remove('active');
	};

	_moveToPacks = () => {
		this._loadNextStep('packFileManifest');
	};

	_moveToCollection = () => {
		this._loadNextStep('collectionFileManifest');
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
				<div onClick={this._moveToPacks} onMouseEnter={this._mouseIn} className="tray-packs">
					<h4>Open<br/>Packs</h4>
					<div className="pack-count">11</div>
				</div>
				<div onClick={this._moveToCollection} onMouseEnter={this._mouseIn} className="tray-collection">
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