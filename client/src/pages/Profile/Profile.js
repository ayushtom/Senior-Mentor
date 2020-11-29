import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import './Profile.css'

const CardExampleCard = () => (
  <Card fluid color="teal">
    
    <Card.Content>
    <Image size="mini" src wrapped ui={false} />
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
)

export default CardExampleCard