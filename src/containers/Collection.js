'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/hsActions';

import '../styles/collection.scss';

import Card from '../components/Card';
import Button from '../components/Button';

let categories = ["druid", "hunter", "mage", "paladin", "priest", "rogue", "shaman", "warlock", "warrior", "neutral"]
let titles = {
	druid: "Hobbies",
	hunter: "Pets",
	mage: "Education",
	paladin: "Cabinets",
	priest: "Medical",
	rogue: "Repo Man",
	shaman: "Travels",
	warlock : "Web Dev",
	warrior : "References",
	neutral: "General",
}
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
			pages: {},
			currentCard: null
		}
	}

	componentDidMount() {
		let pages = {}, filtered;
		categories.map((item, key) => {
			filtered = this._cardFilterSort(item);
			if(filtered.length > 0){
				pages[item] = filtered;
			}
		});
		this.setState({pages: pages});
		if(this.props.bookOpened){
			document.getElementById('page-container').classList.remove('unopened');
		} else {
			setTimeout(() => {
				document.getElementById('page-container').classList.remove('unopened');
			}, 1000);
		}
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

	_pageForward = (e) => {
		e.stopPropagation();
		let page = e.target.parentNode;
		page.classList.remove('flipIn');
		page.classList.add('flipOut');
		this.props.sounds.pageForward.play({offset: 0});
	}

	_pageBack = (page) => {
		document.getElementById("page"+page).classList.remove('flipOut');
		document.getElementById("page"+page).classList.add('flipIn');
		this.props.sounds.pageBack.play({offset: 0});
	}

	_goBack = () => {
		this.props.actions.setBookOpened();
		// play sound for going back to hub
		this.props.sounds.boxClose.play();
		// no file loading required. Execute animation
		this.props.sounds.collectionManager.stop();
		this.props.sounds.enterBox.play();
		this.props.actions.setTransition("collection-out");
		setTimeout(() => {
			this.props.sounds.mainTitle.play({volume: 1, offset: 0});
			this.props.actions.setTransition(null);
			this.props.actions.setStage(1);
		},200);
	};

	_newDeckMouse = () => {
		this.props.sounds.hubHover.play();
	};

	_cardHover = (id, card, rarity, out, index) => {
		let parent = card.parentNode;
		if(!parent.classList.contains('old')){
			parent.classList.add('old');
		}
		if(!out){
			this.props.sounds.collectionCardOver.play({offset: 0});
		}
	};

	_cardClick = (id, card, rarity, golden, index) => {
		let dupeCard = card.cloneNode(true);
		let overlay = document.getElementById('collection-overlay');
		overlay.appendChild(dupeCard);
		overlay.classList.add("show", "from-"+index);
		this.props.sounds.pickupCard.play();
	};

	_overlayClose = (e) => {
		let overlay = e.target;
		let fromClass = overlay.classList[1];
		let toClass = fromClass.replace("from", "to");
		overlay.classList.remove(fromClass);
		overlay.classList.add(toClass);
		this.props.sounds.dropCard.play();
		setTimeout(() => {
			overlay.classList.remove('show', toClass);
			while (overlay.lastChild) {
			  overlay.removeChild(overlay.lastChild);
			}
		}, 300)
	}

	_buildPage = (category, items, pageNum) => {
		let pageContent = (
			<div key={Math.random()} id={"page"+pageNum} className="page">
				{
					(pageNum !== 1)? 
						<div className="page-nav-back" onClick={this._pageBack.bind(this, (pageNum - 1))}></div>
					:null
				}
				<h2 className="page-title">{titles[category]}</h2>
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
						<div className="page-nav-forward" onClick={this._pageForward}></div>
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
		let popupCard = null;
		if(this.state.currentCard !== null){
			let current = this.props.cards[this.state.currentCard];
			let extension = (current.hasOwnProperty("golden")) ? ".gif" : ".jpg";
			let artwork = this.state.currentCard + extension;
			popupCard = <Card
				cardKey={this.state.currentCard}
				listIndex={0}
				facedown={false} 
				callback={() => {return false}}
				onhover={() => {return false}}
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
		}

		return(
			<div className={collectionClasses}>
				<div id="collection-container" className="collection-container">
					<div id="collection-content" className="collection-content">
						<div id="page-container" className="pages unopened">
							<div className="class-tabs"></div>
							{
								(Object.keys(this.state.pages).length > 0) ? 
									Object.keys(this.state.pages).map((item, key) => {
										let currentCategory = this.state.pages[item]
										let pages = [], i;
										if(currentCategory.length === 0){
											return null;
										}
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
							<h3 className="tray-title">My Decks</h3>
							<div onClick={this.props.warn} onMouseEnter={this._newDeckMouse} className="new-deck">New Deck</div>
							<div className="deck-count">0/18</div>
							<div className="back-button">
								<Button hover={this.props.sounds.hubHover} cb={this._goBack} text="Back" />
							</div>
						</div>
						{
							(!this.props.bookOpened) ?
								<div id="book-cover" className="book-cover">
									<div className="clasp"></div>
								</div> 
							:null
						}
						<div id="collection-overlay" onClick={this._overlayClose}></div>
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