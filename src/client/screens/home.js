import React from 'react'
import { Container, Menu } from 'semantic-ui-react'

class HomePage extends React.Component {
    render() {
        return (
            <Container>
                <Menu
                  fixed='top'
                  inverted
                  size='large'
                >
                  <Container>
                    <Menu.Item as='a' active>
                      Todos
                    </Menu.Item>
                    
                    <Menu.Item position='right'>
                      Welcome
                    </Menu.Item>
                  </Container>
                </Menu>
            </Container>
        )
    }
}

export default HomePage