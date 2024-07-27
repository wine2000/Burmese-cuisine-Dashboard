import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";

const AddProduct = ({ onSave }) => { // Accept onSave as a prop
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state || {};
  const [selectedImage, setSelectedImage] = useState(item ? `http://localhost:4000/${item.image}` : null);



  const handleCancel = () => {
    navigate("/category");
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleFormSubmit = async (values, { setSubmitting, setError, setSuccess }) => {
    setSubmitting(true);

    const formData = new FormData();

    // Append form fields to FormData
    Object.keys(values).forEach((key) => {
        if (Array.isArray(values[key])) {
            formData.append(key, JSON.stringify(values[key]));
        } else {
            formData.append(key, values[key]);
        }
    });

    // Append image separately
    if (values.image instanceof File) {
        formData.append('image', values.image);
    }
    try {
        const response = await fetch('http://localhost:4000/products/addProduct', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        
        if (response.ok) {
            setSuccess('Product uploaded successfully!');
            setError('');
        } else {
            setError(data.message || 'Error uploading product');
            setSuccess('');
            alert("successful")
        }
    } catch (err) {
        setError('Error uploading product');
        setSuccess('');
        alert("fail")
    } finally {
        setSubmitting(false);
    }
};

  return (
    <Box m="10px">
      <Header title="Add Products" />
      {selectedImage && (
        <Box mb="10px">
          <img src={selectedImage} alt="Selected" style={{ width: '50%', height: 'auto' }} />
        </Box>
      )}
      <Formik
        initialValues={{
          name: item ? item.name : "",
          name_mm: item ? item.name_mm : "",
          image: item ? item.image : "",
          recipe: item ? item.recipe : "",
          recipe_mm: item ? item.recipe_mm : "",
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
                <Box mt="20px" mb="20px">
                  <Button
                    variant="contained"
                    component="label"
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                </Box>
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
                    Save
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
                  label="recipe"
                  name="recipe"
                  value={values.recipe}
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
                  label="recipe (MM)"
                  name="recipe_mm"
                  value={values.recipe_mm}
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

export default AddProduct;
