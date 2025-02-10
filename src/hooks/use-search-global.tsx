"use client";

import { ROUTE } from "@/config/route";
import { search } from "@/lib/db/search";
import type { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import debounce from "lodash/debounce";
import { redirect } from "next/navigation";
import React from "react";

export type ProductType = {
  id: string;
  name: string;
};

const useSearchGlobal = () => {
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
    const isSelectOption = reason === "selectOption";
    if (!newValue.trim() || isSelectOption) {
      setOptions([]);
      setOpen(false);
      setValue(null);
    }

    if (isSelectOption) {
      return;
    }

    debouncedFetch(newValue);
  };

  const fetcher = async (query: string) => {
    if (!query.trim()) return;
    setOpen(true);
    const products = await search(query);
    setOptions(products);
  };

  const debouncedFetch = React.useMemo(() => debounce(fetcher, 300), []);

  const handleChange = (
    _event: React.SyntheticEvent,
    value: ProductType | null,
  ) => {
    if (value) {
      redirect(`${ROUTE.STORE.PRODUCTS}/${value.id}`);
    }
  };

  return {
    open,
    options,
    value,
    onClose: handleClose,
    onInputChange: handleInputChange,
    onChange: handleChange,
  };
};

export default useSearchGlobal;
