import React from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import uuidv1 from 'uuid/v1';
import toastr from 'toastr';
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
    commentFormStateUpdate
} from '../actions';
import Post from './Post';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

class PostDetails extends React.Component {
    static propTypes = {
        // post: PropTypes.object.isRequired,
        posts: PropTypes.array.isRequired,
        postsFetch: PropTypes.func.isRequired
    }

    componentDidMount() {
        console.log('PostDetails componentDidMount');
        this
            .props
            .categoriesFetch();
        this
            .props
            .postsFetch();
        this
            .props
            .commentsFetch(this.props.post.id);
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
        const _that = this;
        this.props.commentDelete(id)
            .then(() => _that.redirect())
            .catch(error => {
                _that.redirect();
                console.log('onDelete error', error);
            });
    }

    updateComment = comment => {
        this.props.updateComment(comment);
    }

    redirect = () => {
        this
            .props
            .history
            .push('/');
    }
    updateCommentState = event => {
        console.log('event.target.name', event.target.name);
        console.log('event.target.value', event.target.value);
        const field = event.target.name;
        this.props.commentFormState[field] = event.target.value;
        console.log('this.props.commentFormState', this.props.commentFormState);
        this.props.commentFormStateUpdate({key: 'commentFormState', value: this.props.commentFormState});
    }

    onCommentSelected = comment => {
        this.props.commentFormStateUpdate({key: 'commentFormState', value: comment});
        this.props.onCommentSelected(comment.id);
    }

    onCommentUnSelected = () => {
        this.props.onCommentSelected('');
    }
    save = event => {
        event.preventDefault();

        if(!this.formIsValid()) {
            return;
        }

        console.log('createComment this.props.CommentFormState', this.props.commentFormState);
        this.props.commentFormState.timestamp = Date.now();
        this.props.commentFormState.id = uuidv1();
        this.props.commentFormState.parentId = this.props.post.id;
        
        return this
            .props
            .createComment(this.props.commentFormState)
            .then(() => {
                this.redirect();
                this.resetFormState();
            })
            .catch(error => {
                toastr.error(error);
                console.log('createcomment error', error);
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
        this.props.commentFormState.body = '';
        this.props.commentFormState.author = '';
        this.props.commentFormStateUpdate({key: 'commentFormState', value: this.props.commentFormState});
        this.props.commentFormUpdate({key: 'saving', value: false});
        this.props.commentFormUpdate({key: 'error', value: {}});
        this.props.commentFormUpdate({key: 'newComment', value: false});
    }

    render() {
        console.log('Comment this.props', this.props);
        const {
            post,
            comments,
            selectedId,
            commentFormState,
            errors,
            saving
        } = this.props;
        return (
            <div>
                <Post post={post} onDelete={this.onDelete}/>
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
                />
                {!this.props.newComment && <button onClick={() => {
                    this.props.commentFormUpdate({key: 'newComment', value: true});
                }}>New Comment</button>}
                {this.props.newComment && <CommentForm
                    comment={commentFormState}
                    errors={errors}
                    saving={saving}
                    onSave={this.save}
                    onChange={this.updateCommentState}
                />}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log('Post state', state);
    console.log('ownProps', ownProps);
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
            .filter(post => post.id == ownProps.match.params.id)[0]
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
    commentFormStateUpdate
})(PostDetails);
