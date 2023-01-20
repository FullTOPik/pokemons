import { FC } from 'react';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import { capitalizeFirstLetter } from '../../helper';
import { IPokemon } from '../../store/pokemons/pokemonsSlice';
import { useParams } from 'react-router-dom';

interface IPokeEvolutionCard {
  pokemonEvolution: IPokemon;
  handlePushPokemon: (path: string) => () => void;
}

export const PokeEvolutionCard: FC<IPokeEvolutionCard> = ({
  pokemonEvolution,
  handlePushPokemon,
}) => {
  const { id } = useParams();

  return (
    <Card>
      <CardMedia
        component='img'
        alt={pokemonEvolution.name}
        height='180'
        image={pokemonEvolution.sprites.other.dream_world.front_default}
      />

      <CardContent sx={{ textAlign: 'center' }}>
        <Typography component='span'>
          {capitalizeFirstLetter(pokemonEvolution.name)}
        </Typography>
      </CardContent>

      <CardActions>
        {Number(id) === Number(pokemonEvolution.id) ? (
          <Typography sx={{ textAlign: 'center' }} component='span'>
            You're already looking at me
          </Typography>
        ) : (
          <Button
            sx={{ width: '100%' }}
            size='small'
            onClick={handlePushPokemon(`/pokemons/${pokemonEvolution.id}`)}
          >
            Detail
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
