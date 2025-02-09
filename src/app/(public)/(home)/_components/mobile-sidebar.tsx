"use client";

import React from "react";

import CategoryIcon from "@mui/icons-material/Category";
import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Menu from "@mui/material/Menu";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Category } from "@prisma/client";
import debounce from "lodash/debounce";
import CategoryFilter from "./category-filter";
import PriceFilter from "./price-filter";

export interface MobileSidebarProps {
  price: [number, number];
  categories: Category[];
  selectedCategory: string[];
  onFilterChange: (params: Record<string, string | string[]>) => void;
}

const MobileSidebar = ({
  price,
  categories,
  selectedCategory,
  onFilterChange,
}: MobileSidebarProps) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [categoryAnchor, setCategoryAnchor] =
    React.useState<null | HTMLElement>(null);
  const [priceAnchor, setPriceAnchor] = React.useState<null | HTMLElement>(
    null,
  );

  const debouncedFilterChange = React.useMemo(
    () => debounce(onFilterChange, 300),
    [onFilterChange],
  );

  const handleCategoryClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCategoryAnchor(event.currentTarget);
  };

  const handlePriceClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPriceAnchor(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setCategoryAnchor(null);
  };

  const handlePriceClose = () => {
    setPriceAnchor(null);
  };

  if (!isMobile) return null;

  return (
    <Paper
      sx={{
        position: "fixed",
        top: (theme) => (theme.mixins.toolbar.minHeight as number) - 1,
        left: 0,
        right: 0,
        display: { xs: "flex", md: "none" },
        p: 1,
        zIndex: 1000,
        gap: 1,
      }}
    >
      <Button
        fullWidth
        startIcon={<CategoryIcon />}
        onClick={handleCategoryClick}
      >
        Categories
      </Button>
      <Divider orientation="vertical" flexItem />
      <Button
        fullWidth
        startIcon={<FilterListIcon />}
        onClick={handlePriceClick}
      >
        Price
      </Button>

      {/* Categories Menu */}
      <Menu
        anchorEl={categoryAnchor}
        open={Boolean(categoryAnchor)}
        onClose={handleCategoryClose}
        slotProps={{
          paper: {
            sx: { maxWidth: "300px", width: "100%" },
          },
        }}
      >
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={(selectedCategory) => {
            onFilterChange({ category: selectedCategory });
          }}
        />
      </Menu>

      {/* Price Menu */}
      <Menu
        anchorEl={priceAnchor}
        open={Boolean(priceAnchor)}
        onClose={handlePriceClose}
        slotProps={{
          paper: {
            sx: { maxWidth: "300px", width: "100%", p: 2 },
          },
        }}
      >
        <ListItem>
          <Typography gutterBottom>Price Range</Typography>
        </ListItem>
        <ListItem>
          <PriceFilter
            defaultValue={price}
            onChange={(value) => {
              debouncedFilterChange({
                minPrice: value[0].toString(),
                maxPrice: value[1].toString(),
              });
            }}
          />
        </ListItem>
      </Menu>
    </Paper>
  );
};

export default MobileSidebar;
