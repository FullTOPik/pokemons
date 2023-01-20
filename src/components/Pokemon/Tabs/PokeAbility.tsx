import { FC, useState } from "react";

import { CatchingPokemon, CatchingPokemonTwoTone } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { capitalizeFirstLetter } from "../../../helper";
import { useTypedSelector } from "../../../hooks";

export const PokeAbility: FC = () => {
  const { pokemon } = useTypedSelector(
    (state) => state.pokemons.currentPokemon
  );

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        {pokemon.abilities.map((ability, index) => (
          <Grid key={ability.ability.name} sx={{ display: "flex" }}>
            <Accordion
              expanded={expanded === `panel${index + 1}`}
              onChange={handleChange(`panel${index + 1}`)}
            >
              <AccordionSummary
                expandIcon={
                  index % 2 === 0 ? (
                    <CatchingPokemon />
                  ) : (
                    <CatchingPokemonTwoTone />
                  )
                }
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ pl: 1 }}>
                  {capitalizeFirstLetter(ability.ability.name!)}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography>
                  {
                    ability.ability.detail.effect_entries!.find(
                      (entry) => entry.language.name === "en"
                    )?.effect
                  }
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}

        <Collapse timeout="auto">;jgf</Collapse>
      </Grid>
    </Grid>
  );
};
