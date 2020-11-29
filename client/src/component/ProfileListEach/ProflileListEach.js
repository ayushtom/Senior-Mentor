import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

const ProfileCard = ({profile}) => (
  
    <Card style={{"width":"200px"}}>
      <Card.Content>
        <Image
          style={{"margin-bottom":"10px"}}
          //floated='middle'
          size='medium'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        />
        <Card.Header>{profile.name}</Card.Header>
        <Card.Meta>{profile.email}</Card.Meta>
        <Card.Description>
          Steve wants to add you to the group <strong>best friends</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='blue'>
            Approve
          </Button>
          <Button basic color='green'>
            Message
          </Button>
        </div>
      </Card.Content>
    </Card>
 
)

export default ProfileCard
