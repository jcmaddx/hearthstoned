'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/hsActions';

import {fadeIn, fadeOut} from '../utils/helpers';

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
		this.props.sounds.hubHover.play();
	};

	_loadNextStep = (manifest, stage, transition) => {
		this.props.sounds.trayClick.play();
		let hub = document.getElementById("hub");
		hub.classList.remove('active');
		this.props.sounds.hubFlip.play();
		// load manifest then change state after completion
		setTimeout(() => {
			let handleComplete = () => {
				fadeOut(this.props.sounds.mainTitle, 3, true);
				this.props.sounds.enterBox.play();
				this.props.actions.setStage(stage);
				this.props.actions.setTransition(transition);
				if(stage === 2) {
					fadeIn(this.props.sounds.betterHand, 3, true);
				} else if (stage === 3) {
					if(this.props.bookOpened){
						fadeIn(this.props.sounds.collectionManager, 3, true);
					} else {
						setTimeout(() => {
							document.getElementById('book-cover').classList.add('open');
							this.props.sounds.bookLatch.play();
							setTimeout(() => {
								this.props.sounds.bookOpen.play();
							}, 300)
						}, 800)
					}
				}
				setTimeout(() => {
					this.props.actions.setTransition(null);
					hub.classList.add('active');
				},200);
			}
			var queue = new createjs.LoadQueue();
			queue.on("complete", handleComplete);
			queue.loadManifest("/data/"+manifest+".json");
		},300)
	};

	_moveToPacks = () => {
		this._loadNextStep('packFileManifest', 2, "open-in");
	};

	_moveToCollection = () => {
		let ownedCount = Object.keys(this.props.cards).filter((card) => {
			return (this.props.cards[card].owned === true)? true : false;
		})
		if(ownedCount.length > 0) {
			this._loadNextStep('collectionFileManifest', 3, "collection-in");
		} else {
			this.props.warn("Try opening some packs first!");
		}
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
					{
						(this.props.count > 0) ? 
						<div className="pack-count">{this.props.count}</div>
						: null
					}
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

function mapStateToProps(state) {
	let data = state.hsReducer;
  return {
    stage: data.stage,
    transition: data.transition,
    count: data.packCount,
    cards: data.cards,
    bookOpened: data.bookOpened
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
)(Tray);