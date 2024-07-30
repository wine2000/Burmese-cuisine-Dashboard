import React from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import IngredientsList from "../../components/IngredientsList"; // Adjust the path according to your project structure
import DeleteIcon from '@mui/icons-material/Delete';

const SeasonalDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state || {};

  const productId = item._id;

  const handleCancel = () => {
    navigate("/seasonfood");
  };

  const handleNavigateToEdit = (productId) => {
    navigate("/SeasonalEdit",{productId})
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/products/${productId}`);
      console.log(response.data.message);
      alert("Product deleted");
      navigate("/seasonFood"); // Navigate to category after deletion
    } catch (error) {
      console.error(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <Box m="10px">
      <Header title="Product Details" />
      {item && (
        <Box mb="10px">
          <img src={`http://localhost:4000/${item.image}`} alt={item.name} style={{ width: '50%', height: 'auto' }} />
        </Box>
      )}
      <Box
        display="grid"
        gap="15px"
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
      >
        {/* First Section */}
        <Box mb="20px">
          
          <Box mb="10px">
            <Typography variant="subtitle1" fontWeight="bold">Name:</Typography>
            <Typography sx={{ fontWeight: 'bold' }} color="secondary">{item.name}</Typography>
          </Box>
          <Box mb="10px">
            <Typography variant="subtitle1" fontWeight="bold">Name (MM):</Typography>
            <Typography sx={{ fontWeight: 'bold' }} color="secondary">{item.name_mm}</Typography>
          </Box>
         
          <Box mb="10px">
            <Typography variant="subtitle1" fontWeight="bold">Category:</Typography>
            <Typography sx={{ fontWeight: 'bold' }} color="secondary" >{item.category}</Typography>
          </Box>
          <Box mb="10px">
            <Typography variant="subtitle1" fontWeight="bold">Category (MM):</Typography>
            <Typography sx={{ fontWeight: 'bold' }} color="secondary">{item.category_mm}</Typography>
          </Box>
          <Box mb="10px">
            <Typography variant="subtitle1" fontWeight="bold">Description:</Typography>
            <Typography sx={{ fontWeight: 'bold' }} color="secondary">{item.description}</Typography>
          </Box>
          <Box mb="10px">
            <Typography variant="subtitle1" fontWeight="bold">Description (MM):</Typography>
            <Typography sx={{ fontWeight: 'bold' }} color="secondary">{item.description_mm}</Typography>
          </Box>
          <Box
            display="flex"
            mt="10px"
            justifyContent="center"
            width="fit-content"
          >
            <Button
              color="secondary"
              variant="contained"
              style={{ marginRight: "20px" }}
              onClick={handleNavigateToEdit}
            >
              Edit
            </Button>
            <Button
              color="secondary"
              variant="contained"
              style={{ marginRight: "20px" }}
              onClick={handleDelete}
              sx={{ color: 'white', backgroundColor: 'red' }}
              startIcon={<DeleteIcon sx={{ color: 'white' }} />}
            >
              Remove
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </Box>

        {/* Second Section */}
        <Box>
          <IngredientsList
            title="Ingredients"
            ingredients={item.ingredients}
          />
          <IngredientsList
         
            title="Ingredients (MM)"
            ingredients={item.ingredients_mm}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SeasonalDetail;
