import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { connect } from 'react-redux';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import {
    categoriesFetch,
    postsFetch,
    sortUpdate,
    updatePost,
    postFormUpdate,
    postFormStateUpdate
} from '../actions';
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

    updatePost = post => {
        const _that = this;
        _that
            .props
            .updatePost(post)
            .then(() => _that.redirect())
            .catch(error => {
                toastr.error(error);
                console.log('updatePost error', error);
                _that.resetFormState();
            });
    }
    redirect = () => {
        this.props.postFormUpdate({key: 'saving', value: false});
        toastr.success('Post saved');
        this
            .props
            .history
            .push('/');
    }
    resetFormState = () => {
        this.props.postFormState.title = '';
        this.props.postFormState.body = '';
        this.props.postFormState.author = '';
        this.props.postFormState.category = '';
        this.props.postFormStateUpdate({key: 'postFormState', value: this.props.postFormState});
        this.props.postFormUpdate({key: 'saving', value: false});
        this.props.postFormUpdate({key: 'error', value: {}});
    }

    onPostVoteScoreSelected = post => {
        this.props.postFormStateUpdate({key: 'postFormState', value: post});
    }

    updatePostState = event => {
        console.log('event.target.name', event.target.name);
        console.log('event.target.value', event.target.value);
        const field = event.target.name;
        this.props.postFormState[field] = event.target.value;
        console.log('this.props.postFormState', this.props.postFormState);
        this.props.postFormStateUpdate({key: 'postFormState', value: this.props.postFormState});
    }

    render() {
        console.log('Category this.props', this.props);
        const { categories, posts, postFormState } = this.props;
        return (
            <Grid className="list-books">
                <Row className="DefaultTitle">
                    <h1>Category</h1>
                </Row>
                <Row className="AddPost">
                    <Link to="/search">New Post</Link>
                </Row>
                <Row >
                    <Col className="DefaultContent">
                        <CategoryList list={categories} />
                        <PostList
                            list={posts}
                            onSort={this.updateSort}
                            sortBy={this.props.sortBy}
                            postFormState={postFormState}
                            onChange={this.updatePostState}
                            updatePost={this.updatePost}
                            onPostVoteScoreSelected={this.onPostVoteScoreSelected}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { categories, posts } = state;
    console.log('default state', state);

    return {
        sortBy: posts.sortBy,
        categories: categories.filter(category => category.name == ownProps.match.params.id),
        posts: posts.posts.filter(post => post.category == ownProps.match.params.id && !post.deleted),
        postFormState: posts.postFormState
    };
};

export default connect(mapStateToProps, {
    categoriesFetch,
    postsFetch,
    sortUpdate,
    updatePost,
    postFormUpdate,
    postFormStateUpdate
})(Category);
