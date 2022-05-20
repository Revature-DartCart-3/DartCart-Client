import React from 'react'
import { AiFillStar } from 'react-icons/ai';
function ProductReviewCard({ 
    profilePic = "/man.jpg",
    fullName = "Unknown",
    title = 'After Years of FireTV, I am switching to Roku.', 
    rating = 5, 
    comment = `After the update I hate the interface for the following reasons;
1) It mixes content from a 100 different subscriptions services. So I see content that is on Hulu or HBO even if I am not subscribed to them. It's actually hard to find things that are just available on Prime for free now.
2) The IMDB video is annoying. I don't want to watch ads but Amazon wants me to watch ads. So IMDB video is filling up my feed when I'm not interested in it.
3) Amazon moved quite a few things out of Prime Video which was free and stuck it into IMDB so I have to watch ads. This made the Amazon Prime subscription less valuable.
` }) {
    return (
        <div style={{ textAlign: 'left' }}>
            <span >
                <img className="profile" src={
                   ( (profilePic!='') ? profilePic : "/man.jpg")
                } />
            </span>
            <span style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
                <h5>{fullName}</h5>


            </span>
            <br />

            {Array.from(Array(rating).keys()).map(c => {
                return (
                    <AiFillStar key={c} style={{ color: 'orange' }} />
                )
            })}
            <br />
            <h5><strong>{title}</strong></h5>
            <p style={{ fontSize: 12 }}>
                <br />
                </p>
            <p>{comment}</p>
        </div>
    )
}

export default ProductReviewCard