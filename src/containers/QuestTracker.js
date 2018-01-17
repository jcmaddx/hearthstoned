'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

import Modal from '../components/Modal';

import '../styles/quests.scss';

/**
* QuestTracker component
*
* @class QuestTracker
* @constructor
*/
class QuestTracker extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		return(
			<Modal ref="questTracker" refId="questTrackerDialog" anim="bounceIn" openSound="quest-log-open" closeSound="quest-log-close">
				<div className="quest-greet">
					<div className="today-banner">
						<h2>Quest Log</h2>
					</div>
					<div className="hero-skills">
						<div className="skill-box"></div>
						<div className="skill-box"></div>
						<div className="skill-box"></div>
						<div className="skill-box"></div>
						<div className="skill-box"></div>
						<div className="skill-box"></div>
						<div className="skill-box"></div>
						<div className="skill-box"></div>
						<div className="skill-box"></div>
					</div>
					<div className="quest-boxes">
						<div className="quest-box"></div>
						<div className="quest-box"></div>
						<div className="quest-box"></div>
					</div>
				</div>
			</Modal>
		);
	}
}

/**
* Props available to pass in and their type
*
* @property propTypes
* @type {Object}
*/
QuestTracker.propTypes = {
	
};

export default QuestTracker;