import React from 'react'
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react'

const LoginForm = () => (
  <div className='login-form'>
    
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='black' textAlign='center'>
           Log-in to your account
        </Header>
        <Form size='large'>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />

            <Button secondary fluid size='large'>
              Login
            </Button>
        </Form>
        <Message>
          New to us? <a href='/register'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)

export default LoginForm
