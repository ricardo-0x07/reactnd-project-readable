# React Nanodegree: Readable-App

1. Readables is a content and comment web app built primarily with React, Redux and React-Router.
2. It's users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.
3. The application has four views:
    - Default (Root)
        - lists all available categories, which should link to a category view for that category
        - lists all of the posts ordered by voteScore (highest score first)
        - has a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp
        - has a control for adding a new post
    - Category View
        - identical to the default view, but filtered to only include posts with the selected category
    - Post Detail View
        - shows the details of a post, including: Title, Body, Author, timestamp (in user readable format), and vote score
        - lists all of the comments for that post, ordered by voteScore (highest first)
        - has controls to edit or delete the post
        - has a control to add a new comment.
        - comments have controls for editing or deleting
    - Create/Edit View
        - has a form to create new post or edit existing posts
        - when editing, existing data is populated in the form
    - Post/Comment UI
        - Posts and comments, in all views where they are displayed, display their current score and have controls to increment or decrement the voteScore for the object. Posts display the number of comments associated with the post.

This repository includes the code for the backend API Server that you'll use to develop and interact with the front-end portion of the project.


## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

# Installation

1. Fork the repository, download it and cd into the application root.
2. Start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
3. Start the front-end
    - `cd frontend`
    - `npm install`
    - `npm start`

## Usage
1. After the application has been loaded successfully, use the links to navigate.
2. Use Links to create new posts.
3. Use vote score inputs to increase or lower scores and simply click anywhere else and the changes will be saved.
4. Use the post's view details links to view ist details snd use the controls on that view to create, edit or delete posts or comments.


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

1.

## Credits

1. The udacity nano degree team provided the guidance and training i required to complete the initial version of this project.


## License
MIT License

Copyright (c) 2016 Clive Cadogan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## changelog
1. 


#Versioning
 Version 1. 
