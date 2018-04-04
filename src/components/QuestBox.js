'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

import '../styles/quests.scss';

/**
* QuestBox component
*
* @class QuestBox
* @constructor
*/
class QuestBox extends React.Component {

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
			<div className="quest-box">
				<h3>{this.props.title}</h3>
				<img src={this.props.image} />
				<p className="quest-description">{this.props.description}</p>
				<p className="quest-progress">{this.props.completion}</p>
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
QuestBox.propTypes = {
	
};

export default QuestBox;