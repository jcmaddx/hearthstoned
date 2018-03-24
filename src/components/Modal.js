'use strict';

// import the npm modules we need
import React from 'react';
import classnames from 'classnames';

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
	}

	_openModal = (id) => {
		this.refs[id].classList.add("open");
		this.props.openSound.play();
	};

	_closeModal = (id) => {
		this.refs[id].classList.remove("open");
		this.props.closeSound.play();
		if(this.props.closeCallback){
			this.props.closeCallback();
		}
	};

	/**
		*  Renders the component
		*
		* @method render
		* @return Comonent
		*/
	render() {
		let animType = (this.props.anim) ? this.props.anim : "slideIn";
		let modalClasses = classnames({
			"hs-modal": true,
			[animType]: true
		})
		return(
			<div id={this.props.refId} ref={this.props.refId} className={modalClasses}>
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