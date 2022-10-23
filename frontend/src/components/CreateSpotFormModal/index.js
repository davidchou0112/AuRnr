import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSpotForm from './CreateSpotForm';

function CreateSpotFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='hostASpot' onClick={() => setShowModal(true)}>Host a Spot</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateSpotForm setShowModal={setShowModal} />
                    {/* <button onClick={() => setShowModal(false)}>Cancel</button> */}

                </Modal>
            )}
        </>
    );
}

export default CreateSpotFormModal