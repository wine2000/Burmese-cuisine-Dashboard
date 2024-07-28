import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import { Delete } from '@mui/icons-material';

const CommentCard = ({ feedback, onDelete }) => {
  const handleDelete = () => {
    onDelete(feedback.id);
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {feedback.user.user} {/* Accessing the name property from the user object */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {feedback.comment}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="error"
          startIcon={<Delete />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default CommentCard;
