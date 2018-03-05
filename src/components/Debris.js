'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

/**
* Debris component
*
* @class Debris
* @constructor
*/
class Debris extends React.Component {

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
		return(
			<div id="debris" className="debris">
				<div className="explosion1"></div>
				<div className="explosion2"></div>
				<div className="coins">
					<div className="coin coin1"></div>
					<div className="coin coin2"></div>
					<div className="coin coin3"></div>
					<div className="coin coin4"></div>
					<div className="coin coin5"></div>
					<div className="coin coin6"></div>
					<div className="coin coin7"></div>
					<div className="coin coin8"></div>
					<div className="coin coin9"></div>
					<div className="coin coin10"></div>
				</div>
				<div className="debris-debris">
					<div className="debris-piece debris1"></div>
					<div className="debris-piece debris2"></div>
					<div className="debris-piece debris3"></div>
					<div className="debris-piece debris4"></div>
				</div>
				<div className="debris-paper">
					<div className="debris-piece paper1"></div>
					<div className="debris-piece paper2"></div>
					<div className="debris-piece paper3"></div>
					<div className="debris-piece paper4"></div>
				</div>
				<div className="debris-gems">
					<div className="debris-piece gem1"></div>
					<div className="debris-piece gem2"></div>
					<div className="debris-piece gem3"></div>
					<div className="debris-piece gem4"></div>
				</div>
				<div className="debris-more-gems">
					<div className="debris-piece gem1"></div>
					<div className="debris-piece gem2"></div>
					<div className="debris-piece gem3"></div>
					<div className="debris-piece gem4"></div>
				</div>
			</div>
		);
	}
}

export default Debris;