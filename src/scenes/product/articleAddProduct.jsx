import React, { useState } from "react";
import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  name_mm: Yup.string().required("Name (MM) is required"),
  description: Yup.string().required("Description is required"),
  description_mm: Yup.string().required("Description (MM) is required"),
  category: Yup.string().required("Category is required"),
});

const ArticleAddProduct = () => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('name_mm', values.name_mm);
      formData.append('description', values.description);
      formData.append('description_mm', values.description_mm);
      formData.append('category', values.category);
      if (file) formData.append('image', file); // Append file only if it's present
  
      const response = await fetch('http://localhost:4000/articles/createArticle', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        alert('Article added successfully!');
        navigate("/products");
      } else {
        const errorData = await response.text(); // Use text() to handle non-JSON responses
        console.error('Server responded with:', errorData);
        alert(`Error: ${errorData}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file)); // Create preview URL
  
    // Debugging: Log file details
    console.log('Selected file:', file);
  };

  return (
    <Box m="20px" maxWidth="600px" mx="auto">
      <Typography variant="h4" sx={{ fontSize: '2rem', textAlign: 'center', fontWeight: 'bold', color: 'secondary' }} gutterBottom>Add Article</Typography>
      <Formik
        initialValues={{
          name: "",
          name_mm: "",
          description: "",
          description_mm: "",
          category: ""
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <Form>
            <Box mb="20px">
              <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                fullWidth
                margin="normal"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'yellow' }, '&:hover fieldset': { borderColor: 'green' }, '&.Mui-focused fieldset': { borderColor: 'blue' } } }}
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
                error={touched.name_mm && Boolean(errors.name_mm)}
                helperText={touched.name_mm && errors.name_mm}
                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'yellow' }, '&:hover fieldset': { borderColor: 'green' }, '&.Mui-focused fieldset': { borderColor: 'blue' } } }}
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
                error={touched.category && Boolean(errors.category)}
                helperText={touched.category && errors.category}
                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'yellow' }, '&:hover fieldset': { borderColor: 'green' }, '&.Mui-focused fieldset': { borderColor: 'blue' } } }}
              />
              <TextField
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'yellow' }, '&:hover fieldset': { borderColor: 'green' }, '&.Mui-focused fieldset': { borderColor: 'blue' } } }}
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
                multiline
                rows={4}
                error={touched.description_mm && Boolean(errors.description_mm)}
                helperText={touched.description_mm && errors.description_mm}
                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'yellow' }, '&:hover fieldset': { borderColor: 'green' }, '&.Mui-focused fieldset': { borderColor: 'blue' } } }}
              />
            
              <Box mb="20px">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <IconButton color="primary" component="span">
                    <CloudUploadIcon />
                  </IconButton>
                  <Typography variant="body1" ml="10px">Upload Image</Typography>
                </label>
                {preview && (
                  <Box mt="10px">
                    <img
                      src={preview}
                      alt="Preview"
                      style={{ width: '150px', height: 'auto', objectFit: 'cover' }}
                    />
                  </Box>
                )}
              </Box>
              
              <Box mt="20px" textAlign="center">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                >
                  Add Article
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ArticleAddProduct;
