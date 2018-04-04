'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/hsActions';

import '../styles/collection.scss';

import Card from '../components/Card';

let categories = ["druid", "hunter", "mage", "paladin", "priest", "rogue", "shaman", "warlock", "warrior", "neutral"]

/**
* Collection component
*
* @class Collection
* @constructor
*/
class Collection extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			pages: {}
		}
	}

	componentDidMount() {
		let pages = {}, filtered;
		categories.map((item, key) => {
			filtered = this._cardFilterSort(item);
			pages[item] = filtered;
		});
		this.setState({pages: pages});
	};

	_cardFilterSort = (category) => {
		let filtered = Object.keys(this.props.cards).filter((card) => {
			let currentCard = this.props.cards[card];
			if(currentCard.category === category && currentCard.owned === true){
				return true;
			} else {
				return false;
			}
		}).sort((a,b) => {
			let manaA = parseInt(this.props.cards[a].mana);
			let manaB = parseInt(this.props.cards[b].mana);
			if (manaA < manaB)
		    return -1;
		  if (manaA > manaB)
		    return 1;
		  return 0;
		});
		return filtered;
	}

	_cardHover = () => {

	};

	_cardClick = () => {

	};

	_buildPage = (category, items, pageNum) => {
		let pageContent = (
			<div key={Math.random()} className="page">
				{
					(pageNum !== 1)? 
						<div className="page-nav-back"></div>
					:null
				}
				<h2 className="page-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
				<div className="page-cards">
					{
						items.map((item, key) => {
							let current = this.props.cards[item];
							let extension = (current.hasOwnProperty("golden")) ? ".gif" : ".jpg";
							let artwork = item + extension;
							return <Card key={key}
								cardKey={item}
								listIndex={key}
								facedown={false} 
								callback={this._cardClick}
								onhover={this._cardHover}
								art={artwork} 
								title={current.title} 
								mana={current.mana} 
								health={current.health} 
								attack={current.attack} 
								rarity={current.rarity}
								golden={current.hasOwnProperty("golden")} 
								type={current.type} 
								category={current.category} 
								tag={current.tag} 
								description={current.description} />
						})
					}
				</div>
				<p>{"Page "+pageNum}</p>
				{
					(pageNum !== document.querySelectorAll('.page').length)? 
						<div className="page-nav-forward"></div>
					:null
				}
			</div>
		);
		return pageContent
	}

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		let collectionClasses = classnames({
			"hs-full": true,
			"hs-collection": true,
			"hidden": this.props.stage !== 3 && this.props.transition !== "collection-in" && this.props.transition !== "collection-out",
			[this.props.transition]: this.props.transition
		});
		return(
			<div className={collectionClasses}>
				<div id="collection-container" className="collection-container">
					<div id="collection-content" className="collection-content">
						<div className="pages">
							<div className="class-tabs"></div>
							{
								(Object.keys(this.state.pages).length > 0) ? 
									Object.keys(this.state.pages).map((item, key) => {
										let currentCategory = this.state.pages[item]
										let pages = [], i;
										if(currentCategory.length <= 8){
											pages.push(this._buildPage(item, currentCategory, key+1));
										} else {
											for (i=0; i < currentCategory.length; i+=8) {
											  pages.push(this._buildPage(item, currentCategory.slice(i,i+8), key+1+(i/8)));
											}
										}
										return pages;
									})
								: null
							}
							<div className="search-bar">
							</div>
						</div>
						<div className="deck-tray">

						</div>
						<div id="book-cover" className="book-cover">
							<div className="clasp"></div>
						</div>
						<div id="collection-overlay"></div>
					</div>
				</div>
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
Collection.propTypes = {
	
};

function mapStateToProps(state) {
	let data = state.hsReducer;
  return {
    stage: data.stage,
    transition: data.transition,
    cards: data.cards,
    bookOpened: data.bookOpened
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Collection);