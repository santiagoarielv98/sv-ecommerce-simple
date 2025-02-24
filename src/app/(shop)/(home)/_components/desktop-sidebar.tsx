"use client";

import Box from "@mui/material/Box";
import React from "react";

import { drawerWidth } from "@/config/drawer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Category } from "@prisma/client";
import debounce from "lodash/debounce";
import CategoryFilter from "./category-filter";
import PriceFilter from "./price-filter";

interface DesktopSidebarProps {
  price: [number, number];
  range: [number, number];
  categories: Category[];
  selectedCategory: string[];
  onFilterChange: (params: Record<string, string | string[]>) => void;
}

const DesktopSidebar = ({
  range,
  price,
  categories,
  selectedCategory,
  onFilterChange,
}: DesktopSidebarProps) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const debouncedFilterChange = React.useMemo(
    () => debounce(onFilterChange, 300),
    [onFilterChange],
  );

  if (isMobile) {
    return null;
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Categories</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onChange={(selectedCategory) => {
                  onFilterChange({ category: selectedCategory });
                }}
              />
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="span">Price</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              px: 4,
            }}
          >
            <PriceFilter
              min={range[0]}
              max={range[1]}
              defaultValue={price}
              onChange={(value) => {
                debouncedFilterChange({
                  minPrice: value[0].toString(),
                  maxPrice: value[1].toString(),
                });
              }}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Drawer>
  );
};

export default DesktopSidebar;
