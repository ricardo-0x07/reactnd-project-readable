import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import toastr from 'toastr';
import uuidv1 from 'uuid/v1';
import {postsFetch, createPost, updatePost, categoriesFetch, postFormStateUpdate, postFormUpdate} from '../actions';
import PostForm from './PostForm';

class ManagePostForm extends React.Component {
    static propTypes = {}

    componentDidMount() {
        console.log('componentDidMount');
        this
            .props
            .postsFetch();
        this.props.categoriesFetch();
    }

    updatePostState = event => {
        console.log('event.target.name', event.target.name);
        console.log('event.target.value', event.target.value);
        const field = event.target.name;
        this.props.postFormState[field] = event.target.value;
        console.log('this.props.postFormState', this.props.postFormState);
        this.props.postFormStateUpdate({key: 'postFormState', value: this.props.postFormState});
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

    formIsValid() {
        let formIsValid = true;

        if(this.props.postFormState.title.length < 5) {
            this.props.errors.title = 'Title must be at least 5 characters.';
            this.props.postFormUpdate({key: 'errors', value: this.props.errors});
            formIsValid = false;
        }
        return formIsValid;
    }
    save = event => {
        // let { saving, postFormState, errors } =  this.props;
        event.preventDefault();

        if(!this.formIsValid()) {
            return;
        }

        this.props.postFormUpdate({key: 'saving', value: true});
        if(this.props.postFormState.id) {
            return this.updatePost(this.props.postFormState);
        }

        console.log('createPost this.props.postFormState', this.props.postFormState);
        this.props.postFormState.timestamp = Date.now();
        this.props.postFormState.id = uuidv1();
        
        return this
            .props
            .createPost(this.props.postFormState)
            .then(() => this.redirect())
            .catch(error => {
                toastr.error(error);
                console.log('createPost error', error);
                this.resetFormState();
            });
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

    render() {
        console.log('render this.props', this.props);
        const {postFormState, errors, saving, categories} = this.props;
        return (
            <PostForm
                post={postFormState}
                errors={errors}
                saving={saving}
                onSave={this.save}
                onChange={this.updatePostState}
                options={categories}/>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log('ManagePostForm mapStateToProps state', state);
    console.log('ManagePostForm mapStateToProps ownProps', ownProps);
    const {posts, categories } = state;
    let { postFormState, errors, saving } = posts;
    if(ownProps.match.params.id && !postFormState.id) {
        postFormState = posts.posts.filter(postItem => postItem.id === ownProps.match.params.id)[0];
    }
    return {
        categories,
        postFormState,
        errors,
        saving
    };
};

export default connect(mapStateToProps, {
    postsFetch,
    createPost,
    updatePost,
    categoriesFetch,
    postFormStateUpdate,
    postFormUpdate
})(ManagePostForm);
