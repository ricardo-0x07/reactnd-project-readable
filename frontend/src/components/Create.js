import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize'
import { Button } from 'react-bootstrap';
import {
    postsFetch,
    onCreatePost
} from '../actions';

class Create extends React.Component {
    static propTypes = {}

    componentDidMount() {
        this.props.postsFetch();
    }

    handleSubmit = e => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true });
        console.log('create handle submit values', values);
        if(this.props.onCreatePost) {
            this.props.onCreatePost(values);
            this.props.history.push('/');
        }
    }

    render() {
        console.log('render this.props', this.props);
        const { post } = this.props;
        return (
            <div className="list-books">
                <div className="create-title">
                    <h1>Create/Edit</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <form onSubmit={this.handleSubmit} className='create-post-form'>
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input value={post.title} className='form-control' type='text' name='title' id='title' placeholder='Title'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="body">Post:</label>
                                <textarea value={post.body} className='form-control' type='text' name='body' id='body' placeholder='Post'></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="author">Author:</label>
                                <input value={post.author} className='form-control' type='text' name='author' name='author' placeholder='Author'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Category:</label>
                                <select value={post.category} className='form-control' type='text' name='category'>
                                    <option value="react">React</option>
                                    <option value="redux">Redux</option>
                                    <option value="udacity">Udacity</option>
                                </select>
                            </div>
                    
                            <Button className='form-control'>Create Post</Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log('Create mapStateToProps ownProps', ownProps)
    const { posts, categories } = state;
    let post = { title:'', body: '', author: '', category: '' };
    return {
        categories,
        post:ownProps.match.params ? post : posts.posts.filter(post => post.id == ownProps.match.params.id)[0]
        // history
    };
};

export default connect(mapStateToProps, {
    postsFetch,
    onCreatePost
})(Create);
