'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/hsActions';

import '../styles/collection.scss';

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

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		console.log("collection-info", this.props.stage, this.props.transition);
		let collectionClasses = classnames({
			"hs-full": true,
			"hs-collection": true,
			"hidden": this.props.stage !== 3 && this.props.transition !== "collection-in" && this.props.transition !== "collection-out",
			[this.props.transition]: this.props.transition
		});
		return(
			<div className={collectionClasses}>
				The Collection
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
    transition: data.transition
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