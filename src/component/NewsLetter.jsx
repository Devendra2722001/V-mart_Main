import React from 'react';

const Newsletter = () => {
    return (
        <>

                <div className="card_News">
                    <div className="subscribe">
                        <div><h2>Want An Price Drop Alert ?</h2>
                        <p>Subscribe To Our Newsletter To Stay Updated with our letest Offers and Amazing Deals</p></div>
                        
                        <form>
                        <input type="email" name="email" id="email" placeholder="Enter your email address" autocomplete="off"/>
                        <button type="button">Subscribe</button>
                        </form>
                    </div>
                </div>
       
        </>
    )
}

export default Newsletter;
