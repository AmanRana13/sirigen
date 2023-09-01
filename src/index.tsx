import React from 'react';
import ReactDom from 'react-dom/client';
import {Provider} from 'react-redux';
import {StyledEngineProvider} from '@mui/material/styles';
import {history, store} from './store';
import App from './App';
import {ApplicationLoader} from './common/ApplicationLoader';
import reportWebVitals from './reportWebVitals';
import {PusherProvider} from './pusher/PusherContext';
import PrintFrame from 'common/Print/Print.component';
import {HistoryRouter as Router} from 'redux-first-history/rr6';
import {QueryClient, QueryClientProvider} from 'utilities/react-query';

const root = ReactDom.createRoot(
  document.getElementById('root') as HTMLElement,
);
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router history={history}>
          <StyledEngineProvider injectFirst>
            <PrintFrame />
            {/* 
            This is added here because CssBaseline was messing with print css,
            if we kept it inside AppPage.
          */}
            <PusherProvider>
              <>
                <App />
                <ApplicationLoader />
              </>
            </PusherProvider>
          </StyledEngineProvider>
        </Router>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(() => {});
