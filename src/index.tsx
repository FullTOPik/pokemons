import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import styled from 'styled-components';
import './index.css';
import Snowfall from 'react-snowfall';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const StyledApp = styled(App)`
  margin: 0;
`;

root.render(
  <Provider store={store}>
    <Snowfall style={{ zIndex: 1001 }} snowflakeCount={200} />

    <StyledApp />
  </Provider>,
);
