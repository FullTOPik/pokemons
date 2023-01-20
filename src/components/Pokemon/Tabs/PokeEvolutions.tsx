import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../../../hooks';

import { Skeleton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { fetchPokemonEvolutions } from '../../../store/pokemons/actionCreators';
import { PokeEvolutionCard } from '../PokeEvolutionCard';
import { Box } from '@mui/system';

export const PokeEvolutions = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { pokemon } = useTypedSelector(state => state.pokemons.currentPokemon);

  useEffect(() => {
    if (!pokemon.evolutions.evolutionList) {
      dispatch(fetchPokemonEvolutions(pokemon.species.url));
    }
  }, []);

  const handlePushPokemon = (path: string) => () => {
    navigate(path);
  };

  return (
    <Grid container spacing={2}>
      {pokemon.evolutions.isLoading
        ? Array.from('pok').map((_, index) => (
            <Grid xs={4} key={index}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={210}
                height={120}
              />

              <Box sx={{ pt: 0.5 }}>
                <Skeleton animation="wave" />

                <Skeleton animation="wave" width="60%" />
              </Box>
            </Grid>
          ))
        : pokemon.evolutions.evolutionList?.map(pokemonEvolution => (
            <Grid xs={4} key={pokemonEvolution.id}>
              <PokeEvolutionCard
                pokemonEvolution={pokemonEvolution}
                handlePushPokemon={handlePushPokemon}
              />
            </Grid>
          ))}
    </Grid>
  );
};
