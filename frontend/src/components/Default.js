import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { categoriesFetch, postsFetch, sortUpdate, updatePosts } from '../actions';
import CategoryList from './CategoryList';
import PostList from './PostList';


class Default extends React.Component {
    static propTypes = {
        categories: PropTypes.array.isRequired,
        categoriesFetch: PropTypes.func.isRequired
    }
    sortOptions = {
        voteScore: (a, b) => {
            console.log('voteScore fn');
            if(a.voteScore > b.voteScore) {
                return 1;
            }
            if(a.voteScore < b.voteScore) {
                return -1;
            }
            return 0;
        },
        voteScoreReverse: (a, b) => {
            console.log('voteScoreReverse fn');
            if(b.voteScore > a.voteScore) {
                return 1;
            }
            if(b.voteScore < a.voteScore) {
                return -1;
            }
            return 0;
        },
        timeStamp: (a, b) => {
            console.log('timeStamp fn ');
            if(a.timestamp > b.timestamp) {
                return 1;
            }
            if(a.timestamp < b.timestamp) {
                return -1;
            }
            return 0;
        },
        timeStampReverse: (a, b) => {
            console.log('timeStampReverse fn');
            if(b.timestamp > a.timestamp) {
                return 1;
            }
            if(b.timestamp < a.timestamp) {
                return -1;
            }
            return 0;
        }
    };

    componentDidMount() {
        this.props.categoriesFetch();
        this.props.postsFetch();
    }

    clearSort = () => {
        this.props.sortUpdate({prop: 'sortBy', value: ''});
    }
    updateSort = value => {
        if(this.props.sortBy == value) {
            this.props.sortUpdate({prop: 'sortBy', value});
            let list = this.props.posts.reverse();
            return this.props.updatePosts(list);
        }
        this.props.sortUpdate({prop: 'sortBy', value});
        let list = this.props.posts.sort(this.sortOptions[value]);
        return this.props.updatePosts(list);
    }

    onUpdate = list => {
        this.props.updatePosts(list);
    }

    render() {
        const { categories, posts } = this.props;
        return (
            <div className="list-books">
                <div className="DefaultTitle">
                    <h1>Default</h1>
                </div>
                <div className="AddPost">
                    <Link to="/search">New Post</Link>
                </div>
                <div >
                    <div className="DefaultContent">
                        <CategoryList list={categories} />
                        <PostList list={posts} onSort={this.updateSort} onUpdate={this.onUpdate} sortBy={this.props.sortBy}/>
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
        posts: posts.posts.filter(post => !post.deleted)
    };
};

export default connect(mapStateToProps, {
    categoriesFetch,
    postsFetch,
    sortUpdate,
    updatePosts
})(Default);
