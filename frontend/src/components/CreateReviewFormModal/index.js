import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateReviewForm from "./CreateReviewForm";

function CreateReviewFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Create a Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateReviewForm setShowModal={setShowModal} />
                    {/* <button onClick={() => setShowModal(false)}>Cancel</button> */}

                </Modal>
            )}
        </>
    );
}

export default CreateReviewFormModal