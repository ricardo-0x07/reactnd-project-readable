import React from 'react'
import Moment from 'react-moment';
import { Panel, ListGroup, ListGroupItem, ButtonToolbar, Button } from 'react-bootstrap';

export default function CommentList({
    list,
    onCommentSelected,
    selectedId,
    updateComment,
    onChange,
    onVoteChange,
    commentFormState,
    onCommentUnSelected,
    onDelete,
    onCommentVoteScoreSelected
}) {
    return (
        <Panel >
            <h4 className="title">
                Comments
            </h4>
            <ListGroup>
                {list.sort((a, b) => b.voteScore - a.voteScore).map(item => (
                    <ListGroupItem key={item.id} className="PostListItem">
                        {selectedId !== item.id && <pre onClick={() => onCommentSelected(item)}>{item.body}</pre>}
                        {selectedId === item.id && <textarea
                            onBlur={() => {
                                onCommentUnSelected();
                                updateComment(commentFormState);
                            }}
                            name="body"
                            className="form-control"
                            value={commentFormState.body}
                            onChange={onChange}
                        ></textarea>}
                        <p className="Author">Author: {item.author}</p>
                        <div>Vote Score:
                            <input
                                className="form-control"
                                name="voteScore"
                                id="number"
                                type="number"
                                onFocus={() => onCommentVoteScoreSelected(item)}
                                onChange={onChange}
                                onBlur={() => {
                                    updateComment(commentFormState);
                                }}
                                value={commentFormState.id === item.id ? commentFormState.voteScore : item.voteScore} />
                        </div>
                        <div>
                            Date: <Moment format="YYYY-MMM-DD">{item.timestamp}</Moment>
                        </div>
                        <ButtonToolbar>
                            <Button onClick={() => onCommentSelected(item)}>Edit</Button>
                            <Button onClick={() => onDelete(item.id)}>Delete</Button>
                        </ButtonToolbar>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Panel>
    );
}
