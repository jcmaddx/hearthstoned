'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

/**
* SkillBox component
*
* @class SkillBox
* @constructor
*/
class SkillBox extends React.Component {

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
			<div className="skill-box">
				<img src="/images/quest-log-class.png" />
			</div>
		);
	}
}

export default SkillBox;