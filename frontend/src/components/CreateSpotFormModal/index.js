import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateSpotForm from "./CreateSpotForm";

function CreateSpotFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Host a Spot</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateSpotForm />
                    {/* <button onClick={() => setShowModal(false)}>Cancel</button> */}

                </Modal>
            )}
        </>
    );
}

export default CreateSpotFormModal