import React from 'react'
import Moment from 'react-moment';
import { Panel, ListGroup, ListGroupItem, ButtonToolbar, Button } from 'react-bootstrap';
import CommentItem from './CommentItem';

export default function CommentList({
    list,
    onCommentSelected,
    selectedId,
    updateComment,
    onChange,
    commentFormState,
    onCommentUnSelected,
    onDelete,
    onCommentVoteScoreSelected,
    focusTextInput,
    upVote,
    downVote
}) {
    // let textareaElement = null;
    return (
        <Panel >
            <h4 className="title">
                Comments
            </h4>
            <ListGroup>
                {list.sort((a, b) => b.voteScore - a.voteScore).map(item => (
                    <CommentItem
                        key={item.id} className="PostListItem"
                        selectedId={selectedId}
                        onCommentSelected={onCommentSelected}
                        onCommentUnSelected={onCommentUnSelected}
                        updateComment={updateComment}
                        commentFormState={commentFormState}
                        onChange={onChange}
                        focusTextInput={focusTextInput}
                        comment={item}
                        onCommentVoteScoreSelected={onCommentVoteScoreSelected}
                        onDelete={onDelete}
                        upVote={upVote}
                        downVote={downVote}
                    />
                ))}
            </ListGroup>
        </Panel>
    );
}
