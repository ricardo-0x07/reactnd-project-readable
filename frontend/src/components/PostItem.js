import React from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {Grid, Row, Col, Panel, ListGroupItem, ButtonToolbar, Button, FormControl, FormGroup, Form} from 'react-bootstrap';

export default function Post({
    post,
    onDelete,
    postFormState,
    onPostVoteScoreSelected,
    onChange,
    updatePost
}) {
    return (
        <ListGroupItem>
            <div className="panel-heading">
                <h2>{post.title}</h2>
            </div>
            <Row>
                <Col xs={12}><p className="Author">Author: {post.author}</p></Col>
            </Row>
            <Row>
                <Col xs={12}><p>Date: <Moment format="YYYY-MMM-DD">{post.timestamp}</Moment></p></Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Form>
                        <FormGroup>
                           Vote Score: 
                            <FormControl
                                className="form-control"
                                name="voteScore"
                                id="number"
                                type="number"
                                onFocus={() => onPostVoteScoreSelected(post)}
                                onChange={onChange}
                                onBlur={() => {
                                    updatePost(postFormState);
                                }}
                                value={postFormState.id && postFormState.id == post.id ? postFormState.voteScore : post.voteScore} />
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Link to={`/postdetails/${post.id}`}>View Details</Link>
                </Col>
            </Row>
        </ListGroupItem>
    );
}

