import React from 'react'
import  { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Button, Form, Input, Label, Grid, Header, Message, Loader } from 'semantic-ui-react'

class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      name: "",
      password: "",
      password2: "",
      usernameIsInvalid: false,
      nameIsInvalid: false,
      passwordIsInvalid: false,
      password2IsInvalid: false,
      isRunning: false,
      isExisted: false,
      isError: false,
      isSuccess: false,
      errorMsg: '',
      waitingSec: 3
    }
    this.handlerInputChange = this.handlerInputChange.bind(this)
    this.handlerInputBlur = this.handlerInputBlur.bind(this)
    this.handlerInputFocus = this.handlerInputFocus.bind(this)
    this.handlerPasswordCheck = this.handlerPasswordCheck.bind(this)
    this.handlerSignUp = this.handlerSignUp.bind(this)
  }

  handlerInputChange = (event) => {
    let name = event.target.name
    let value = event.target.value
    this.setState((prevState) => {
      return {[name]:value}
    })
  }

  handlerInputBlur = (event) => {
    let name = event.target.name
    let value = event.target.value
    //validation
    if(!value){
      this.setState({
        [name+"IsInvalid"]: true
      })
    }
  }

  handlerInputFocus = (event) => {
    let name = event.target.name
    let value = event.target.value
    //reset
    this.setState({
      [name+"IsInvalid"]: false
    })
  }

  handlerPasswordCheck = (event) => {
    let password = event.target.value
    if(!password || password.length < 8){
      this.setState({
        passwordIsInvalid: true
      })
    }
  }

  handlerPassword2Check = (event) => {
    let password2 = event.target.value
    if(!password2 || password2 !== this.state.password){
      this.setState({
        password2IsInvalid: true
      })
    }
  }

  handlerSignUp = function(){
    this.setState({
      isRunning: true,
      isExisted: false,
      isError: false
    })
    axios.post('/api/signup', {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password
    }).then(res => {
      console.log(res);
      this.setState({
        isRunning: false
      })
      if(res.status === 201) {
        this.setState({
          isExisted: true
        })
      }
      if(res.status === 200) {
        this.setState({
          name: "",
          username: "",
          password: "",
          password2: "",
          isSuccess: true
        })
        setInterval(function(){ 
          this.setState((prev) => {
            return {waitingSec: prev.waitingSec - 1}
          })
          if(this.state.waitingSec === 0){
            window.location = '/login'
          }
        }.bind(this), 1000);
      }
    }).catch((error) => {
      console.log(error)
      this.setState({
        isError: true,
        errorMsg: error.data
      })
    })
  }

  render(){
    return(
      <div className='login-form'>
          
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='black' textAlign='center'>
              Create your account
              </Header>
              {
                this.state.isExisted === true ? 
                <Message warning>
                  <Message.Header>The username existed.</Message.Header>
                  <p>Please use another username for register.</p>
                </Message> : null
              }
              {
                this.state.isError === true ? 
                <Message negative>
                  <Message.Header>Server Internal Error</Message.Header>
                  <p>{this.state.errorMsg}</p>
                </Message> : null
              }
              {
                this.state.isSuccess === true ? 
                <Message success>
                  <Message.Header>Sign Up Successfully!</Message.Header>
                  <p>Redirect to Login page in {this.state.waitingSec} s...</p>
                </Message> : null
              }
              
              <Form size='large'>
                  <Form.Field>
                    <Input fluid iconPosition='left' icon='user outline' name="username" value={this.state.username} placeholder='Username' onChange={this.handlerInputChange} onBlur={this.handlerInputBlur} onFocus={this.handlerInputFocus} />
                    { this.state.usernameIsInvalid ? <Label basic color='red' pointing > Username can't be empty </Label> : null }
                  </Form.Field>
                  <Form.Field>
                    <Input fluid icon='user outline' name="name" value={this.state.name} iconPosition='left' placeholder='Name' onChange={this.handlerInputChange} onBlur={this.handlerInputBlur} onFocus={this.handlerInputFocus} />
                    { this.state.nameIsInvalid ? <Label basic color='red' pointing > Name can't be empty </Label> : null }
                  </Form.Field>
                  <Form.Field>
                    <Input fluid icon='lock' name="password" value={this.state.password} iconPosition='left' placeholder='Password' type='password' onChange={this.handlerInputChange} onBlur={this.handlerPasswordCheck} onFocus={this.handlerInputFocus} />
                    { this.state.passwordIsInvalid ? <Label basic color='red' pointing > Password length should be at least 8 </Label> : null }
                  </Form.Field>
                  <Form.Field>
                    <Input fluid icon='lock' name="password2" value={this.state.password2} iconPosition='left' placeholder='Confirm Password' type='password' onChange={this.handlerInputChange} onBlur={this.handlerPassword2Check} onFocus={this.handlerInputFocus} />
                    { this.state.password2IsInvalid ? <Label basic color='red' pointing > Please enter the same password </Label> : null }
                  </Form.Field>

                  <Button secondary disabled={this.state.usernameIsInvalid || this.state.nameIsInvalid || this.state.passwordIsInvalid || this.state.password2IsInvalid || this.state.isRunning} fluid size='large' onClick={this.handlerSignUp}>
                  {this.state.isRunning ? <Loader />:null }Sign Up
                  </Button>
              </Form>
          </Grid.Column>
          </Grid>
      </div>
    )
  }
}

export default SignupForm
