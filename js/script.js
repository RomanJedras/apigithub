


const FetchErorr = () => {
  return (
    <div className={'async-status-wrapper'}>
      <p>Wystapił bład, spróbuj ponownie</p>
    </div>
  );
};





class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      users: [],
      erorrs: null,
      loading: true
    };
  }
  
  onChangeHandle(event) {
    this.setState({searchText: event.target.value});
  }
  
  
  onSubmit(event) {
    event.preventDefault();
    const {searchText} = this.state;
  
    const url = `https://api.github.com/search/users?q=${searchText}`;
    
      fetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({ users: responseJson.items, loading: false }))
      .catch(error => {
        this.setState({ error })
      })
    
  }
  
  
  
  render() {
    if (this.state.erorrs) {
      <FetchErorr/>
    } else if(this.state.loading) {
      <p>To jest loading</p>
    }
    
   
    
    
    
    return (
      <div className={'mt-2 mb-3 d-flex justify-content-center'}>
        <form onSubmit={event => this.onSubmit(event)}>
          <label htmlFor="searchText">Search by user name</label>
          <input
            type="text"
            id="searchText"
            onChange={event => this.onChangeHandle(event)}
            value={this.state.searchText}/>
        </form>
        <UsersList users={this.state.users}/>
      </div>
      
      
    );
  }
}

class UsersList extends React.Component {
  get users() {
    if ( this.props.users) {
       return this.props.users.map(user => <User key={user.id} user={user}/>);
     }
  }
  
  render() {
    return (
      <div className={'row user-list'}>
        { (!this.users)? <FetchErorr/> : this.users}
      </div>
    );
  }
}

class User extends React.Component {
  render() {
    return (
      <div className={'col-xs-12 col-md-4 mb-3 mt-2 justify-content-between'}>
        <img src={this.props.user.avatar_url} style={{maxWidth: '100px'}}/>
        <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
      </div>
    );
  }
}













ReactDOM.render(
<App />,
  document.getElementById('root')
);