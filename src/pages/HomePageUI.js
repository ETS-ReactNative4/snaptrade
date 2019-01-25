import React from 'react';

const HomePageUI = ({}) =>

        <div className="homepagehero" style={{color: '#cfd2da'}}>

                <h2 className="hero-title">HELPING YOU TO BE<br/> A SKILLED INVESTOR</h2>
                <div className="getstarted-btn" style={{marginTop: 40}}>
                  <a href="/dashboard" className="btn btn-primary btn-lg">Get Started</a>
                </div>

                {/*
                <div class="row" style={{marginTop: 100, marginLeft: 20, marginRight: 20, zIndex: 1}}>
                  <div class="col-sm-4 col-md-4">
                    <div class="thumbnail" style={{width: 240, margin: 'auto', backgroundColor: '#356', border: 0}}>
                      <div class="caption">
                        <p style={{color: '#ddd'}}>Get stock recommendations based on technical indicators</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4">
                    <div class="thumbnail" style={{width: 240, margin: 'auto', backgroundColor: '#356', border: 0}}>
                      <div class="caption">
                        <p style={{color: '#ddd'}}>Collaborate with your friends to gain from trusted collective research</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4 col-md-4">
                    <div class="thumbnail" style={{width: 240, margin: 'auto', backgroundColor: '#356', border: 0}}>
                      <div class="caption">
                        <p style={{color: '#ddd'}}>Manage your watchlist better to get new stock ideas</p>
                      </div>
                    </div>
                  </div>
                </div>
                */}

          <div className="herooverlay"></div>
      </div>

export default HomePageUI;
