'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';
import Button from './Button';

import '../styles/options.scss';

let hideWarn;

/**
* Options component
*
* @class Options
* @constructor
*/
class Options extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		document.onkeydown = this._handleEscape;
	};

	_handleEscape = (event) => {
		event = event || window.event;
    let isEscape = false;
    if ("key" in event) {
        isEscape = (event.key === "Escape" || event.key === "Esc");
    } else {
        isEscape = (event.keyCode === 27);
    }
    if (isEscape) {
      this._openOptions();
    }
	}

	_openOptions = (content) => {
		let options = document.getElementById('options');
		if(options.classList.contains('open')){
			this._closeOptions();
		} else {
			options.classList.add("open");
			this.props.sounds.smallClick.play();
		}
	};

	_closeOptions = () => {
		document.getElementById('options').classList.remove("open");
		this.props.sounds.smallClick.play();
	};

	_quit = () => {
		window.location = "/resume/blizzard";
	};

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		let warnClasses = classnames({
			"hs-options": true
		})
		return(
			<div id="options" ref={this.props.refId} className={warnClasses}>
				<h4 className="title">Game Menu</h4>
				<div className="options-content">
					<Button hover={this.props.sounds.hubHover} cb={this._closeOptions} text="Back To Game" />
					<Button hover={this.props.sounds.hubHover} cb={this._quit} text="Quit" />
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
Options.propTypes = {
	
};

export default Options;