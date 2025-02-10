"use client";

import useSearchGlobal from "@/hooks/use-search-global";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

export default function GlobalSearch() {
  const params = useSearchGlobal();

  return (
    <Autocomplete
      {...params}
      size="small"
      sx={{ width: 300 }}
      noOptionsText="No products found"
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
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
