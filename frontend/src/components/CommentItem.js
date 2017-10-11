import React from 'react';
import {Link} from 'react-router-dom';
import {
    Row,
    Col,
    ListGroupItem,
    FormControl,
    FormGroup,
    Form
} from 'react-bootstrap';
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

export default function CommentItem({
    comment,
    upVote,
    downVote,
    onDelete,
    selectedId,
    commentFormState,
    onCommentSelected,
    onChange,
    onCommentUnSelected,
    updateComment,
    focusTextInput
}) {
    return (
        <Card className="Card" elevation={4} key={comment.id}>
            <CardContent>
                {selectedId !== comment.id && <pre onClick={() => onCommentSelected(comment)}>
                    {comment.body}
                </pre>}
                {selectedId === comment.id && <FormGroup>
                    <Typography >
                        <textarea
                            name="body"
                            className="form-control"
                            value={commentFormState.body}
                            onChange={onChange}
                            ref={input => { focusTextInput(input); }}
                        ></textarea>
                    </Typography>
                    <Button className="Button" onClick={() => {
                        updateComment(commentFormState);
                        onCommentUnSelected();
                    }} raised>Update</Button>
                    <Button className="Button" onClick={() => onCommentUnSelected()} raised color="primary" >Cancel</Button>
                </FormGroup>
                }
                <p className="Author"p>
                    Author: {comment.author}
                </p>
                <p>
                    {formatTime(comment.timestamp)}
                </p>
                <Row>
                    <Col xs={12}>
                        <Form>
                            <FormGroup>
                                <p>
                                    Vote Score: {comment.voteScore}
                                </p>
                                <IconButton onClick={() => upVote(comment)} aria-label="Add" color="primary">
                                    <AddCircleIcon/>
                                </IconButton>
                                <IconButton onClick={() => downVote(comment)} aria-label="Add" color="primary">
                                    <RemoveCircleIcon/>
                                </IconButton>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </CardContent>
            <CardActions>
                <Button className="Button" raised onClick={() => onCommentSelected(comment)}>Edit</Button>
                <Button className="Button" raised color="primary" onClick={() => onDelete(comment.id)}>Delete</Button>
            </CardActions>
        </Card>
    );
}
