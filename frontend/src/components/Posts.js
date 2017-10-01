import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { categoriesFetch, postsFetch, sortUpdate } from '../actions';
import CategoryList from './CategoryList';
import PostList from './PostList';


class Posts extends React.Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
        categories: PropTypes.array.isRequired,
        categoriesFetch: PropTypes.func.isRequired,
        postsFetch: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.categoriesFetch();
        this.props.postsFetch();
    }

    clearSort = () => {
        this.props.sortUpdate({prop: 'sortBy', value: ''});
    }
    updateSort = value => {
        this.props.sortUpdate({prop: 'sortBy', value});
    }

    render() {
        const { posts } = this.props;
        return (
            <div className="list-books">
                <div className="DefaultTitle">
                    <h1>Posts</h1>
                </div>
                <div className="AddPost">
                    <Link to="/search">New Post</Link>
                </div>
                <div >
                    <div className="DefaultContent">
                        <PostList list={posts} onSort={this.updateSort} sortBy={this.props.sortBy}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { categories, posts } = state;
    console.log('default state', state);

    return {
        sortBy: posts.sortBy,
        categories,
        posts: posts.posts
    };
};

export default connect(mapStateToProps, {
    categoriesFetch,
    postsFetch,
    sortUpdate
})(Posts);
