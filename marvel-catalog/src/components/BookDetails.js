import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/books/${id}`)
        .then(response => {
            setBook(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the book details', error);
        });
    }, [id]);

    if (!book) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <img src={book.cover_image} alt={book.title} />
            <h1>{book.title}</h1>
            <p>Author: {book.author}</p>
            <button onClick={() => window.location.href = `/books/${id}/read`}>Read Book</button>
        </div>
    );
};

export default BookDetails;