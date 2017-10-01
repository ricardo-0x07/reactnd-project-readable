import React from 'react'
import Moment from 'react-moment';
import {Link} from 'react-router-dom';


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
    console.log('list', list);
    return (
        <div className='Post'>
            <h3 className='subheader'>
                Comments
            </h3>
            <ul>
                {list.sort((a, b) => b.voteScore - a.voteScore).map(item => (
                    <li key={item.id} className="PostListItem">
                        {selectedId != item.id && <pre onClick={() => onCommentSelected(item)}>{item.body}</pre>}
                        {selectedId == item.id && <textarea
                            onBlur={() => {
                                onCommentUnSelected();
                                updateComment(commentFormState);
                            }}
                            name="body"
                            className="form-control"
                            value={commentFormState.body}
                            onChange={onChange}
                        ></textarea>}
                        <p>Author: {item.author}</p>
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
                                value={commentFormState.id == item.id ? commentFormState.voteScore : item.voteScore} />
                        </div>
                        <div>
                            Date: <Moment format="YYYY-MMM-DD">{item.timestamp}</Moment>
                        </div>
                        <button onClick={() => onCommentSelected(item)}>Edit</button>
                        <button onClick={() => onDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
