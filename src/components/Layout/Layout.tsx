import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTypedSelector } from '../../hooks';

interface ILayout {
  children: ReactNode;
}

const StyledImage = styled.img`
  position: relative;
  top: -5px;
  left: 0px;
  background-size: cover;
`;

const MAX_POKEMON_COUNT = 1154;

const Layout: FC<ILayout> = ({ children }) => {
  const { countGuessed } = useTypedSelector(state => state.game);

  const count = Array.from(new Set(countGuessed)).length;

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box component="nav">
        <AppBar>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/pokemons">
              <Typography variant="h5">Pokemons</Typography>
            </Link>

            <div>
              <Typography>
                You know {count} of {MAX_POKEMON_COUNT} pokemons
              </Typography>

              <Typography>You rang:</Typography>
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <Box component="main" sx={{ p: 3, width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
