import React from 'react'
import {Link} from 'react-router-dom';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

export default function CategoryList({list}) {
    return (
        <Panel header="Categories" className='CategoryList'>
            <List>
                {list.map(item => (
                    <ListItem key={item.name} className="CategoryListItem" button>
                        <Link to={`/category/${item.name}`}><h4>{item.name}</h4></Link>
                    </ListItem>
                ))}
            </List>
        </Panel>
    );
}
