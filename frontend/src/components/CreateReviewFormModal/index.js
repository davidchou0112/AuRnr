import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReviewForm from './CreateReviewForm';

function CreateReviewFormModal({ reviewId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='reviewButton' onClick={() => setShowModal(true)}>Create a Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateReviewForm reviewId={reviewId} setShowModal={setShowModal} />
                    {/* <button onClick={() => setShowModal(false)}>Cancel</button> */}
                </Modal>
            )}
        </>
    );
}

export default CreateReviewFormModal