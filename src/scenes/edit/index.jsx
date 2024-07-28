import React from "react";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";

const Edit = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state || {};

  const articleId = item._id

  const handleFormSubmit = (values) => {
    console.log(values);
    navigate("/edit");
  };

  const handleCancel = () => {
    navigate("/category");
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/articles/${articleId}`);
      console.log(response.data.message); // 'Article deleted'
      navigate("/category"); // Navigate to category after deletion
    } catch (error) {
      console.error(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <Box m="10px">
      <Header title="Edit Products" />
      {item && (
        <Box mb="10px">
          <img src={`http://localhost:4000/${item.image}`} alt={item.name} style={{ width: '50%', height: 'auto' }} />
        </Box>
      )}
      <Formik
        initialValues={{
          name: item ? item.name : "",
          name_mm: item ? item.name_mm : "",
          image: item ? item.image : "",
          description: item ? item.description : "",
          description_mm: item ? item.description_mm : "",
          ingredients: item ? item.ingredients : "",
          ingredients_mm: item ? item.ingredients_mm : "",
          category: item ? item.category : "",
          category_mm: item ? item.category_mm : ""
        }}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="15px"
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
              }}
            >
              {/* First Section */}
              <Box mb="20px">
                <Typography variant="h6">Basic Information</Typography>
                <TextField
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Name (MM)"
                  name="name_mm"
                  value={values.name_mm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Image URL"
                  name="image"
                  value={values.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Category (MM)"
                  name="category_mm"
                  value={values.category_mm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <Box
                  display="flex"
                  mt="10px"
                  justifyContent="center"
                  width="fit-content"
                >
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    style={{ marginRight: "20px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    style={{ marginRight: "20px" }}
                    onClick={handleDelete} // Pass the actual article ID
                  >
                    Remove
                  </Button>
                  <Button
                    type="button"
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
                <Typography variant="h6">Details</Typography>
                <TextField
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  sx={{ minHeight: "80px" }}
                  InputProps={{ sx: { height: "100px" } }}
                  multiline={true}
                />
                <TextField
                  label="Description (MM)"
                  name="description_mm"
                  value={values.description_mm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  sx={{ minHeight: "80px" }}
                  InputProps={{ sx: { height: "100px" } }}
                  multiline={true}
                />
                <TextField
                  label="Ingredients"
                  name="ingredients"
                  value={values.ingredients}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  sx={{ minHeight: "80px" }}
                  InputProps={{ sx: { height: "100px" } }}
                  multiline={true}
                />
                <TextField
                  label="Ingredients (MM)"
                  name="ingredients_mm"
                  value={values.ingredients_mm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  sx={{ minHeight: "80px" }}
                  InputProps={{ sx: { height: "100px" } }}
                  multiline={true}
                />
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Edit;
