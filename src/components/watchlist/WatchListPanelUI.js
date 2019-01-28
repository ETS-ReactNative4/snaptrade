import React from 'react';
import TagFilterBox from './TagFilterBox.js';
import AddTickersBox from './AddTickersBox.js';
import LikePanelUI from '../engagement/LikePanelUI.js';
import CommentsPanelUI from '../engagement/CommentsPanelUI.js';
import ChartWatchList from './ChartWatchList';
import SharePanel from './SharePanel.js';
import MainTickerTable from '../widgets/table/MainTickerTable.js';

const WatchListPanelUI = ({
                              context, anonymous, watchList,
                              filteringTagObj, tagObjList,
                              onFilterByTagClick, onRefreshClick,
                              onRowTickerClick, onDeleteWatchlistTickerSubmit,
                              showTagsModal, onShowTagsModal, onShowPriceQtyModal,
                              ratingSummary, commentSummary, shareSummary,
                              onEngagementChange,
                              onWatchlistTickersChange, onWatchlistTagsChange,
                              onThumbsUp, onThumbsDown,
                              newComment, commentList, onCommentChange, onCommentPost,
                              embeddableTagUuid
                          }) =>
    <div>
        {
            !embeddableTagUuid &&
            <TagFilterBox
                context={context}
                filteringTagObj={filteringTagObj}
                tagObjList={tagObjList}
                onFilterByTagClick={onFilterByTagClick}
                onWatchlistTagsChange={onWatchlistTagsChange}
            />
        }

        {
            !filteringTagObj && !embeddableTagUuid &&
            <div style={{alignItems:"center"}}>

                <div style={{width:"100%", padding:"10px"}}><ChartWatchList/></div>
                <p align="center">Simulated Paper Portfolio based on all stocks in your watchlist</p>
                <AddTickersBox
                    onWatchlistTickersChange={onWatchlistTickersChange}
                />
                
            </div>
        }

        {
            filteringTagObj && !embeddableTagUuid &&
            <div>
                <AddTickersBox
                    filteringTagObj={filteringTagObj}
                    onWatchlistTickersChange={onWatchlistTickersChange}
                />

                <div style={{float: "right"}}>
                    <LikePanelUI
                        anonymous={anonymous}
                        objectId={filteringTagObj.tag_id}
                        ratingSummary={ratingSummary}
                        onThumbsUp={onThumbsUp}
                        onThumbsDown={onThumbsDown}
                    />
                </div>
                <div className='clearfix'/>
                <div style={{width:"100%"}}><ChartWatchList/></div>
            </div>
        }


        <MainTickerTable
            context={context}
            tickerList={watchList}
            columnList={new Set(['3d_change_pct', 'volume', 'volume_chg', 'pe_ratio', 'market_cap', 'off_52wk_high', 'signal_strength', 'signal_name', 'is_watchlist'])}
            initialSortColumn='price_pct_increase_over_last_day'
            initialSortOrder='desc'
            filteringTagObj={filteringTagObj}
            embeddableTagUuid={embeddableTagUuid}
            onShowTagsModal={onShowTagsModal}
            onShowPriceQtyModal={onShowPriceQtyModal}
            onDeleteWatchlistTickerSubmit={onDeleteWatchlistTickerSubmit}
            onRefreshClick={onRefreshClick}
        />

        {
            filteringTagObj && !embeddableTagUuid &&
            <CommentsPanelUI
                anonymous={anonymous}
                objectId={filteringTagObj == null ? null : filteringTagObj.tag_id}
                objectName={filteringTagObj == null ? null : filteringTagObj.tag}
                commentSummary={commentSummary}
                newComment={newComment}
                commentList={commentList}
                onCommentChange={onCommentChange}
                onCommentPost={onCommentPost}
            />
        }

        {!anonymous && filteringTagObj && filteringTagObj.owner === 'self' && !embeddableTagUuid &&
        <SharePanel
            anonymous={anonymous}
            shareSummary={shareSummary}
            filteringTagObj={filteringTagObj}
            onEngagementChange={onEngagementChange}
        />
        }
    </div>

export default WatchListPanelUI;
