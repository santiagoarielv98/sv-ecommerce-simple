"use client";

import {
  Category as CategoryIcon,
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import FormControlLabel from "@mui/material/FormControlLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Slider from "@mui/material/Slider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";

export const drawerWidth = 300;

const categories = [
  {
    name: "Category",
    subcategories: ["Phones", "Laptops", "Accessories"],
  },
];

const Sidebar = () => {
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 1000]);
  const [categoryFilterOpen, setCategoryFilterOpen] = React.useState(false);
  const [priceFilterOpen, setPriceFilterOpen] = React.useState(false);

  const handlePriceRangeChange = (
    event: Event,
    newValue: number | number[],
  ) => {
    setPriceRange(newValue as number[]);
  };

  return (
    <Box>
      {/* Mobile Filters */}
      <Box
        sx={{
          position: "fixed",
          // bottom: 0,
          top: (theme) => (theme.mixins.toolbar.minHeight as number) + 8,
          left: 0,
          right: 0,
          display: { xs: "flex", md: "none" },
          p: 1,
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "background.paper",
          zIndex: 1000,
          gap: 1,
        }}
      >
        <Button
          fullWidth
          startIcon={<CategoryIcon />}
          onClick={() => setCategoryFilterOpen(true)}
        >
          Categories
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button
          fullWidth
          startIcon={<FilterListIcon />}
          onClick={() => setPriceFilterOpen(true)}
        >
          Price
        </Button>
      </Box>

      {/* Category Filter Dialog */}
      <Dialog
        open={categoryFilterOpen}
        onClose={() => setCategoryFilterOpen(false)}
        fullWidth
      >
        <DialogTitle>Categories</DialogTitle>
        <DialogContent>
          {categories.map((category) => (
            <Accordion key={category.name}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{category.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {category.subcategories.map((subcategory) => (
                    <ListItem key={subcategory}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label={subcategory}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </DialogContent>
      </Dialog>

      {/* Price Filter Dialog */}
      <Dialog
        open={priceFilterOpen}
        onClose={() => setPriceFilterOpen(false)}
        fullWidth
      >
        <DialogTitle>Price Range</DialogTitle>
        <DialogContent>
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
          />
          <Typography>
            ${priceRange[0]} - ${priceRange[1]}
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Desktop Sidebar Filters */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          display: { xs: "none", md: "block" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <Box>
            {/* Category Filters */}
            {categories.map((category) => (
              <Accordion key={category.name} defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{category.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {category.subcategories.map((subcategory) => (
                      <ListItem key={subcategory}>
                        <FormControlLabel
                          control={<Checkbox />}
                          label={subcategory}
                        />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}

            {/* Price Range Filter */}
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Price Range</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ overflow: "hidden" }}>
                <Slider
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="off"
                  min={0}
                  max={1000}
                />
                <Typography>
                  ${priceRange[0]} - ${priceRange[1]}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
