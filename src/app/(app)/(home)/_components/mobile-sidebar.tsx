"use client";

import React from "react";

import CategoryIcon from "@mui/icons-material/Category";
import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import ListItem from "@mui/material/ListItem";
import Menu from "@mui/material/Menu";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const categories = ["Category 1", "Category 2", "Category 3"];

const MobileSidebar = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [categoryAnchor, setCategoryAnchor] =
    React.useState<null | HTMLElement>(null);
  const [priceAnchor, setPriceAnchor] = React.useState<null | HTMLElement>(
    null,
  );
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

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
        top: (theme) => theme.mixins.toolbar.minHeight,
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
        {categories.map((subcategory) => (
          <ListItem key={subcategory} dense>
            <FormControlLabel control={<Checkbox />} label={subcategory} />
          </ListItem>
        ))}
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
          <Slider
            value={value}
            onChange={handleChange}
            min={0}
            max={1000}
            valueLabelDisplay="auto"
          />
        </ListItem>
        <ListItem>
          <Typography>
            ${value[0]} - ${value[1]}
          </Typography>
        </ListItem>
      </Menu>
    </Paper>
  );
};

export default MobileSidebar;
