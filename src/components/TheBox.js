'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

import BoxButtons from './BoxButtons';

import '../styles/box.scss';

/**
* TheBox component
*
* @class TheBox
* @constructor
*/
class TheBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		
	}

	_mouseIn(e) {
		console.log(e.target)
		if(!e.target.classList.contains('disabled')){
			e.target.classList.add('over');
			createjs.Sound.play("hub-hover");	
		}
	};

	_mouseOut(e) {
		if(e.target.classList.contains('over')){
			e.target.classList.remove('over');
		}
	}

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		return(
			<div>
				<div className="thebox">
					<div className="lid lid-left"></div>
					<div className="lid lid-right"></div>
					<div id="hub" className="hub">
						<div className="front">
							<div onMouseEnter={this._mouseIn} onMouseLeave={this._mouseOut} className="btn-hub hub1">
								<h3>Play</h3>
								<img src="/images/btn-hub1.png" />
							</div>
							<div onMouseEnter={this._mouseIn} onMouseLeave={this._mouseOut} className="btn-hub hub2">
								<h3>Solo Adventures</h3>
								<img src="/images/btn-hub2.png" />
							</div>
							<div onMouseEnter={this._mouseIn} onMouseLeave={this._mouseOut} className="btn-hub hub3">
								<h3>The Arena</h3>
								<img src="/images/btn-hub3.png" />
							</div>
							<div onMouseEnter={this._mouseIn} onMouseLeave={this._mouseOut} className="btn-hub hub4 disabled">
								<h3>Tavern Brawl</h3>
								<img src="/images/btn-hub4.png" />
							</div>
						</div>
						<div className="back"></div>
					</div>
					<div id="tray" className="tray"></div>
					<BoxButtons />
				</div>
				<div className="tabletop"></div>
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
TheBox.propTypes = {
	
};

export default TheBox;