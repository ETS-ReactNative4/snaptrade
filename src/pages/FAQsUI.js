import React from 'react';

const FAQsUI = () =>
    <div className="container">

        <h1 id="faqtop">Snaptrade FAQ</h1>
        <ul className="faqs">
            <li><a href="#whatissnaptrade">What is Snaptrade.us?</a></li>
            <li><a href="#features">What features/tools you provide?</a></li>
            <li><a href="#howtouse">How to use the site?</a></li>
            <li><a href="#Technical_analysis">What is technical analysis and how does it help to pick winning stocks?</a></li>
            <li><a href="#columns">Column definitions. What are the different price/volume columns signify?</a></li>
            <li><a href="#aboutus">About us?</a></li>
            <li><a href="#questions">questions</a></li>

        </ul>

        <div className="faqans">
            <div className="faq" id="whatissnaptrade">
                <h2>What is Snaptrade.us?</h2>
                <p>Snaptrade provides a set of tools to casual investors to help them acquire and improve their investing/trading skills. However, to access some of these tools, you will need to create a free Snaptrade account.  We do not run advertisements on the site
                or share your data. Though these tools can work on all stock markets, presently we only cover stocks from three main US stock exchanges - NYSE, NASDAQ, and AMEX.</p>
            </div>

            <div className="backtotop"><a href="#faqtop">^</a></div>

            <div className="faq" id="features">
                <h2>What features/tools does Snaptrade provide?</h2>
                <p>In our first version, we provide three features/tools.
                <ul>
                <li>Technical Signals: This feature provides a daily lists of stocks that are showing bullish trends captured by our nightly automated market scan that is based on a set of technical indicators
                on price and volume.
                We also track gains once a stock is flagged in the scan and use subsequent price actions to narrow down the list further that validates the trend.  Our goal is
                to help you look  for new stocks or highlight stocks from your watchlist that demonstrate good price/volume actions and help you make an informed decision to buy /sell.
                It may help to read up on the <a href="https://en.wikipedia.org/wiki/Technical_analysis" target="_a">basics</a> of technical analysis if you are not familiar with the process.
                </li>
                <li><b>Collaboration with others</b>: We provide an easy way to collaborate with your trusted friends to gain from their perspective.
                For example, you can share your watchlist with your network of friends to get their inputs as you add/remove stocks. Your friends know what you are currently
                focusing on and can provide their inputs. Similarly, you can benefit from your friends when they share their watchlists.  Similar to watchlist, you can share
                your opinions about specific stocks.
                It always helps to gain from the perspective of others and similarly when someone in your network has a winning stock, you also benefit due to sharing.
                When you share your watchlist, it is all within your private network and is only visible to you and those you share it with.
                We feel the value and efficiency of collaboration is much more when it is done privately and within a trusted network unlike other open forums on the
                internet.
                </li>
                <li><b>Watchlist Management</b>: We provide an easy way to manage your watchlist and navigate across your list quickly to identify
                new patterns.  We calculate quite a few price and volume trend metrics to give you incremental insights.  You can easily click the down arrow to quickly check the details of a stock and jump
                back to your watchlist.  Information for each stock also includes: a chart with basic summary stats, past signals of the stock, historical prices
                and a collaboration section which has comments/ratings from your trusted network of friends.
                </li>
                </ul>
                </p>
            </div>

            <div className="backtotop"><a href="#faqtop">^</a></div>

            <div className="faq" id="howtouse">
                <h2>How do I use Snaptrade effectively?</h2>
                <p>
                <li>Track Signals / Gains:Y ou can track a daily list of signals/gains on Snaptrade.  Feel free to adjust the filters like price, volume, sectors to suit your needs and comfort level.
                For example, if you are interested in crypto currencies, you can choose "crypto currency" from the sectors drop down menu.  The Signals section [at the bottom of the
                home page] gives you daily signals and the top part tracks gains from those signals for the last 30 days.
                </li><li>
                Explore and share: If something looks interesting from the list, you can drill down further by clicking the down arrow and see the chart, historical price/volume.
                You can also share it with your friends to ask their opinion using the share feature.
                </li><li>
                Tag and Watch: If you are interested in a stock and want to track it, click "Add to watchlist" to include it on your watchlist. You can also create a tag to categorize it,
                for example: tag it as "Tech" or "Hot stock".  A stock can also have multiple tags.  Grouping stocks through tags will help
                you look at the stocks aggregate and assign varying levels of importance on different categories.
                You can easily track multiple tagged -watchlists very easily from the watchlist tab.  Use the "+" or "-" signs to add/remove stocks from your watchlist.
                </li><li>Collaborate: You can share your tagged watchlist with your investment buddies by sending them an email invite. The shared watchlist is similar to your own watchlist, but with the username of the owner at the top of the list.  Users commonly use
                the "holding" tag to refer to the group of stocks they currently own.
                </li>
                </p>
            </div>

            <div className="backtotop"><a href="#faqtop">^</a></div>

            <div className="faq" id="Technical_analysis">
                <h2>What is technical indicator/analysis and how does it help me to pick stocks?</h2>
              <p>
              Technical analysis of stocks/ETFs includes the study of technical indicators and past trends. For technical analysis of stock and trends here we employ the use of tools such as trading volumes, Simple Moving averages, RSI (14), and ATR (14) to determine the future behavior of a stock. Much of this practice involves discovering the overall trend line of a stock’s movement. Technical analysis of stocks and trends has been used by serious traders for decades. Although it does not guarantee success and is not 100% accurate, it is still one of the two key methods of analyzing stock prices, along with fundamental analysis.
              </p>
          </div>

          <div className="backtotop"><a href="#faqtop">^</a></div>


              <div className="faq" id="columns">
                  <h2>Column definitions? What do the various price/volume columns signify?</h2>
                  <p>
                  <li><strong>Vol Chg%</strong>:
                  This indicates how intra-day volume (i.e. realtime volume) is trending compared to a 30-day average.  It takes current real-time volume during the market
                  and pro-rates it to the end of the day(EOD) and compares it with 30-day average volume and indicates by what % the intra-day volume is higher or lower.  Since volume is a
                  significant indicator and it reinforces the current price trend, knowing if the volume is stronger or weaker than normal
                  at the begining of the day and taking action accordingly provides a competitive edge.
                  But before the day ends, it is always difficult to know, how the volume compares as the volume calculation is always based on EOD volume.  So we do the
                  hard work for you, and using intra-day volume and total hours passed and hours remaining, determine and bring you the insight.
                  The number gets updated every hour as the day progresses and then stops changing when market closes.
                  </li><li>
                  <strong>Chg%(3d)</strong>:
                  This refers to how the closing(end-of-the-day) price from yesterday compares to that of three days ago. If the price increased, it will be positive and vice-versa.
                  A similar calculation exists for 7-day and 14-day periods as denoted by Chg% 7d and Chg% 14d.
                  </li><li>
                  <strong>Avg Vol Chg(3d):</strong>
                  Average volume is calculated based on a 30-day average volume of total shares traded (we calculate based on EOD volume).  If the column displays 3d, it refers to how the average volume
                  as of closing on the most recent day compare with that of three days ago.  The same principle is applied to 14d or 30d.
                  </li><li>
                  <strong>RSI 14day</strong> :
                  RSI refers to Relative Strength Index.  It is a technical indicator to demonstrate if a stock is over-bought or oversold based on the price calculation
                  in the last few days.  If the RSI is greater than 90, it means the stock was overbought and the RSI is less than 20, this means the stock was oversold.
                  For more info, <a href="https://en.wikipedia.org/wiki/Relative_strength_index" target="_blank">here</a> (Source: Wikipedia).

                  </li>
                  </p>
              </div>

              <div className="backtotop"><a href="#faqtop">^</a></div>

              <div className="faq" id="aboutus">
                  <h2> About us?</h2>
                  <p>
                  <div className="questions" id="questions">
                  SnapTrade is founded by a team of entrpreuneurs who are passionate about investing and building websites/apps for consumers.
                  Our goal is to help casual investors be more skilled in investing/trading. We believe everyone deserves the access to world-class tools for
                  investing as the big guys.
                  We have experience in software engineering, product design, growth hacking, data and machine learning
                  and social media, and hail from companies like Facebook, Google, Oracle, eTrade, TD Ameritrade and Opera-Software. We are also active investors/traders for 10+ years
                  in US equities
              </div>
              </p>
              </div>


              <div className="faq" id="questions">
                  <h2> Follow-up/Other Questions?</h2>
                  <p>
                  <div className="questions" id="questions">
                    If you have any questions, please use our feedback link to ask a question privately.  Also check our Facebook group to get your answers
                    and tips on how other people are using Snaptrade.
                  </div>
                  </p>
        </div>
        </div>
    </div>

export default FAQsUI;
