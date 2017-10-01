import React from 'react'
import Moment from 'react-moment';
import {Link} from 'react-router-dom';


export default function PostList({
    list,
    onSort,
    sortBy,
    postFormState,
    onPostVoteScoreSelected,
    onChange,
    updatePost
}) {
    console.log('list', list);
    console.log('sortBy', sortBy);
    // let sortedList = list.sort(sortOptions[sortBy]);
    // console.log('sortedList', sortedList);
    // onUpdate(sortedList);
    return (
        <div className='PostList'>
            <h3 className='subheader'>
                Posts
            </h3>
            <ul>
                {list.map(item => (
                    <li key={item.id} className="PostListItem">
                        <h4>Title: {item.title}</h4>
                        <p>Author: {item.author}</p>
                        <div onClick={() => onSort('voteScore')}>Vote Score: {item.voteScore}</div>
                        <div>Vote Score:
                            <input
                                className="form-control"
                                name="voteScore"
                                id="number"
                                type="number"
                                onFocus={() => onPostVoteScoreSelected(item)}
                                onChange={onChange}
                                onBlur={() => {
                                    updatePost(postFormState);
                                }}
                                value={postFormState.id && postFormState.id == item.id ? postFormState.voteScore : item.voteScore} />
                        </div>

                        <div onClick={() => onSort('timeStamp')}>
                            Date: <Moment format="YYYY-MMM-DD">{item.timestamp}</Moment>
                        </div>
                        <Link to={`/postdetails/${item.id}`}>View Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
