import React from 'react'
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import {ButtonGroup, Button, ListGroup, ListGroupItem, Panel} from 'react-bootstrap';
import PostItem from './PostItem';

export default function PostList({
    list,
    onSort,
    sortBy,
    postFormState,
    onPostVoteScoreSelected,
    onChange,
    updatePost
}) {
    console.log('list', list);
    console.log('sortBy', sortBy);
    // let sortedList = list.sort(sortOptions[sortBy]);
    // console.log('sortedList', sortedList);
    // onUpdate(sortedList);
    return (
        <Panel header="Posts"  className='PostList'>
            <ButtonGroup >
                <Button onClick={() => onSort('voteScore')}>Sort By Score</Button>
                <Button onClick={() => onSort('timeStamp')}>Sort by Date</Button>
            </ButtonGroup>
            <ListGroup>
                {list.map(item => (
                    <PostItem
                        post={item}
                        onPostVoteScoreSelected={onPostVoteScoreSelected}
                        onChange={onChange}
                        postFormState={postFormState}
                    />
                ))}
            </ListGroup>
        </Panel>
    );
}
