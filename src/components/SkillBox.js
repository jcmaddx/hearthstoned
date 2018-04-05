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
				<h4 className="skill-title">{this.props.title}</h4>
				<p className="skill-level">{this.props.level}</p>
				<img src="/images/home/quest-log-class.png" />
				<img className="skill-image" src={this.props.image} />
				<div className="skill-meter">
					<span className="skill-bar" style={{width: ((parseInt(this.props.level) / 60) * 100) + "%"}}></span>
				</div>
			</div>
		);
	}
}

export default SkillBox;