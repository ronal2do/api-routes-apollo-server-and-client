import React from 'react';

interface StateContainerState { name: String }
interface IUser { user: { name: string; }; setUser: (name: string) => void; }

const initialUserContext: IUser = {
  user: { name: 'Guest' },
  setUser: () => {}
};
// our context sets a property of type string
export const LanguageContext = React.createContext({ lang: 'en' });
export const UserContext = React.createContext<{initialUserContext: IUser}>({ initialUserContext });

class StateContainer extends React.PureComponent<{}, StateContainerState> {
  state = {
    name: 'Ronald'
  };

  addTodo = (name: string) => this.setState({name});

  render() {
    const context: any = {
      user: this.state,
      setUser: this.addTodo
    };

    return (
      <UserContext.Provider value={context}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default StateContainer;
export const StateConsumer = UserContext.Consumer;