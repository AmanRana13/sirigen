import React, {ReactNode} from 'react';
import {render as rtlRender, RenderResult} from '@testing-library/react';
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  responsiveFontSizes,
} from '@mui/material/styles';
import {theme} from 'config/theme.config';
import {Provider} from 'react-redux';
import reducers from '../store/rootReducer';
import thunk from 'redux-thunk';
import {FormProvider, useForm} from 'react-hook-form';
import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'store/reduxFirstHistory';
import {HistoryRouter as Router} from 'redux-first-history/rr6';
import {createBrowserHistory} from 'history';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {Route, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'utilities/react-query';

const mockAxios = new MockAdapter(axios);
const queryClient = new QueryClient();
interface IMockRouteWrapperProps {
  path: string;
  children: ReactNode;
}

const MockRouteWrapper = ({children, path}: IMockRouteWrapperProps) => (
  <Routes>
    <Route path={path} element={children} />
  </Routes>
);

// declare module '@mui/styles/defaultTheme' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   interface DefaultTheme extends Theme {}
// }

const InitTheme = responsiveFontSizes(theme as Theme);
const middleware = [routerMiddleware, thunk];

const reduxStore = createStore(
  reducers,
  compose(applyMiddleware(...middleware)),
);

const history = createBrowserHistory();

const render = (
  ui: React.ReactElement,
  {
    initialState,
    store = createStore(
      reducers,
      initialState,
      compose(applyMiddleware(...middleware)),
    ),
    ...renderOptions
  }: any = {},
): RenderResult => {
  const Wrapper: React.FC<any> = ({children}: any) => {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router history={history}>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={InitTheme}>{children}</ThemeProvider>
            </StyledEngineProvider>
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };
  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions});
};

function renderWithReactHookForm(ui: any, {defaultValues = {}} = {}) {
  const Wrapper = ({children}: any) => {
    const methods = useForm({defaultValues});
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  return {
    ...render(ui, {wrapper: Wrapper}),
  };
}

// re-export everything
export * from '@testing-library/react';
// override render method
export {
  render,
  renderWithReactHookForm,
  reduxStore,
  mockAxios,
  history,
  MockRouteWrapper,
};
