import React from 'react';
import {Grid, Row, Col, Panel, ListGroup, ListGroupItem, ButtonToolbar, Button} from 'react-bootstrap';

export default function CommentForm({ onSave, onChange, comment, errors, saving }) {
    console.log('comment', comment);
    return (
        <div className="comment-form-container">
            <div className="title">
                <h4>New Comment</h4>
            </div>
            <div className="list-comment-content">
                <div>
                    <form onSubmit={onSave} className='create-comment-form'>
                        <div className="form-group">
                            <label htmlFor="body">Comment:</label>
                            <textarea
                                value={comment.body}
                                onChange={onChange}
                                className='form-control'
                                type='text'
                                name='body'
                                id='body'
                                placeholder='Comment'></textarea>
                            {errors.body && <div className="alert alert-danger">{errors.body}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Author:</label>
                            <input
                                value={comment.author}
                                onChange={onChange}
                                className='form-control'
                                type='text'
                                name='author'
                                placeholder='Author'/>
                            {errors.author && <div className="alert alert-danger">{errors.author}</div>}
                        </div>
                        <Button className='form-control btn btn-primary'
                            type="submit"
                            disabled={saving}
                            onClick={onSave}
                        >{saving ? 'Saving...' : 'Save'}</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
