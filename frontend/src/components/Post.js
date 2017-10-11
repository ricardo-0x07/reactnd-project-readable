import React from 'react';
import {Link} from 'react-router-dom';
import { Row, Col, Panel, ButtonToolbar, FormControl, FormGroup, Form } from 'react-bootstrap';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import AddCircleIcon from 'material-ui-icons/AddCircle';
import RemoveCircleIcon from 'material-ui-icons/RemoveCircle';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Card, {CardActions, CardContent} from 'material-ui/Card';

function formatTime(dateString) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

export default function Post({
    post,
    onDelete,
    upVote,
    downVote
}) {
    return (
        <Card className="Card" elevation={4} key={post.id}>
            <CardContent>
                <Typography type="display2">
                    {post.title}
                </Typography>
                <pre>
                    {post ? post.body : ''}
                </pre>
                <p className="Author">
                    Author: {post.author}
                </p>
                <p>
                    {formatTime(post.timestamp)}
                </p>
                <p>
                    No. Comments: {post.comments}
                </p>
                <Row>
                    <Col xs={12}>
                        <Form>
                            <FormGroup>
                                <p>
                                    Vote Score: {post.voteScore}
                                </p>
                                <IconButton onClick={() => upVote(post)} aria-label="Add" color="primary">
                                    <AddCircleIcon/>
                                </IconButton>
                                <IconButton onClick={() => downVote(post)} aria-label="Add" color="primary">
                                    <RemoveCircleIcon/>
                                </IconButton>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </CardContent>
            <CardActions>
                <Button className="Button" raised ><Link to={`/create/${post.id}`}>Edit</Link></Button>
                <Button className="Button" raised color="primary" onClick={() => onDelete(post.id)}>Delete</Button>                        
            </CardActions>
        </Card>
    );
}

