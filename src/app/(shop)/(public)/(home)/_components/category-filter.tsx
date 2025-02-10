"use client";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ListItem from "@mui/material/ListItem";
import type { Category } from "@prisma/client";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string[];
  onChange: (selectedCategory: string[]) => void;
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onChange,
}: CategoryFilterProps) => {
  return (
    <>
      {categories.map((category) => (
        <ListItem key={category.id}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategory.includes(category.name)}
                value={category.name}
                onChange={() => {
                  if (selectedCategory.includes(category.name)) {
                    onChange(
                      selectedCategory.filter((name) => name !== category.name),
                    );
                  } else {
                    onChange([...selectedCategory, category.name]);
                  }
                }}
              />
            }
            label={category.name}
          />
        </ListItem>
      ))}
    </>
  );
};

export default CategoryFilter;
