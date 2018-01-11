'use strict';

// import the npm modules we need
import React from 'react';
import reqwest from 'reqwest';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {randomInt} from '../utils/helpers';

import Loading from './Loading';
import Box from './Box';
import IntroQuests from './IntroQuests';

/**
* HSApp component
*
* @class HSApp
* @constructor
*/
class HSApp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			stage: 0
		};
	}

	componentWillMount() {
		window.addEventListener("mousedown", (e) => {
			document.getElementById('hearthstoned').classList.add('downed');
		})
		window.addEventListener("mouseup", (e) => {
			document.getElementById('hearthstoned').classList.remove('downed');
		})
		this._loadAssets();
	}

	_loadAssets() {
		var queue = new createjs.LoadQueue();
		var randomGreet = "/sounds/greeting"+randomInt(0, 15)+".mp3";
		createjs.Sound.alternateExtensions = ["mp3"];
		queue.installPlugin(createjs.Sound);
		queue.on("complete", this._loadingComplete, this);
		queue.loadFile({id:"greeting", src:randomGreet});
		queue.loadManifest("/data/fileManifest.json");
	};

	_loadingComplete() {
		this.setState({
			stage: 1
		});
		this._introSounds();
		this._introQuests();
	}

	_introQuests() {
		window.setTimeout(() => {
			this.refs.introQuests.refs.introModal._openModal("introQuestDialog");
		}, 4000);
	}

	_introSounds() {
		createjs.Sound.play("main-title", {loop: -1});
	  createjs.Sound.play("chatter", {loop: -1});
	  createjs.Sound.play("greeting");
	};

	_trayDropFlip(){
		let tray = document.getElementById("tray");
		let hub = document.getElementById("hub");
		tray.classList.add('dropped');
		createjs.Sound.play("tray-out");
		hub.classList.add('active');
		createjs.Sound.play("hub-flip");
	}

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		return(
			<div className="hsapp">
				<Loading stage={this.state.stage}/>
				{
					(this.state.stage !== 0) ?
						<div>
							<Box stage={this.state.stage}/>
							<IntroQuests ref="introQuests" closeCallback={this._trayDropFlip} />
						</div>
					: null
				}
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
HSApp.propTypes = {
	
};

export default HSApp;