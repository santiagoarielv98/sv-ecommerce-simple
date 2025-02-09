"use client";

import React from "react";

import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface PriceFilterProps {
  onChange: (value: number[]) => void;
  min?: number;
  max?: number;
  defaultValue?: number[];
}

const PriceFilter = ({
  onChange,
  min = 0,
  max = 1000,
  defaultValue = [0, 1000],
}: PriceFilterProps) => {
  const [value, setValue] = React.useState<number[]>(defaultValue);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    onChange(newValue as number[]);
  };

  return (
    <Stack spacing={2} width="100%">
      <Slider value={value} onChange={handleChange} min={min} max={max} />
      <Typography>
        ${value[0]} - ${value[1]}
      </Typography>
    </Stack>
  );
};

export default PriceFilter;
