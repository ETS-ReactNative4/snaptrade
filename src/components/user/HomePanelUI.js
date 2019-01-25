import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';


const HomePanelUI = ({email, successMessage,
    errorMessage, onEmailEdit,
    onEmailSubmit, waitlistCount, x
    }) =>

 <div>
      <div className="homepagehero">
         <div className="herooverlay">
         </div>
                  <form className="form-inline">

                    <div className="heroText">
                      <div className="form-group">
                        <div className='text-center'>
                        { x===1 && 
                          <h2>$0 Commission Trading  <br/>Advanced Investment Tools <br/> Support <br/><span>Do not settle for less.. Trade Smart!!</span> </h2>
                        }
                        { x===2 &&
                        <h2>Do not settle for less.. Trade Smart!! <br/> <span> $0 Commission Trading + Advanced Investment Tools + Support </span></h2>
                        }
                        { x===3 &&
                        <h2>$0 Commission Trading  <br/>Advanced Investment Tools <br/> Support <br/><span>Do not settle for less just because you are paying no commission!!</span> </h2>
                        }
                        </div>
                      </div>

                     <div className="homesignup-form">
                      <input type="email" size="30" className="form-control" id="waitemail"
                        value={email} placeholder="Email" onChange={onEmailEdit} />
                       <button type="submit" className="btn btn-primary form-control" onClick={onEmailSubmit}>Get in the Waitlist</button>
                       <span className='text-muted small hide' style={{'top': '48%','left': '69%', 'position': 'absolute', 'color':'black'}}> launching 2019</span>
                     </div>
                     <br/>
                      {
                      errorMessage &&
                     <div className='text-danger' style={{'font-size': 'large'}}>{errorMessage}</div>                     
                     }
                     
                      <div className="form-group signedupmsg">
                       <div className='text-center' style={{'display':'inline-block'}}>
                          <span>{waitlistCount} people have already decided to trade smart</span>
                        </div>
                      </div>
                     </div>

                  </form>
                  {
                  successMessage &&
                  <span className='text-success'><br/>{successMessage}</span>
                  }


      </div>

    </div>




export default HomePanelUI;
