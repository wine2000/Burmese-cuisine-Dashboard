import React, { useState } from 'react';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    name_mm: '',
    image: null,
    recipe: '',
    recipe_mm: '',
    ingredients: [{ name: '', amount: '', unit: '' }],
    ingredients_mm: [{ name: '', amount: '', unit: '' }],
    category: '',
    category_mm: '',
  });

  const handleChange = (e, index, isMM = false) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else if (name.startsWith('ingredient')) {
      const ingredients = isMM ? formData.ingredients_mm : formData.ingredients;
      ingredients[index][name.split('_')[1]] = value;
      setFormData({
        ...formData,
        [isMM ? 'ingredients_mm' : 'ingredients']: [...ingredients],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addIngredient = (isMM = false) => {
    const key = isMM ? 'ingredients_mm' : 'ingredients';
    setFormData({
      ...formData,
      [key]: [...formData[key], { name: '', amount: '', unit: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
  
    form.append('name', formData.name);
    form.append('name_mm', formData.name_mm);
    form.append('image', formData.image);
    form.append('recipe', formData.recipe);
    form.append('recipe_mm', formData.recipe_mm);
    form.append('category', formData.category);
    form.append('category_mm', formData.category_mm);
    
    form.append('ingredients', JSON.stringify(formData.ingredients));
    form.append('ingredients_mm', JSON.stringify(formData.ingredients_mm));
  
    try {
      const response = await fetch('http://localhost:4000/products/addProduct', {
        method: 'POST',
        body: form,
      });
  
      if (response.ok) {
        console.log("ok",response)
        alert('Product added successfully!');
        // Reset form or handle success
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
  
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="name_mm"
        placeholder="Product Name (MM)"
        value={formData.name_mm}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="image"
        onChange={handleChange}
        accept="image/*"
        required
      />
      <textarea
        name="recipe"
        placeholder="Recipe"
        value={formData.recipe}
        onChange={handleChange}
        required
      />
      <textarea
        name="recipe_mm"
        placeholder="Recipe (MM)"
        value={formData.recipe_mm}
        onChange={handleChange}
        required
      />

      <h3>Ingredients</h3>
      {formData.ingredients.map((ingredient, index) => (
        <div key={index}>
          <input
            type="text"
            name="ingredient_name"
            placeholder="Ingredient Name"
            value={ingredient.name}
            onChange={(e) => handleChange(e, index)}
            required
          />
          <input
            type="text"
            name="ingredient_amount"
            placeholder="Amount"
            value={ingredient.amount}
            onChange={(e) => handleChange(e, index)}
            required
          />
          <input
            type="text"
            name="ingredient_unit"
            placeholder="Unit"
            value={ingredient.unit}
            onChange={(e) => handleChange(e, index)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={() => addIngredient()}>
        Add Ingredient
      </button>

      <h3>Ingredients (MM)</h3>
      {formData.ingredients_mm.map((ingredient, index) => (
        <div key={index}>
          <input
            type="text"
            name="ingredient_name"
            placeholder="Ingredient Name (MM)"
            value={ingredient.name}
            onChange={(e) => handleChange(e, index, true)}
            required
          />
          <input
            type="text"
            name="ingredient_amount"
            placeholder="Amount (MM)"
            value={ingredient.amount}
            onChange={(e) => handleChange(e, index, true)}
            required
          />
          <input
            type="text"
            name="ingredient_unit"
            placeholder="Unit (MM)"
            value={ingredient.unit}
            onChange={(e) => handleChange(e, index, true)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={() => addIngredient(true)}>
        Add Ingredient (MM)
      </button>

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category_mm"
        placeholder="Category (MM)"
        value={formData.category_mm}
        onChange={handleChange}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
