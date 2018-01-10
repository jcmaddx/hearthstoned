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
		this.state = {};
	}

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		let boxClasses = classnames({
			"hs-full": true,
			"hs-box": true,
			"hidden": this.props.stage !== 1
		});
		return(
			<Modal ref="introModal" refId="introQuestDialog">
				<div className="quest-greet">
					<div className="today-banner">
						<h2>Today's Quests</h2>
						<div className="quest-boxes">
							Three Boxes here!
						</div>
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
IntroQuests.propTypes = {
	
};

export default IntroQuests;