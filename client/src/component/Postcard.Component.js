import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeBut';
import DeleteButton from './DeleteButton';
import MyPopup from '../utils/MyPopup';

function PostCard({
  post: { body, createdAt, id, email, comments, likes }
}) {
  const { user } = useContext(AuthContext);
  console.log(body)

  function likePost(){
    console.log("like post")
  }

  function commentOnPost(){
    console.log("comment on post")
  }


  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{email}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
      <LikeButton user={user} post={{ id, likes}} />
      {/* <Button as='div' labelPosition='right' onClick={likePost}>
      <Button color='teal'>
        <Icon name='heart' />
      </Button>
      <Label as='a' basic color='teal' pointing='left'>
        {likes.length}
      </Label>
    </Button> */}
    <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="blue" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {comments.length}
            </Label>
    </Button>
    {user && user.email === email && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;