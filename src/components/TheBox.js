'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

import BoxButtons from './BoxButtons';
import Tray from './Tray';
import ToolTip from './ToolTip';

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
	}

	_mouseIn = (e) => {
		if(!e.target.classList.contains('disabled')){
			e.target.classList.add('over');
			createjs.Sound.play("hub-hover");	
		}
	};

	_mouseOut = (e) => {
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
							<ToolTip tipId="hub1" title="Play" location="center-right" content="Play against an opponent of equal skill.">
								<div onClick={this.props.warn} onMouseEnter={this._mouseIn} onMouseLeave={this._mouseOut} className="btn-hub hub1">
									<h3>Play</h3>
									<img src="/images/btn-hub1.png" />
								</div>
							</ToolTip>
							<ToolTip tipId="hub2" title="Solo Adventures" location="center-right" content="Embark on adventures or practice against the AI.">
								<div onClick={this.props.warn} onMouseEnter={this._mouseIn} onMouseLeave={this._mouseOut} className="btn-hub hub2">
									<h3>Solo Adventures</h3>
									<img src="/images/btn-hub2.png" />
								</div>
							</ToolTip>
							<ToolTip tipId="hub3" title="The Arena" location="center-right" content="Forge a deck quickly from random cards.">
								<div onClick={this.props.warn} onMouseEnter={this._mouseIn} onMouseLeave={this._mouseOut} className="btn-hub hub3">
									<h3>The Arena</h3>
									<img src="/images/btn-hub3.png" />
								</div>
							</ToolTip>
								<div onMouseEnter={this._mouseIn} onMouseLeave={this._mouseOut} className="btn-hub hub4 disabled">
									<h3>Tavern Brawl</h3>
									<img src="/images/btn-hub4.png" />
								</div>
						</div>
						<div className="back"></div>
					</div>
					<Tray />
					<BoxButtons questCallback={this.props.questCallback} />
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