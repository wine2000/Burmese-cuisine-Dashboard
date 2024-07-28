import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import CommentCard from "../commentCard/commentCard";
import Header from "../../components/Header";

const Team = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`http://localhost:4000/feedback/allFeedback`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log("Fetched data:", data);

        const feedbacksWithIdAndName = data.map(feedback => ({
          ...feedback,
          id: feedback._id,
          user: { ...feedback.user},
        }));
      console.log(data.name);
        console.log("Mapped feedbacks with ID and name:", feedbacksWithIdAndName);
        setFeedbacks(feedbacksWithIdAndName);
      } catch (error) {
        console.error("Fetch error:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/feedback/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete feedback');
      }

      setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
    } catch (error) {
      console.error("Delete error:", error.message);
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box m="20px">
      <Header title="Comment" subtitle="Customer's Comments" />
      <Box mt="20px">
        {feedbacks.map(feedback => (
          <CommentCard key={feedback.id} feedback={feedback} onDelete={handleDelete} />
        ))}
      </Box>
    </Box>
  );
};

export default Team;
