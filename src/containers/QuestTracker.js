'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

import Modal from '../components/Modal';
import SkillBox from '../components/SkillBox';
import QuestBoxes from './QuestBoxes';

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
	}

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		return(
			<Modal ref="questTracker" refId="questTrackerDialog" anim="bounceIn" openSound={this.props.sounds.questLogOpen} closeSound={this.props.sounds.questLogClose}>
				<div className="quest-log">
					<h2>Quest Log</h2>
					<div className="hero-skills">
						<h3>Skill Levels</h3>
						<SkillBox />
						<SkillBox />
						<SkillBox />
						<SkillBox />
						<SkillBox />
						<SkillBox />
						<SkillBox />
						<SkillBox />
						<SkillBox />
					</div>
					<div className="total-level">
						<h3>Total Level: <span>180</span></h3>
					</div>
					<QuestBoxes />
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