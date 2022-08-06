import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';
import { store, persistor } from './App/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //<React.StrictMode>
    // </React.StrictMode>,
    <Provider store={store}>
        <GlobalStyles>
            <App persistor={persistor} />
        </GlobalStyles>
    </Provider>,
);
