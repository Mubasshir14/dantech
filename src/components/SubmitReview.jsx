import React, { useContext, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'; // Correct way to import the CSS

import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';

const SubmitReview = ({ user: propUser, productName, onReviewSubmitted }) => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire({
                title: 'Erreur !',
                text: 'Vous devez être connecté pour soumettre un avis.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const review = {
            rating,
            reviewText,
            productName,
            name: user.displayName 
        };
        console.log(review);
        setIsLoading(true); 

        try {
            const response = await axios.post('https://dantech-server.onrender.com/reviews', review);
            if (response.status === 201) {
                Swal.fire({
                    title: 'Succès !',
                    text: 'Votre avis a été soumis.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                if (typeof onReviewSubmitted === 'function') {
                    onReviewSubmitted();
                } else {
                    console.error('onReviewSubmitted n\'est pas une fonction');
                }
                setRating(0);
                setReviewText('');
            } else {
                Swal.fire({
                    title: 'Erreur !',
                    text: 'Quelque chose a mal tourné. Veuillez réessayer.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Erreur !',
                text: `Erreur lors de la soumission de l'avis : ${error.response?.data || error.message}`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="review-container bg-[#097969] p-4 rounded">
            <form onSubmit={handleSubmit}>
                <div className="rating-section flex items-center mb-2">
                    <label htmlFor="rating" className="mr-2 text-white">Évaluation :</label>
                    <Rating
                        value={rating}
                        onChange={setRating}
                        style={{ maxWidth: 180 }} 
                    />
                </div>
                <div className="review-section flex items-center gap-3 mb-2">
                    <label htmlFor="review" className="mr-2 text-white">Avis</label>
                    <input
                        id="review"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                        type="text"
                        placeholder="Écrivez votre avis ici..."
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>
                <button
                    type="submit"
                    className={`submit-button bg-[#097969] border-2 btn mt-2 text-white ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Soumission...' : 'Soumettre l\'avis'}
                </button>
            </form>
        </div>
    );
};

export default SubmitReview;
