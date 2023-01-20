import { createTheme, ThemeProvider } from '@mui/material';
import { FC } from 'react';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Pokemon from './Page/Pokemon/Pokemon';
import Pokemons from './Page/Pokemons/Pokemons';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const router = createBrowserRouter([
  {
    path: '/pokemons',
    element: (
      <Layout>
        <Pokemons />
      </Layout>
    ),
  },
  {
    path: '/pokemons/:id',
    element: (
      <Layout>
        <Pokemon />
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <Pokemons />
      </Layout>
    ),
  },
]);

const App: FC = () => (
  <ThemeProvider theme={darkTheme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);

export default App;
