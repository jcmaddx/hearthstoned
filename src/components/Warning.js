'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

import '../styles/warning.scss';

let hideWarn;

/**
* Warning component
*
* @class Warning
* @constructor
*/
class Warning extends React.Component {

	constructor(props) {
		super(props);
	}

	_openWarning = (content) => {
		this._closeWarning();
		window.clearTimeout(hideWarn);
		window.setTimeout(() => {
			document.getElementById('warning-text').innerHTML = content;
			document.getElementById('warning').classList.add("open");
			createjs.Sound.play("nope");
		}, 100);
		hideWarn = window.setTimeout(() => {
			this._closeWarning();
		}, 3000);
	};

	_closeWarning = () => {
		document.getElementById('warning').classList.remove("open");
	};

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		let warnClasses = classnames({
			"hs-warning": true
		})
		return(
			<div id="warning" ref={this.props.refId} className={warnClasses}>
				<div className="warning-content"><h3 id="warning-text"></h3></div>
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
Warning.propTypes = {
	
};

export default Warning;