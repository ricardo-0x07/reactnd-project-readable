const config = require('./config')
let api = "http://localhost:3001/api"

if(config.mode === 'production') {
    api = "/api"    
}


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token

if(!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    Accept: 'application/json',
    Authorization: token
};

export const getAllCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories);

export const getCategoryPosts = categoryId =>
    fetch(`${api}/${categoryId}/posts`, { headers })
        .then(res => res.json())
        .then(data => data.posts);

export const getPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())
        .then(data => {
            const list =  data.map(post => {
                return getPostComments(post.id)
                    .then(comments => {
                        post.comments = comments.length;
                        return post;
                    })
                    .catch(error => console.log('error', error));
            });
            return Promise.all(list);
        })
        .then(data => {
            return data.sort((a, b) => {
                if(a.voteScore > b.voteScore) {
                    return -1;
                }
                if(a.voteScore < b.voteScore) {
                    return 1;
                }
                return 0;
            });
        })
        .catch(error => console.log('error', error));

export const createPost = post => {
    return fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
        .then(res => res.json())
        .then(data => data.post);
};

export const getPost = postId =>
    fetch(`${api}/posts/${postId}`, { headers })
        .then(res => res.json())
        .then(data => data.post);

export const voteOnPost = vote =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            Authorization: 'Authorized'
        },
        body: JSON.stringify({ vote })
    })
        .then(res => res.json())
        .then(data => data.post);

export const updatePost = post =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
        .then(res => res.json())
        .then(data => data);

export const deletePost = postId =>
    fetch(`${api}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => data);

export const getPostComments = postId =>
    fetch(`${api}/posts/${postId}/comments`, { headers })
        .then(res => res.json())
        .then(data => {
            return data.sort((a, b) => {
                if(a.voteScore > b.voteScore) {
                    return -1;
                }
                if(a.voteScore < b.voteScore) {
                    return 1;
                }
                return 0;
            });
        });

export const addComment = comment =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
        .then(res => res.json())
        .then(data => data);

export const getComment = commentId =>
    fetch(`${api}/comments/${commentId}`, { headers })
        .then(res => res.json())
        .then(data => data.comment);

export const voteOnComment = (vote, commentId) =>
    fetch(`${api}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vote })
    })
        .then(res => res.json())
        .then(data => data.comment);

export const updateComment = comment => {
    return fetch(`${api}/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
        .then(res => res.json())
        .then(data => data);
};
export const deleteComment = commentId =>
    fetch(`${api}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => data);
