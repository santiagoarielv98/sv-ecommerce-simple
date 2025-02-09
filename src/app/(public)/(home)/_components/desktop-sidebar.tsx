"use client";

import Box from "@mui/material/Box";
import React from "react";

import { drawerWidth } from "@/config/drawer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Checkbox from "@mui/material/Checkbox";
import Drawer from "@mui/material/Drawer";
import FormControlLabel from "@mui/material/FormControlLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Slider from "@mui/material/Slider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Category } from "@prisma/client";
import debounce from "lodash/debounce";

interface DesktopSidebarProps {
  categories: Category[];
  selectedCategory: string[];
  onFilterChange: (params: Record<string, string | string[]>) => void;
}

const DesktopSidebar = ({
  categories,
  selectedCategory,
  onFilterChange,
}: DesktopSidebarProps) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    const [min, max] = newValue as number[];
    debouncedFilterChange({
      minPrice: min.toString(),
      maxPrice: max.toString(),
    });
  };

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
              {categories.map((category) => (
                <ListItem key={category.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedCategory.includes(category.name)}
                        value={category.name}
                        onChange={() => {
                          if (selectedCategory.includes(category.name)) {
                            onFilterChange({
                              category: selectedCategory.filter(
                                (name) => name !== category.name,
                              ),
                            });
                          } else {
                            onFilterChange({
                              category: [...selectedCategory, category.name],
                            });
                          }
                        }}
                      />
                    }
                    label={category.name}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">Price</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              px: 4,
            }}
          >
            <Slider value={value} onChange={handleChange} min={0} max={1000} />
            <Typography>
              ${value[0]} - ${value[1]}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Drawer>
  );
};

export default DesktopSidebar;
