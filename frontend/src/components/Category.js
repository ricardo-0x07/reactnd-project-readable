import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { categoriesFetch, postsFetch, sortUpdate } from '../actions';
import CategoryList from './CategoryList';
import PostList from './PostList';


class Category extends React.Component {
    static propTypes = {
        categories: PropTypes.array.isRequired,
        categoriesFetch: PropTypes.func.isRequired
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
        console.log('Category this.props', this.props);
        const { categories, posts } = this.props;
        return (
            <div className="list-books">
                <div className="DefaultTitle">
                    <h1>Category</h1>
                </div>
                <div className="AddPost">
                    <Link to="/search">New Post</Link>
                </div>
                <div >
                    <div className="DefaultContent">
                        <CategoryList list={categories} />
                        <PostList list={posts} onSort={this.updateSort} sortBy={this.props.sortBy}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { categories, posts } = state;
    console.log('default state', state);

    return {
        sortBy: posts.sortBy,
        categories: categories.filter(category => category.name == ownProps.match.params.id),
        posts: posts.posts.filter(post => post.category == ownProps.match.params.id && !post.deleted)
    };
};

export default connect(mapStateToProps, {
    categoriesFetch,
    postsFetch,
    sortUpdate
})(Category);
