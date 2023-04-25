

const Booking = () => {
    return (
        <div className="price-rating-container">
            <div className="prc-header">
                <div>
                    <span className="one-spot-price">${oneSpot.price}</span> night
                </div>
                <div className="pr-review">
                    <span>
                        {oneSpot.avgRating ?
                            (<span className="bold">★ {oneSpot.avgRating}</span>) :
                            (<span className="bold">★ New</span>)
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Booking