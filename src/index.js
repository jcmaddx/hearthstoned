import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// PAGES
import App from './containers/HSApp';
// styles
import './styles/styles.scss';

const store = configureStore();

if(document.getElementById("hearthstoned")){
	render((
		<Provider store={store}>
			<App />
		</Provider>
	), document.getElementById("hearthstoned"));
}