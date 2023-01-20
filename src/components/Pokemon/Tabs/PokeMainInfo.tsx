import { Chip, Container, Rating, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React, { FC } from 'react';
import { capitalizeFirstLetter, findColor, findVariant } from '../../../helper';
import { useTypedSelector } from '../../../hooks';
import styled from 'styled-components';

const StyledChip = styled(Chip)`
  span {
    color: white;
  }
`;

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
  5.5: 'Insane',
};

const getMark = (stat: number) => {
  let statCount = 0;
  let statMaxCount = 100;
  let maxMark = 5;

  if (stat > 100) {
    return 5.5;
  }

  for (let index = 0; index <= 5 / 2; index += 0.5) {
    if (stat <= statCount) {
      return index;
    }

    if (stat <= statMaxCount && stat > statMaxCount - 10) {
      return maxMark;
    }

    maxMark -= 0.5;
    statCount += 10;
    statMaxCount -= 10;
  }

  return 0;
};

export const PokeMainInfo: FC = () => {
  const { pokemon, isLoading } = useTypedSelector(
    state => state.pokemons.currentPokemon,
  );

  return (
    <Grid container spacing={2}>
      {pokemon.stats.map(pokestat => (
        <React.Fragment key={pokestat.stat.name}>
          <Grid xs={4}>
            <Typography component='span'>
              {capitalizeFirstLetter(pokestat.stat.name)}
            </Typography>
          </Grid>

          <Grid sx={{ display: 'flex' }} xs={8}>
            <Grid xs={4}>
              <Typography component='span'>{pokestat.base_stat}</Typography>
            </Grid>

            <Grid xs={5}>
              <Rating
                name='text-feedback'
                value={getMark(pokestat.base_stat)}
                readOnly
                precision={0.5}
              />
            </Grid>

            <Grid xs={1}>
              <Typography>{labels[getMark(pokestat.base_stat)]}</Typography>
            </Grid>
          </Grid>
        </React.Fragment>
      ))}

      <Grid xs={4}>
        <Typography component='span'>Types</Typography>
      </Grid>

      <Grid xs={8} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Grid>
          {pokemon.types.map(typesPokemon => (
            <StyledChip
              key={typesPokemon.type.name}
              sx={{ mr: 1 }}
              label={typesPokemon.type.name}
              color={findColor(typesPokemon.type.name)}
              variant={findVariant(typesPokemon.type.name)}
            />
          ))}
        </Grid>
      </Grid>

      <Grid xs={4} sx={{ p: 2, pl: 1 }}>
        <Typography component='span'>Height</Typography>
      </Grid>

      <Grid xs={2} sx={{ p: 2 }}>
        <Typography component='span'>{`${pokemon.height * 10} sm`}</Typography>
      </Grid>

      <Grid xs={4} sx={{ p: 2 }}>
        <Typography component='span'>Weight</Typography>
      </Grid>

      <Grid xs={2} sx={{ p: 2 }}>
        <Typography component='span'>{`${pokemon.weight} kg`}</Typography>
      </Grid>
    </Grid>
  );
};
