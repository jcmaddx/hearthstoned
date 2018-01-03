import React from 'react';
import { render } from 'react-dom';

// PAGES
import App from './containers/HSApp';
// styles
import './styles/styles.scss';

if(document.getElementById("hearthstoned")){
	render((
		<App />
	), document.getElementById("hearthstoned"));
}