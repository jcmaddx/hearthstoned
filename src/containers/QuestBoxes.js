'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';
import QuestBox from '../components/QuestBox';

import '../styles/quests.scss';

/**
* QuestBoxes component
*
* @class QuestBoxes
* @constructor
*/
class QuestBoxes extends React.Component {

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
			<div className="quest-boxes">
				<QuestBox title={"Phone In"} image={"/images/home/pack-reward.png"} description={"Have 5 Phone Screenings"} completion={"4/5"} />
				<QuestBox title={"In-Person"} image={"/images/home/gold-reward.png"} description={"Visit Blizzard 3 Times"} completion={"2/3"} />
				<QuestBox title={"Hired!"} image={"/images/home/card-reward.png"} description={"Get Hired at Blizzard"} completion={"0/1"} />
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
QuestBoxes.propTypes = {
	
};

export default QuestBoxes;