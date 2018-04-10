import React from 'react';
import gql from 'graphql-tag';
// import { Query } from 'react-apollo';
import { ApolloConsumer } from 'react-apollo';

const GET_HERO = gql`
  query hero($id: Int!) { 
    hero(id: $id) {
      id
      name
      roles
    }
  }
`;

class Hero extends React.Component {
  state = {
    hero: {
      id: null,
      name: null,
      roles: []
    }
  };

  onHeroFetched = hero => this.setState(() => ({ hero}));

  render() {
    const { id, name, roles } = this.state.hero;
    return (
      <ApolloConsumer>
        {client => (
          <div>
            {id && <span>{id}--{name}--{roles[0]}</span>}
            <button
              onClick={async () => {
                const { data } = await client.query({
                  query: GET_HERO,
                  variables: { id: this.props.id }
                });
                this.onHeroFetched(data.hero);
              }}
            >
              Click me!
            </button>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

// const Hero = ({ id }) => (
//   <Query query={GET_HEROES} variables={{ id }}>
//     {({ loading, error, data }) => {
//       if (loading) return "Loading...";
//       if (error) return `Error! ${error.message}`;
//       return (
//           <span>{data.hero.id}--{data.hero.name}--{data.hero.roles.map(role => (<span>{role}-</span>))}</span>  
//       );
//     }}
//   </Query>
// );

export default Hero;