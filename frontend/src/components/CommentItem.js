import React from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
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
                {selectedId !== comment.id && <Typography component="pre" onClick={() => onCommentSelected(comment)}>
                    {comment.body}
                </Typography>}
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
                    }} raised color="primary" >Update</Button>
                </FormGroup>
                }
                <Typography className="Author" component="p">
                    Author: {comment.author}
                </Typography>
                <Typography component="p">
                    <Moment format="YYYY-MMM-DD">{comment.timestamp}</Moment>
                </Typography>
                <Row>
                    <Col xs={12}>
                        <Form>
                            <FormGroup>
                                <Typography type="body1" component="p">
                                    Vote Score: {comment.voteScore}
                                </Typography>
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
