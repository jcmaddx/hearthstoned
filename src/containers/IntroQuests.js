'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

import Modal from '../components/Modal';
import QuestBoxes from './QuestBoxes';

import '../styles/quests.scss';

/**
* IntroQuests component
*
* @class IntroQuests
* @constructor
*/
class IntroQuests extends React.Component {

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
			<Modal ref="introModal" refId="introQuestDialog" anim="topDown" openSound={this.props.sounds.existingQuestPopup} closeSound={this.props.sounds.newQuestsClose} closeCallback={this.props.closeCallback}>
				<div className="quest-greet">
					<div className="banner-glow"></div>
					<div className="today-banner">
						<h2>Today's Quests</h2>
					</div>
					<QuestBoxes />
					<p>Quests can only be completed with Blizzard employees.</p>
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
IntroQuests.propTypes = {
	
};

export default IntroQuests;