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
						<SkillBox title="HTML 5" level="60" image="/images/home/skill-html5.jpg"/>
						<SkillBox title="CSS 3" level="60" image="/images/home/skill-css3.jpg"/>
						<SkillBox title="JavaScript" level="48" image="/images/home/skill-js.jpg"/>
						<SkillBox title="React" level="35" image="/images/home/skill-react.jpg"/>
						<SkillBox title="npm" level="40" image="/images/home/skill-npm.jpg"/>
						<SkillBox title="Photoshop" level="44" image="/images/home/skill-ps.jpg"/>
						<SkillBox title="Github" level="33" image="/images/home/skill-github.jpg"/>
						<SkillBox title="Redux" level="25" image="/images/home/skill-redux.jpg"/>
						<SkillBox title="php" level="14" image="/images/home/skill-php.jpg"/>
					</div>
					<div className="total-level">
						<h3>Total Level: <span>359</span></h3>
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