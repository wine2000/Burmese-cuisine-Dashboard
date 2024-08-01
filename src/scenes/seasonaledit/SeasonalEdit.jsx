import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeasonalEdit = ({ productId }) => {

    console.log("id",productId)
    const [product, setProduct] = useState({
        name: '',
        name_mm: '',
        image: '',
        recipe: '',
        recipe_mm: '',
        ingredients: [{ name: '', amount: '', unit: '' }],
        ingredients_mm: [{ name: '', amount: '', unit: '' }],
        category: '',
        category_mm: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/products/product/'${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product data', error);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleIngredientChange = (index, e, lang) => {
        const { name, value } = e.target;
        const updatedIngredients = product[lang].map((ingredient, i) =>
            i === index ? { ...ingredient, [name]: value } : ingredient
        );
        setProduct({
            ...product,
            [lang]: updatedIngredients
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/products/${productId}`, product);
            console.log('Product updated', response.data);
        } catch (error) {
            console.error('Error updating product', error);
        }
    };

    return (
        <form 
        style={{paddingLeft:30}}

        onSubmit={handleSubmit}>
            <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required />
            <input type="text" name="name_mm" value={product.name_mm} onChange={handleChange} placeholder="Product Name (MM)" required />
            <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="Image URL" required />
            <textarea name="recipe" value={product.recipe} onChange={handleChange} placeholder="Recipe" required></textarea>
            <textarea name="recipe_mm" value={product.recipe_mm} onChange={handleChange} placeholder="Recipe (MM)" required></textarea>

            {product.ingredients.map((ingredient, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="name"
                        value={ingredient.name}
                        onChange={(e) => handleIngredientChange(index, e, 'ingredients')}
                        placeholder="Ingredient Name"
                        required
                    />
                    <input
                        type="text"
                        name="amount"
                        value={ingredient.amount}
                        onChange={(e) => handleIngredientChange(index, e, 'ingredients')}
                        placeholder="Amount"
                        required
                    />
                    <input
                        type="text"
                        name="unit"
                        value={ingredient.unit}
                        onChange={(e) => handleIngredientChange(index, e, 'ingredients')}
                        placeholder="Unit"
                        required
                    />
                </div>
            ))}

            {product.ingredients_mm.map((ingredient, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="name"
                        value={ingredient.name}
                        onChange={(e) => handleIngredientChange(index, e, 'ingredients_mm')}
                        placeholder="Ingredient Name (MM)"
                        required
                    />
                    <input
                        type="text"
                        name="amount"
                        value={ingredient.amount}
                        onChange={(e) => handleIngredientChange(index, e, 'ingredients_mm')}
                        placeholder="Amount (MM)"
                        required
                    />
                    <input
                        type="text"
                        name="unit"
                        value={ingredient.unit}
                        onChange={(e) => handleIngredientChange(index, e, 'ingredients_mm')}
                        placeholder="Unit (MM)"
                        required
                    />
                </div>
            ))}

            <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" required />
            <input type="text" name="category_mm" value={product.category_mm} onChange={handleChange} placeholder="Category (MM)" required />

            <button type="submit">Update Product</button>
        </form>
    );
};

export default SeasonalEdit;
