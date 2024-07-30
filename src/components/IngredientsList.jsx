import React from "react";
import { Box, Typography } from "@mui/material";

const IngredientsList = ({ title, ingredients }) => {
  const parsedIngredients = typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients;

  return (
    <Box mb="20px">
      <Typography variant="h5"fontWeight="bold" mb="10px">{title}</Typography>
      {parsedIngredients && parsedIngredients.map((ingredient, index) => (
        <Box
          key={index}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          my="5px"
        >
          <Typography flex={1} 
          sx={{ fontWeight: 'bold' }} mx="5px" variant="h6" color="secondary" textAlign="center">
            {ingredient.name}
          </Typography>
          <Typography flex={1} mx="5px" variant="h6" textAlign="center">
            {ingredient.amount}
          </Typography>
          <Typography flex={1} mx="5px" variant="h6" textAlign="center">
            {ingredient.unit}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default IngredientsList;
