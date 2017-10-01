import React from 'react';
import {Button} from 'react-bootstrap';

export default function PostForm({ onSave, onChange, post, errors, saving, options }) {
    console.log('post', post);
    return (
        <div className="post-form-container">
            <div className="create-title">
                <h1>Create/Edit</h1>
            </div>
            <div className="list-post-content">
                <div>
                    <form onSubmit={onSave} className='create-post-form'>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input
                                value={post.title}
                                className='form-control'
                                type='text'
                                name='title'
                                id='title'
                                placeholder='Title'
                                onChange={onChange}/>
                            {errors.title && <div className="alert alert-danger">{errors.title}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="body">Post:</label>
                            <textarea
                                value={post.body}
                                onChange={onChange}
                                className='form-control'
                                type='text'
                                name='body'
                                id='body'
                                placeholder='Post'></textarea>
                            {errors.body && <div className="alert alert-danger">{errors.body}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Author:</label>
                            <input
                                value={post.author}
                                onChange={onChange}
                                className='form-control'
                                type='text'
                                name='author'
                                placeholder='Author'/>
                            {errors.author && <div className="alert alert-danger">{errors.author}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Category:</label>
                            <select
                                value={post.category}
                                onChange={onChange}
                                className='form-control SelectOptions'
                                type='text'
                                name='category'>
                                <option value="">Select Category</option>
                                {options.map(option => {
                                    return <option key={option.name} value={option.name} className='SelectOptions'>{option.name}</option>;
                                })}
                            </select>
                            {errors.category && <div className="alert alert-danger">{errors.category}</div>}
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
