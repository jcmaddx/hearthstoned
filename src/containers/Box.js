'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import TheBox from '../components/TheBox';

import '../styles/box.scss';

/**
* Box component
*
* @class Box
* @constructor
*/
class Box extends React.Component {

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
		let boxClasses = classnames({
			"hs-full": true,
			"hs-box": true,
			"hidden": this.props.stage !== 1 && !this.props.transition,
			[this.props.transition]: this.props.transition
		});
		return(
			<div className={boxClasses}>
				<TheBox mainSong={this.props.mainSong} subSong={this.props.subSong} warn={this.props.warn} questCallback={this.props.questCallback}/>
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
Box.propTypes = {
	
};

function mapStateToProps(state) {
	let data = state.hsReducer;
  return {
    stage: data.stage,
    transition: data.transition
  };
}

export default connect(
  mapStateToProps
)(Box);