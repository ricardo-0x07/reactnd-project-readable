import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import uuidv1 from 'uuid/v1';
import toastr from 'toastr';
import { Grid, Panel, Button } from 'react-bootstrap';
import {
    postsFetch,
    categoriesFetch,
    commentsFetch,
    postDelete,
    commentDelete,
    onCommentSelected,
    updateComment,
    createComment,
    commentFormUpdate,
    commentFormStateUpdate,
    updatePost,
    postFormStateUpdate
} from '../actions';
import Post from './Post';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

class PostDetails extends React.Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
        postsFetch: PropTypes.func.isRequired
    }
    componentDidMount() {
        console.log('PostDetails componentDidMount');
        this
            .props
            .commentsFetch(this.props.match.params.id);
        this.props.postsFetch();
    }
    onDelete = id => {
        const _that = this;
        this.props.postDelete(id)
            .then(() => _that.redirect())
            .catch(error => {
                _that.redirect();
                console.log('onDelete error', error);
            });
    }
    onCommentDelete = id => {
        this.props.commentDelete(id);
    }
    updateComment = comment => {
        this.props.updateComment(comment)
            .then(() => this.props.commentsFetch(this.props.post.id));
    }
    redirect = () => {
        this
            .props
            .history
            .push('/');
    }
    updateCommentState = event => {
        const field = event.target.name;
        this.props.commentFormState[field] = event.target.value;
        this.props.commentFormStateUpdate({key: 'commentFormState', value: this.props.commentFormState});
    }
    onVoteChange = event => {
        const field = event.target.name;
        this.props.commentFormState[field] = event.target.value;
        this.props.commentFormStateUpdate({key: 'commentFormState', value: this.props.commentFormState});
    }
    onCommentSelected = comment => {
        this.props.commentFormStateUpdate({key: 'commentFormState', value: comment});
        this.props.onCommentSelected(comment.id);
    }
    onCommentVoteScoreSelected = comment => {
        this.props.commentFormStateUpdate({key: 'commentFormState', value: comment});
    }
    onCommentUnSelected = () => {
        this.props.onCommentSelected('');
        this.resetFormState();
    }
    save = event => {
        event.preventDefault();

        if(!this.formIsValid()) {
            return;
        }

        this.props.commentFormState.timestamp = Date.now();
        this.props.commentFormState.id = uuidv1();
        this.props.commentFormState.parentId = this.props.post.id;
        
        return this
            .props
            .createComment(this.props.commentFormState)
            .then(() => {
                // this.redirect();
                this.resetFormState();
            })
            .catch(error => {
                toastr.error(error);
                this.resetFormState();
            });
    }
    formIsValid() {
        let formIsValid = true;

        if(this.props.commentFormState.body.length < 5) {
            this.props.errors.body = 'Comment must be at least 5 characters.';
            this.props.commentFormUpdate({key: 'errors', value: this.props.errors});
            formIsValid = false;
        }
        return formIsValid;
    }
    resetFormState = () => {
        this.props.commentFormState.id = '';
        this.props.commentFormState.parentId = '';
        this.props.commentFormState.voteScore = 1;
        this.props.commentFormState.timestamp = null;
        this.props.commentFormState.body = '';
        this.props.commentFormState.author = '';
        this.props.commentFormStateUpdate({key: 'commentFormState', value: this.props.commentFormState});
        this.props.commentFormUpdate({key: 'saving', value: false});
        this.props.commentFormUpdate({key: 'error', value: {}});
        this.props.commentFormUpdate({key: 'newComment', value: false});
    }
    onPostVoteScoreSelected = post => {
        this.props.postFormStateUpdate({key: 'postFormState', value: post});
    }

    updatePostState = event => {
        const field = event.target.name;
        this.props.postFormState[field] = event.target.value;
        this.props.postFormStateUpdate({key: 'postFormState', value: this.props.postFormState});
    }
    updatePost = post => {
        const _that = this;
        _that
            .props
            .updatePost(post)
            // .then(() => _that.redirect())
            .catch(error => {
                toastr.error(error);
                console.log('updatePost error', error);
                _that.resetFormState();
            });
    }

    render() {
        const {
            post,
            comments,
            selectedId,
            commentFormState,
            errors,
            saving,
            postFormState
        } = this.props;
        return (
            <Grid>
                {post && <Post
                    post={post}
                    onDelete={this.onDelete}
                    postFormState={postFormState}
                    onChange={this.updatePostState}
                    updatePost={this.updatePost}
                    onPostVoteScoreSelected={this.onPostVoteScoreSelected}
                />}
                <CommentList
                    commentFormState={commentFormState}
                    errors={errors}
                    saving={saving}
                    list={comments}
                    onCommentSelected={this.onCommentSelected}
                    onCommentUnSelected={this.onCommentUnSelected}
                    selectedId={selectedId}
                    updateComment={this.updateComment}
                    onChange={this.updateCommentState}
                    onDelete={this.onCommentDelete}
                    onCommentVoteScoreSelected={this.onCommentVoteScoreSelected}
                />
                <Panel>
                    {(!this.props.newComment || selectedId) && <Button onClick={() => {
                        this.props.commentFormUpdate({key: 'newComment', value: true});
                    }}>New Comment</Button>}
                    {this.props.newComment && !selectedId && <CommentForm
                        comment={commentFormState}
                        errors={errors}
                        saving={saving}
                        onSave={this.save}
                        onChange={this.updateCommentState}
                    />}
                </Panel>
            </Grid>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {posts, comments} = state;
    let { commentFormState, errors, saving, newComment } = comments;
    return {
        newComment,
        commentFormState,
        errors,
        saving,
        comments: comments.comments.filter(comment => !comment.deleted),
        selectedId: comments.selectedId,
        posts: posts.posts,
        post: posts
            .posts
            .filter(post => post.id === ownProps.match.params.id)[0],
        postFormState: posts.postFormState
    };
};

export default connect(mapStateToProps, {
    categoriesFetch,
    postsFetch,
    commentsFetch,
    postDelete,
    commentDelete,
    onCommentSelected,
    updateComment,
    createComment,
    commentFormUpdate,
    commentFormStateUpdate,
    updatePost,
    postFormStateUpdate
})(PostDetails);
