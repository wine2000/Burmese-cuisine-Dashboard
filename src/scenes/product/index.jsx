import React, { useEffect, useState } from "react";
import { Box, Card, CardMedia, CardContent, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const Product = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [article, setArticle] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/articles/allArticle')
      .then(response => response.json())
      .then(data => {
        setArticle(data);
      })
      .catch(error => {
        console.error('There was an error fetching the product data!', error);
      });
  }, []);

  if (!article) {
    return <div>Loading...</div>;
  }

  const handleImageDoubleClick = (item) => {
    navigate("/edit", { state: { item } });
  };

  return (
    <Box m="20px">
      <Header title="Articles" />
      <Box
        display="grid"
        gap="15px"
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
        }}
      >
        {article.map((item) => (
          <Card key={item.id}>
            <CardMedia
              component="img"
              height="200"
              src={`http://localhost:4000/${item.image}`}
              alt={item.name}
              sx={{ objectFit: 'cover' }}
              onDoubleClick={() => handleImageDoubleClick(item)}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.name_mm}
              </Typography>
              <Typography variant="body5" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Product;
