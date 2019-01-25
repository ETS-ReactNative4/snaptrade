import React from 'react';

const SecondPageUI = ({ waitlistCount, email, onHomeSubmit, link
    }) =>
    <div className="container">
    <div className="thankyouwaitlist">
     <form className="form-inline">
        
            <h2>Thank you!! <br/> Your email has been added to our waitlist. </h2>
            <h4><b>{waitlistCount} people are before you({email})</b> <br/> <br/> You can jump ahead in the queue by inviting your friends. <br/> The more friends join, the earlier you get access.<br/></h4>
 
                        
                        <a  href="https://www.facebook.com/"><img src="/tutorial/facebook.png" width="50" height="50" style={{'padding': '10px 10px 10px 10px'}}/></a>
                        <a  href="https://www.linkedin.com/"><img src="/tutorial/linkedin.png" width="50" height="50" style={{'padding': '10px 10px 10px 10px'}}/></a>
                        <a  href="https://twitter.com/"><img src="/tutorial/twitter.png" width="50" height="50" style={{'padding': '10px 10px 10px 10px'}}/></a>
                     
            <h2>To invite a friend simply forward this url: <br/> <a href={link}>{link} </a></h2>
            <button type="submit" className="btn btn-primary form-control" onClick={onHomeSubmit}>Home</button>
        
     </form>
    </div>
    </div>

export default SecondPageUI;
