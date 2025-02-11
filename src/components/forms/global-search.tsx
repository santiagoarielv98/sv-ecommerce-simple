"use client";

import useSearchGlobal from "@/hooks/use-search-global";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function GlobalSearch() {
  const { loading, error, ...params } = useSearchGlobal();

  return (
    <Autocomplete
      {...params}
      size="small"
      sx={{ width: { xs: "100%", md: 300 } }}
      noOptionsText={error || "No products found"}
      loading={loading}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Type to search..."
          aria-label="Search products"
          error={!!error}
          helperText={error}
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: <SearchIcon fontSize="small" sx={{ ml: 0.5 }} />,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
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
            <Box sx={{ p: 1 }}>
              <Typography>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                      color: part.highlight ? "primary.main" : "text.primary",
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </Typography>
            </Box>
          </li>
        );
      }}
    />
  );
}
