'use strict';

// import the npm modules we need
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classnames from 'classnames';

import * as actions from '../actions/hsActions';

import {randomInt} from '../utils/helpers';

import Loading from './Loading';
import Box from './Box';
import PackOpening from './PackOpening';
import Collection from './Collection';
import IntroQuests from './IntroQuests';
import QuestTracker from './QuestTracker';
import Warning from '../components/Warning';
import Options from '../components/Options';

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
			mainSong: null,
			subSong: null
		}
	}

	componentWillMount() {
		window.addEventListener("mousedown", (e) => {
			document.getElementById('hearthstoned').classList.add('downed');
		})
		window.addEventListener("mouseup", (e) => {
			document.getElementById('hearthstoned').classList.remove('downed');
		})
	}

	componentDidMount() {
		this._startClock();
		this._loadAssets();
	}

	_loadAssets = () => {
		var queue = new createjs.LoadQueue();
		var randomGreet = "/sounds/greeting"+randomInt(0, 15)+".mp3";
		createjs.Sound.alternateExtensions = ["mp3"];
		queue.installPlugin(createjs.Sound);
		queue.on("complete", this._loadingComplete, this);
		queue.loadFile({id:"greeting", src:randomGreet});
		queue.loadManifest("/data/fileManifest.json");
	};

	_loadingComplete = () => {
		this.props.actions.setStage(1);
		this._introSounds();
		this._introQuests();
	}

	_introQuests = () => {
		window.setTimeout(() => {
			this.refs.introQuests.refs.introModal._openModal("introQuestDialog");
		}, 4000);
	}

	_introSounds = () => {
		this.setState({
			mainSong: createjs.Sound.createInstance("main-title"),
			subSong: createjs.Sound.createInstance("better-hand")
		})
		this.state.mainSong.play({loop: -1});
	  createjs.Sound.play("chatter", {loop: -1, volume: 0.5});
	  createjs.Sound.play("greeting");
	};

	_trayDropFlip = () => {
		let tray = document.getElementById("tray");
		let hub = document.getElementById("hub");
		tray.classList.add('dropped');
		createjs.Sound.play("tray-out");
		hub.classList.add('active');
		createjs.Sound.play("hub-flip");
	}

	_questCallback = () => {
		this.refs.questTracker.refs.questTracker._openModal("questTrackerDialog");
	};

	_hoverOptions = () => {
		createjs.Sound.play("hub-hover");
	}

	_openOptions = () => {
		this.refs.options._openOptions();
	}

	_startClock = () => {
	  let today = new Date();
	  let ampm = "am";
	  let hour = today.getHours();
	  let minute = today.getMinutes();
	  if (hour === 12){
	  	ampm = 'pm';
	  } else if (hour > 12) {
	    hour -= 12;
	    ampm = 'pm';
		} else if (hour === 0) {
		  hour = 12;
		}
	  minute = (minute < 10) ? "0" + minute : minute;
	  document.getElementById('clock').innerHTML =
	  hour + ":" + minute + " " + ampm;
	  let timer = setTimeout(() => {
	  	this._startClock();
	  }, 1000);
	}

	_showWarning = (warnText) => {
		let warningText = (typeof warnText === 'string') ? warnText : "This action is unavailabe in this demo!";
		this.refs.warning._openWarning(warningText);
	}

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		let optionsClasses = classnames({
			"options-bar": true,
			"dark": this.props.stage === 2 || this.props.stage === 3
		});
		return(
			<div className="hsapp">
				<Loading />
				{
					(this.props.stage !== 0) ?
						<div>
							<Box mainSong={this.state.mainSong} subSong={this.state.subSong} warn={this._showWarning} questCallback={this._questCallback.bind(this)}/>
							{
								(this.props.stage === 2) ? 
									<PackOpening mainSong={this.state.mainSong} subSong={this.state.subSong} />
								: null
							}
							{
								(this.props.stage === 3) ? 
									<Collection mainSong={this.state.mainSong} subSong={this.state.subSong} />
								: null
							}
							<IntroQuests ref="introQuests" closeCallback={this._trayDropFlip} />
							<QuestTracker ref="questTracker" />
							<Warning ref="warning" />
							<Options ref="options" />
							<div className="tabletop"></div>
						</div>
					: null
				}
				<div className={optionsClasses}>
					<div id="clock"></div>
					<div onClick={this._openOptions} onMouseEnter={this._hoverOptions} id="options-button">
						<img id="options-button" src="/images/options-button.png"></img>
					</div>
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
HSApp.propTypes = {
	
};

function mapStateToProps(state) {
	let data = state.hsReducer;
  return {
    stage: data.stage,
    transition: data.transition
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HSApp);