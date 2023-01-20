import { FC } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { chip } from '../../constaints';
import { findColor, findVariant } from '../../helper';

interface IMultipleSelectChip {
  personName: string[];
  setPersonName: (string: string[]) => void;
}

const MultipleSelectChip: FC<IMultipleSelectChip> = ({
  personName,
  setPersonName,
}) => {
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-chip-label">Pokemon types</InputLabel>

      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={selected => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map(value => (
              <Chip
                color={findColor(value)}
                variant={findVariant(value)}
                key={value}
                label={value}
              />
            ))}
          </Box>
        )}
      >
        {chip.map((el, index) => (
          <MenuItem key={index} value={el.name}>
            {el.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectChip;
