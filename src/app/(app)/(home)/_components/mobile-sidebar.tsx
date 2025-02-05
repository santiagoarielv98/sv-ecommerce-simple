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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!isMobile) {
    return null;
  }

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
      <Button fullWidth startIcon={<CategoryIcon />} onClick={handleClick}>
        Categories
      </Button>
      <Divider orientation="vertical" flexItem />
      <Button fullWidth startIcon={<FilterListIcon />} onClick={handleClick}>
        Price
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {categories.map((subcategory) => (
          <ListItem key={subcategory}>
            <FormControlLabel control={<Checkbox />} label={subcategory} />
          </ListItem>
        ))}
        <ListItem>
          <Slider value={value} onChange={handleChange} min={0} max={1000} />
          <Typography>
            ${value[0]} - ${value[1]}
          </Typography>
        </ListItem>
      </Menu>
    </Paper>
  );
};

export default MobileSidebar;
