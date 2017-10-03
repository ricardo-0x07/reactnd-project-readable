import React from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import { Row, Col, Panel, ButtonToolbar, Button, FormControl, FormGroup, Form } from 'react-bootstrap';

export default function Post({
    post,
    onDelete,
    postFormState,
    onPostVoteScoreSelected,
    onChange,
    updatePost
}) {
    return (
        <Panel>
            <div className="panel-heading">
                <h2>{post ? post.title : ''}</h2>
            </div>
            <Row>
                <Col xs={12}><p className="Author">Author: {post ? post.author : ''}</p></Col>
            </Row>
            <Row>
                <Col xs={12}> <pre>{post ? post.body : ''}</pre></Col>
            </Row>
            <Row>
                <Col xs={12}><p>Date: <Moment format="YYYY-MMM-DD">{post ? post.timestamp : ''}</Moment></p></Col>
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
                                value={postFormState.id && postFormState.id === post.id ? postFormState.voteScore : post.voteScore} />
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <ButtonToolbar>
                        <Button><Link to={`/create/${post.id}`}>Edit</Link></Button>
                        <Button onClick={() => onDelete(post.id)}>Delete</Button>                        
                    </ButtonToolbar>
                </Col>
            </Row>
        </Panel>
    );
}

