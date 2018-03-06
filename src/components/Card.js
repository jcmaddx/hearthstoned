'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

import '../styles/card.scss';

/**
* Card component
*
* @class Card
* @constructor
*/
class Card extends React.Component {

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
		let cardclasses = classnames({
			"card": true,
			"facedown": (this.props.facedown) ? true : false,
			[this.props.rarity]: (this.props.rarity) ? true : false,
			[this.props.type]: (this.props.type) ? true : false,
			[this.props.category]: (this.props.category) ? true : false
		});
		return(
			<div className={cardclasses}>
				<div className="turn-glow"></div>
				<div className="hover-glow"></div>
				<div className="cardback"></div>
				<div className="cardfront">
					{
						(this.props.rarity === 'legendary') ? 
							<div className="legendary-dragon"></div>
						: null
					}
					<div className="cardart"></div>
					<div className="mana"></div>
					<div className="title"></div>
					<div className="rarity"></div>
					<div className="description"></div>
					<div className="attack"></div>
					<div className="health"></div>
				</div>
			</div>
		);
	}
}

export default Card;