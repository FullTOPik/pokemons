import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  Container,
  Input,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { PokeAbility } from '../../components/Pokemon/Tabs/PokeAbility';
import { PokeEvolutions } from '../../components/Pokemon/Tabs/PokeEvolutions';
import { PokeImages } from '../../components/Pokemon/Tabs/PokeImages';
import { PokeMainInfo } from '../../components/Pokemon/Tabs/PokeMainInfo';
import { capitalizeFirstLetter } from '../../helper';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { addGuessed } from '../../store/game/gameSlice';
import { fetchPokemon } from '../../store/pokemons/actionCreators';

interface IImage {
  isGame: boolean;
}

const StyledMainImage = styled.img<IImage>`
  height: 78%;
  width: 95%;

  ${({ isGame }) =>
    isGame &&
    css`
      height: 65%;
      width: 80%;
      filter: brightness(0%);
    `}

  @media (min-width: 900px) {
    height: 40%;
  }

  @media (min-width: 1400px) {
    height: 30%;
  }
`;

const StyledContainer = styled(Container)`
  && {
    padding-right: 0px;
  }
`;

const a11yProps = (index: number) => ({
  id: `full-width-tab-${index}`,
  'aria-controls': `full-width-tabpanel-${index}`,
});

const pokemonTabs = [
  { title: 'Main', component: <PokeMainInfo />, key: 0 },
  { title: 'Images', component: <PokeImages />, key: 1 },
  { title: 'Ability', component: <PokeAbility />, key: 2 },
  { title: 'Evolutions', component: <PokeEvolutions />, key: 3 },
];

const Pokemon: FC = () => {
  const { id } = useParams();
  const dispatch = useTypedDispatch();
  const { countGuessed } = useTypedSelector(state => state.game);
  const { pokemon, isLoading } = useTypedSelector(
    state => state.pokemons.currentPokemon,
  );
  const [pokemonName, setPokemonName] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [isOpenGame, setIsOpenGame] = useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const checkPokemon = () => {
    if (id && countGuessed.includes(Number(id))) {
      setIsOpenGame(false);
    } else {
      setIsOpenGame(true);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchPokemon(id));
      checkPokemon();
      setCurrentTab(0);
      setPokemonName('');
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (pokemon.name) {
      console.log(`Just don't tell anyone his name: ${pokemon.name}`);
    }
  }, [pokemon.name]);

  const handleCheckPokemon = () => {
    if (
      pokemonName.length > 3 &&
      pokemon.name.toLowerCase().includes(pokemonName.toLowerCase().trim())
    ) {
      setIsOpenGame(false);
      dispatch(addGuessed(Number(id)));
      return;
    }

    if (pokemonName.toLowerCase().trim() === pokemon.name.toLowerCase()) {
      setIsOpenGame(false);
      dispatch(addGuessed(Number(id)));
      return;
    }

    setPokemonName('');
  };

  return (
    <Card sx={{ mt: 8, p: 2 }}>
      {Object.values(pokemon).length > 0 ? (
        <Grid container spacing={2}>
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            xs={12}
            md={isOpenGame ? 12 : 6}
          >
            <Typography variant="h2">
              {isOpenGame
                ? "Who's That Pokémon?"
                : capitalizeFirstLetter(pokemon.name)}
            </Typography>

            <StyledMainImage
              isGame={isOpenGame}
              src={pokemon.sprites.other.dream_world.front_default}
              alt={pokemon.name}
            />

            {isOpenGame && (
              <>
                <Input
                  sx={{ mt: 1 }}
                  placeholder="Poke name"
                  value={pokemonName}
                  autoFocus
                  onKeyPress={ev => {
                    if (ev.key === 'Enter') {
                      handleCheckPokemon();
                      ev.preventDefault();
                    }
                  }}
                  onChange={event => setPokemonName(event.target.value)}
                />

                <Button onClick={handleCheckPokemon}>Check me</Button>
              </>
            )}
          </Grid>

          {!isOpenGame && (
            <Grid xs={12} md={6}>
              <Tabs
                value={currentTab}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                {pokemonTabs.map(tab => (
                  <Tab
                    label={tab.title}
                    key={tab.key}
                    {...a11yProps(tab.key)}
                  />
                ))}
              </Tabs>

              {pokemonTabs.map(content => (
                <StyledContainer key={content.key}>
                  {currentTab === content.key && content.component}
                </StyledContainer>
              ))}
            </Grid>
          )}
        </Grid>
      ) : (
        <Backdrop
          sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Card>
  );
};

export default Pokemon;
