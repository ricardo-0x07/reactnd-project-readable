import React from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

export default function Post({ post, onDelete }) {
    return (
        <div className="Post">
            <div className="title">
                <h1>Post</h1>
            </div>

            <h4>Title: {post.title}</h4>
            <p>Author: {post.author}</p>
            <pre>{post.body}</pre>
            <div >Vote Score: {post.voteScore}</div>
            <div >
                Date: <Moment format="YYYY-MMM-DD">{post.timestamp}</Moment>
            </div>
            <div className="open-search">
                <Link to={`/create/${post.id}`}>Edit</Link>
                <button onClick={() => onDelete(post.id)}>Delete</button>                        
            </div>
        </div>
    );
}

