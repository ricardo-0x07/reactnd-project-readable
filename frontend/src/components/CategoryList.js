import React from 'react'
import {Link} from 'react-router-dom';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

export default function CategoryList({list}) {
    return (
        <Panel header="Categories" className='CategoryList'>
            <ListGroup>
                {list.map(item => (
                    <ListGroupItem key={item.name} className="CategoryListItem">
                        <Link to={`/category/${item.name}`}>{item.name}</Link>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Panel>
    );
}
