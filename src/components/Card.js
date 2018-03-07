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
			"facedown": this.props.facedown,
			"golden": this.props.golden,
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
					<div className="face"></div>
					{
						(this.props.rarity === 'legendary' && !this.props.golden) ? 
							<div className="legendary-dragon"></div>
						: null
					}
					{
						(this.props.rarity === 'legendary' && this.props.golden) ? 
							<div className="golden-legendary-dragon"></div>
						: null
					}
					<div className="cardart">
						<img src={"/images/cards/art/"+this.props.art} />
					</div>
					<div className="mana">{this.props.mana}</div>
					<div className="title">{this.props.title}</div>
					<div className="rarity"></div>
					<div className="description">{this.props.description}</div>
					{
						(this.props.type === "minion") ? 
						<div className="attack">{this.props.attack}</div>
						: null
					}
					{
						(this.props.type === "minion") ? 
						<div className="health">{this.props.health}</div>
						: null
					}
					{
						(this.props.tag) ? 
						<div className="tag">{this.props.tag}</div>
						: null
					}
				</div>
			</div>
		);
	}
}

export default Card;