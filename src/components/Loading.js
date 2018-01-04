'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

import '../styles/loading.scss';

/**
* Loading component
*
* @class Loading
* @constructor
*/
class Loading extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		
	}

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		return(
			<div className="hs-full hs-load">
				<img className="hs-logo" src="/images/main-logo.png" />
				<img className="blizz-logo" src="/images/blizz-logo.jpg" />
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
Loading.propTypes = {
	
};

export default Loading;