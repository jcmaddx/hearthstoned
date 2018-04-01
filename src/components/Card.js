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

	_handleClick = (e) => {
		let card = e.target.parentNode;
		this.props.callback(this.props.cardKey, card, this.props.rarity, this.props.golden, this.props.listIndex);
	}

	_handleMouse = (e) => {
		e.stopPropagation();
		let out = (e.type === "mouseleave") ? true : false;
		if(this.props.hasOwnProperty('onhover')){
			this.props.onhover(e.target, this.props.rarity, out, this.props.listIndex);
		}
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
			<div onMouseEnter={this._handleMouse} onMouseLeave={this._handleMouse} className={cardclasses} onClick={this._handleClick}>
				<div className="turn-glow"></div>
				<div className="hover-glow"></div>
				<div className="flip-rays"></div>
				<div className="cardback"></div>
				<div className="cardfront">
					<div className="echo"></div>
					<div className="face"></div>
					{
						(this.props.rarity === 'legendary') ? 
							<div className="legendary-dragon"></div>
						: null
					}
					<div className="cardart">
						<img src={"/images/cards/art/"+this.props.art} />
					</div>
					<div className="mana">{this.props.mana}</div>
					<div className="title">
						{
							(this.props.type === "spell") ?
								<svg width="100%" height="100%" viewBox="0 0 640 199" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" xmlSpace="preserve">
									<path id="spell-path" fill="none" d="M58,123.583c37.917-13.75,146.5-41.25,262-41.25s219.25,24.166,259.25,41.25"/>
									<text textAnchor="middle">
										<textPath startOffset="50%" alignmentBaseline="after-edge" xlinkHref="#spell-path">
								      {this.props.title}
								    </textPath>
							    </text>
								</svg>
							:
								<svg width="100%" height="100%" viewBox="0 0 612 144" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" xmlSpace="preserve">
									<path id="minion-path" fill="none" d="M20,124.5c21.5,5.5,34,11.5,83.5,4.5S269,99,318,93s140-11,176.5-5.5s73,18.5,88,28"/>
									<text textAnchor="middle">
										<textPath startOffset="50%" alignmentBaseline="after-edge" xlinkHref="#minion-path">
								      {this.props.title}
								    </textPath>
							    </text>
								</svg>
						}
						
					</div>
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