'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

import Modal from '../components/Modal';

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
			<Modal ref="introModal" refId="introQuestDialog" anim="topDown" openSound="existing-quests" closeSound="new-quests-close" closeCallback={this.props.closeCallback}>
				<div className="quest-greet">
					<div className="today-banner">
						<h2>Today's Quests</h2>
					</div>
					<div className="quest-boxes">
						<div className="quest-box"></div>
						<div className="quest-box"></div>
						<div className="quest-box"></div>
					</div>
					<p>Something about the Quests. Something Funny?</p>
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