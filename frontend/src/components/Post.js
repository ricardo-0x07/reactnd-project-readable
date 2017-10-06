import React from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import { Row, Col, Panel, ButtonToolbar, FormControl, FormGroup, Form } from 'react-bootstrap';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import AddCircleIcon from 'material-ui-icons/AddCircle';
import RemoveCircleIcon from 'material-ui-icons/RemoveCircle';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Card, {CardActions, CardContent} from 'material-ui/Card';

export default function Post({
    post,
    onDelete,
    upVote,
    downVote
}) {
    return (
        <Card className="Card" elevation={4} key={post.id}>
            <CardContent>
                <Typography type="headline" component="h5">
                    {post.title}
                </Typography>
                <Typography component="pre">
                    {post ? post.body : ''}
                </Typography>
                <Typography className="Author" component="p">
                    Author: {post.author}
                </Typography>
                <Typography component="p">
                    <Moment format="YYYY-MMM-DD">{post.timestamp}</Moment>
                </Typography>
                <Typography component="p">
                    No. Comments: {post.comments}
                </Typography>
                <Row>
                    <Col xs={12}>
                        <Form>
                            <FormGroup>
                                <Typography type="body1" component="p">
                                    Vote Score: {post.voteScore}
                                </Typography>
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

