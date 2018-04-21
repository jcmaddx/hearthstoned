'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/hsActions';

import '../styles/class-tabs.scss';

let categories = ["druid", "hunter", "mage", "paladin", "priest", "rogue", "shaman", "warlock", "warrior", "neutral"];

/**
* ClassNav component
*
* @class ClassNav
* @constructor
*/
class ClassNav extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			tabs: []
		}
	}

	componentDidMount() {
		let tabs = [], filtered;
		categories.map((item, key) => {
			let filtered = Object.keys(this.props.cards).filter((card) => {
				let currentCard = this.props.cards[card];
				if(currentCard.category === item && currentCard.owned === true){
					return true;
				} else {
					return false;
				}
			})
			if(filtered.length > 0){
				tabs.push(item);
			}
		});
		this.setState({tabs: tabs});
	}

	_handleClick = (e) => {
		let target = e.target;
		let currentActive = document.querySelectorAll('.class-tab.active')[0];
		if(target === currentActive) {
			console.log('current');
			return false;
		}
		let pages = document.querySelectorAll('.pages .page');
		let category = target.dataset.category;
		let destination = document.getElementsByClassName(category+'-page')[0];
		for (var destinationIndex=0; (destination=destination.previousSibling); destinationIndex++);
		// set to zero index;
		destinationIndex --;
		Object.keys(pages).map((item, key) => {
			if(key < destinationIndex) {
				pages[key].classList.add('flipOut');
			} else {
				pages[key].classList.remove('flipOut');
			}
		});
		this.props.sounds.pageForward.play({offset: 0});
		currentActive.classList.remove('active');
		target.classList.add('active');

	}
	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		return(
			<div className="class-tabs">
				{
					(this.state.tabs.length > 0) ?
						this.state.tabs.map((item, key) => {
							let tabClasses = classnames({
								"class-tab": true,
								["tab-"+item]: true,
								"active": key === 0
							})
							return (
								<div key={key} id={"tab-"+item} className={tabClasses} data-category={item} onClick={this._handleClick}></div>
							)
						})
					: null
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	let data = state.hsReducer;
  return {
    cards: data.cards
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
)(ClassNav);