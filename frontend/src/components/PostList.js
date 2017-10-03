import React from 'react'
import {ButtonGroup, Button, ListGroup, Panel} from 'react-bootstrap';
import PostItem from './PostItem';

export default function PostList({
    list,
    onSort,
    postFormState,
    onPostVoteScoreSelected,
    onChange
}) {
    return (
        <Panel header="Posts"  className='PostList'>
            <ButtonGroup >
                <Button onClick={() => onSort('voteScore')}>Sort By Score</Button>
                <Button onClick={() => onSort('timeStamp')}>Sort by Date</Button>
            </ButtonGroup>
            <ListGroup>
                {list.map(item => (
                    <PostItem
                        key={item.id}
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
