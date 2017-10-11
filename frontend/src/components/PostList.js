import React from 'react'
import {ButtonGroup, ListGroup, Panel} from 'react-bootstrap';
import PostItem from './PostItem';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

export default function PostList({
    list,
    onSort,
    upVote,
    downVote,
    onDelete
}) {
    return (
        <Panel header="Posts"  className='PostList'>
            <ButtonGroup >
                <Button className="Button" raised color="primary" onClick={() => onSort('voteScore')}>Sort By Score</Button>
                <Button raised color="primary" onClick={() => onSort('timeStamp')}>Sort by Date</Button>
            </ButtonGroup>
            <List>
                {list.length > 0 && list.map(item => (
                    <li key={item.id}>
                        <PostItem
                            post={item}
                            upVote={upVote}
                            downVote={downVote}
                            onDelete={onDelete}
                            comments={3}
                        />
                    </li>
                ))}
            </List>
        </Panel>
    );
}
