
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import './BookingConfirmation.css'
import aircover from '../GetSingleSpot/aircover.png'
import check from './checkmark.png'
import superhost from '../GetSingleSpot/badge.png'
const BookingConfirmation = ({ setShowBkConfirmation }) => {


    return (
        <>
            <div className="bk_conf_container">
                <div className="bk_confirmation_wrapper">
                    <div className="conf_header">
                        <div id='confirmation_text'>Your Booking is Confirmed!</div>
                        <div className="bk_conf_linebreak"></div>
                    </div>
                    <div className="badges_wrapper">
                        <div className="bk_modal_footer">
                            <img id='bk_modal_aircover' src={aircover} />
                            <img className="check" src={check} />
                        </div>
                        <div className="bk_modal_footer" id='bkMtxt'>
                            <div className="bk_modal_footer_col">
                                <img id='bk_modal_superhost' src={superhost} />
                                <div className="bk_modal_txt">Superhost</div>
                            </div>
                            <img className="check" src={check} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default BookingConfirmation