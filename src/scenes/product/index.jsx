import React, { useEffect, useState } from "react";
import { Box, Card, Button, CardMedia, CardContent, Typography, useMediaQuery } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import DeleteIcon from '@mui/icons-material/Delete';

const Product = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { item } = location.state || {};

  useEffect(() => {
    fetch('http://localhost:4000/articles/allArticle')
      .then(response => response.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the product data!', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleEditButtonClick = () => {
    navigate("/articleAddProduct");
  };

  const handleRemoveButtonClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/articles/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the state after a successful delete
      setArticles((prevArticles) => prevArticles.filter((article) => article._id !== id));
    } catch (error) {
      console.error('Error deleting article:', error);
      setError(error.message);
    }
  };

  return (
    <Box
    style={{paddingLeft:30}}

     m="20px">
      <Header title="Articles" />
      <Button
        onClick={handleEditButtonClick}
        color="secondary"
        variant="contained"
        sx={{ marginBottom: "20px" }}
        justifyContent="space-between"
      >
        ADD Article
      </Button>
      <Box
        display="grid"
        gap="15px"
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
        }}
      >
        {articles.map((item) => (
          <Card key={item._id}>
            <CardMedia
              component="img"
              height="200"
              src={`http://localhost:4000/${item.image}`}
              alt={item.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent style={{ textAlign: 'justify' }}>
              <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center' }}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
              <Box style={{ paddingTop: '5px', textAlign: 'center' }}>
                <Button
                  onClick={() => handleRemoveButtonClick(item._id)}
                  variant="contained"
                  sx={{ color: 'white', backgroundColor: 'red' }}
                  startIcon={<DeleteIcon sx={{ color: 'white' }} />}
                >
                  Remove
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Product;
