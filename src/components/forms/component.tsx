"use client";

import { search } from "@/lib/db/search";
import SearchIcon from "@mui/icons-material/Search";
import type { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import debounce from "lodash/debounce";
import React from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { redirect } from "next/navigation";
import { ROUTE } from "@/config/route";

export type ProductType = {
  id: string;
  name: string;
};

export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly ProductType[]>([]);
  const [value, setValue] = React.useState<ProductType | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (
    event: React.SyntheticEvent,
    newValue: string,
    reason: AutocompleteInputChangeReason,
  ) => {
    if (!newValue.trim() || reason === "selectOption") {
      setOptions([]);
      setOpen(false);
      setValue(null);
    }

    debouncedFetch(newValue);
  };

  const fetch = async (query: string) => {
    if (!query.trim()) return;
    setOpen(true);
    const products = await search(query);
    setOptions(products);
  };

  const debouncedFetch = React.useMemo(() => debounce(fetch, 300), []);

  const handleChange = (
    _event: React.SyntheticEvent,
    value: ProductType | null,
  ) => {
    if (value) {
      redirect(`${ROUTE.STORE.PRODUCTS}/${value.id}`);
    }
  };

  return (
    <Autocomplete
      onClose={handleClose}
      size="small"
      sx={{ width: 300 }}
      noOptionsText="No products found"
      onChange={handleChange}
      open={open}
      value={value}
      onInputChange={handleInputChange}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: <SearchIcon fontSize="small" sx={{ ml: 0.5 }} />,
            },
          }}
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const { key, ...optionProps } = props;
        const matches = match(option.name, inputValue, { insideWords: true });
        const parts = parse(option.name, matches);

        return (
          <li key={key} {...optionProps}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
    />
  );
}
