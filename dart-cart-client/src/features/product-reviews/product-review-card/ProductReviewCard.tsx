import { AiFillStar } from 'react-icons/ai';
function ProductReviewCard({ 
    profilePic = "/man.jpg",
    fullName = "",
    title = '', 
    rating = 0, 
    comment = `` }) {
    return (
        <div className='review-card'>
            <span >
                <img className="profile" src={
                   ( (profilePic!=='') ? profilePic : "/man.jpg")
                } alt="user avatar"/>
            </span>
            <span style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
                <h5>{fullName}</h5>
            </span>
            <br/>
            {Array.from(Array(rating).keys()).map(c => {
                return (
                    <AiFillStar key={c} style={{ color: 'orange' }} />
                )
            })}
            <br /><br/>
            <h5><strong>{title}</strong></h5>
            <p> {comment} </p>
        </div>
    )
}

export default ProductReviewCard