import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditSpotForm from "./EditSpot";

function EditSpotFormModal({ spotId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Update</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditSpotForm spotId={spotId} setShowModal={setShowModal} />
                    {/* <button onClick={() => setShowModal(false)}>Cancel</button> */}

                </Modal>
            )}
        </>
    );
}

export default EditSpotFormModal