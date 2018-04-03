'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/hsActions';

import '../styles/collection.scss';

import Card from '../components/Card';

/**
* Collection component
*
* @class Collection
* @constructor
*/
class Collection extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let categories = ["druid", "hunter", "mage", "paladin", "priest", "rogue", "shaman", "warlock", "warrior", "neutral"]
		categories.map((item, key) => {
			let filtered = this._cardFilterSort(item);
			let pages = this._buildPages(item, filtered);
		})
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

	_buildPages = (category, items) => {
		console.log(category, items);
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
							<div className="page">
								<h1 className="page-title">Neutral</h1>
								<div className="page-cards">
									
								</div>
							</div>
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