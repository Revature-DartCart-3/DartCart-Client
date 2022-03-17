import React from 'react'
import { AiFillStar } from 'react-icons/ai';
function ProductReviewCard() {
    return (
        <div style={{ textAlign: 'left' }}>
            <span >
                <img src="/man.jpg" />
            </span>
            <span style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
                <h5>Unknown</h5>


            </span>
            <br />
            
            {Array.from(Array(4).keys()).map(c => {
                return (
                    <AiFillStar style={{ color: 'orange' }} />
                )
            })}
            <br />
            <h5><strong>After Years of FireTV, I am switching to Roku.</strong></h5>
            <p>Reviewed in the United States on April 29, 2021
                <br />
                Configuration: Fire TV StickVerified Purchase</p>
            <p>After the update I hate the interface for the following reasons;
                1) It mixes content from a 100 different subscriptions services. So I see content that is on Hulu or HBO even if I am not subscribed to them. It's actually hard to find things that are just available on Prime for free now.
                2) The IMDB video is annoying. I don't want to watch ads but Amazon wants me to watch ads. So IMDB video is filling up my feed when I'm not interested in it.
                3) Amazon moved quite a few things out of Prime Video which was free and stuck it into IMDB so I have to watch ads. This made the Amazon Prime subscription less valuable.
            </p>
        </div>
    )
}

export default ProductReviewCard