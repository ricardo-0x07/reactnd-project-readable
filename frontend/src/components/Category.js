import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import Button from 'material-ui/Button';
import * as actions from '../actions';
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
    sortOptions = {
        voteScore: (a, b) => {
            if(a.voteScore > b.voteScore) {
                return 1;
            }
            if(a.voteScore < b.voteScore) {
                return -1;
            }
            return 0;
        },
        voteScoreReverse: (a, b) => {
            if(b.voteScore > a.voteScore) {
                return 1;
            }
            if(b.voteScore < a.voteScore) {
                return -1;
            }
            return 0;
        },
        timeStamp: (a, b) => {
            if(a.timestamp > b.timestamp) {
                return 1;
            }
            if(a.timestamp < b.timestamp) {
                return -1;
            }
            return 0;
        },
        timeStampReverse: (a, b) => {
            if(b.timestamp > a.timestamp) {
                return 1;
            }
            if(b.timestamp < a.timestamp) {
                return -1;
            }
            return 0;
        }
    };
    updateSort = value => {
        if(this.props.sortBy === value) {
            this.props.sortUpdate({prop: 'sortBy', value});
            
            let list = this.props.posts.reverse();
            return this.props.updatePosts(list);
        }
        this.props.sortUpdate({prop: 'sortBy', value});
        let list = this.props.posts.sort(this.sortOptions[value]);
        return this.props.updatePosts(list);
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
        const field = event.target.name;
        this.props.postFormState[field] = event.target.value;
        this.props.postFormStateUpdate({key: 'postFormState', value: this.props.postFormState});
    }
    upVote = post => {
        post.voteScore += 1;
        // this.props.postFormStateUpdate({key: 'postFormState', value: post});
        this.props.updatePost(post);
    }

    downVote = post => {
        post.voteScore -= 1;
        // this.props.postFormStateUpdate({key: 'postFormState', value: post});
        this.props.updatePost(post);
    }

    onDelete = id => {
        const _that = this
        this.props.postDelete(id)
            .catch(error => {
                console.log('onDelete error', error);
            });
    }

    render() {
        const { categories, posts, postFormState } = this.props;
        return (
            <Grid className="list-books">
                <Row className="AddPost">
                    <Button><Link to="/create">New Post</Link></Button>
                </Row>
                <Row >
                    <Col className="DefaultContent">
                        <CategoryList list={categories} />
                        <PostList
                            list={posts}
                            onSort={this.updateSort}
                            upVote={this.upVote}
                            downVote={this.downVote}
                            onDelete={this.onDelete}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { categories, posts } = state;

    return {
        sortBy: posts.sortBy,
        categories: categories.filter(category => category.name === ownProps.match.params.id),
        posts: posts.posts.filter(post => post.category === ownProps.match.params.id && !post.deleted),
        postFormState: posts.postFormState
    };
};

export default connect(mapStateToProps, actions)(Category);
