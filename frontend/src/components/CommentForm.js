import React from 'react';
import Button from 'material-ui/Button';

export default function CommentForm({ onSave, onChange, comment, errors, saving, cancel }) {
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
                        <Button
                            className="Button"
                            raised
                            type="submit"
                            disabled={saving}
                            onClick={onSave}
                        >{saving ? 'Saving...' : 'Save'}</Button>
                        <Button className="Button" raised color="primary" 
                            type="button"
                            onClick={cancel}
                        >Cancel</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
