'use strict';

// import the npm modules we need
import React from 'react';

import '../styles/modal.scss';

/**
* Modal component
*
* @class Modal
* @constructor
*/
class Modal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		
	}

	_openModal(id) {
		this.refs[id].classList.add("open");
	};

	_closeModal(id) {
		this.refs[id].classList.remove("open");
	};

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		return(
			<div id={this.props.refId} ref={this.props.refId} className="hs-modal">
				<div className="modal-overlay" onClick={this._closeModal.bind(this, this.props.refId)}></div>
				<div className="modal-content">
					{this.props.children}
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
Modal.propTypes = {
	
};

export default Modal;