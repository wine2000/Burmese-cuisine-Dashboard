import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardMedia, CardContent, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import AddProduct from '../../scenes/addproduct';

const Category = () => {
  

  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/products/allProduct')
      .then(response => response.json())
      .then(data => {
        setData(data.result);
      })
      .catch(error => {
        console.error('There was an error fetching the product data!', error);
      });
  }, []);

  const handleImageClick = (item) => {
    navigate("/edit", { state: { item } });
  };
  const handleEditButtonClick = () => {
    navigate("/addProduct");
  };
  return (
    <Box m="20px">
      <Header title="Ethnical Food"/>
      
      <Button
        onClick={handleEditButtonClick}
        color="secondary"
        variant="contained"
        sx={{ marginBottom: "20px"}}
      >
        ADD PRODUCT
      </Button>
     
      <Box
        display="grid"
        gap="15px"
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
        }}
      >
        {data.map((item) => (
          <Card key={item.id} onClick={() => handleImageClick(item)}>
            <CardMedia
              component="img"
              height="200"
              src={`http://localhost:4000/${item.image}`}
              alt={item.name}
              sx={{ objectFit: 'cover' }} // Ensures image fits the container
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.name_mm}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
export default Category;
