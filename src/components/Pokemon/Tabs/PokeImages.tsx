import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Button, MobileStepper } from '@mui/material';
import { Box } from '@mui/system';
import { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../../hooks';
import { IPokemon } from '../../../store/pokemons/pokemonsSlice';

const StyledMobileStepper = styled(MobileStepper)`
  background-color: transparent !important;
`;

export const PokeImages: FC = () => {
  const { pokemon, isLoading } = useTypedSelector(
    state => state.pokemons.currentPokemon,
  );
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 6;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const getPokemonImage = useCallback(
    (pokemon: IPokemon) => {
      switch (activeStep) {
        case 0:
          return pokemon.sprites.front_default;
        case 1:
          return pokemon.sprites.back_default;
        case 2:
          return pokemon.sprites.front_shiny;
        case 3:
          return pokemon.sprites.back_shiny;
        case 4:
          return pokemon.sprites.other.home.front_default;
        case 5:
          return pokemon.sprites.other.home.front_shiny;
        default:
          break;
      }
    },
    [activeStep],
  );

  return (
    <Box sx={{ flexGrow: 1, height: '100%' }}>
      <StyledMobileStepper
        variant="progress"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            Back
            <KeyboardArrowLeft />
          </Button>
        }
      />
      <Box
        sx={{
          height: 255,
          width: '100%',
          p: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img src={getPokemonImage(pokemon)} alt="oops no this pokemon" />
      </Box>
    </Box>
  );
};
