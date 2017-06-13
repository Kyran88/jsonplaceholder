/*
* Main component: Panel
* Child components: Users, Posts, Comments
* (Babel)
*/

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: [],
      comments: []
    }

    this.getUsers = this.getUsers.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.getComments = this.getComments.bind(this);
  }
  
  componentDidMount(){
    this.getUsers();
  }

  componentWillUnmount() {
    this.usersRequest.abort();
  }

  getUsers(){
    const panel = this;
    this.usersRequest = 
      axios.get("https://raw.githubusercontent.com/Kyran88/jsonplaceholder/master/users")
        .then(function (response) {
          panel.setState({ users: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getPosts(userId){
    const panel = this;
    this.postsRequest = 
      axios.get("https://raw.githubusercontent.com/Kyran88/jsonplaceholder/master/posts", {params: {userId}})
        .then(function (response) {
          panel.setState({ posts: response.data, comments: [] });
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  getComments(postId){
    const panel = this;
    this.commentsRequest = 
      axios.get("https://raw.githubusercontent.com/Kyran88/jsonplaceholder/master/comments", {params: {postId}})
        .then(function (response) {
          panel.setState({ comments: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-4">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">Users  <small>Select a user to see details</small></h3>
            </div>
            <div className="panel-body">
              <Users 
                users={this.state.users}
                getPosts={this.getPosts}
                postsRequest={this.postsRequest} />
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="panel panel-success">
            <div className="panel-heading">
              <h3 className="panel-title">Posts <small>Hover on post to see content</small></h3>
            </div>
            <div className="panel-body">
              <Posts 
                posts={this.state.posts} 
                getComments={this.getComments} 
                commentsRequest={this.commentsRequest} />
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title">Comments <small>Hover on comment to see content</small></h3>
            </div>
            <div className="panel-body">
              <Comments comments={this.state.comments} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// Render main component
ReactDOM.render(<Panel />, document.getElementById('root'));

function Users(props){  
  return (
    <ul className="list-unstyled">
      {props.users.map((user) => {
        return (
          <li key={user.id} onClick={() => props.getPosts(user.id)}>
            <span className="glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp;
            {user.name}
          </li>
        )
      })}
    </ul>
  );
}

function Posts(props) {
  return (
    <ul className="list-unstyled posts">
      {props.posts.map((post) => {
        return (
          <li key={post.id} onClick={() => props.getComments(post.id)}>
            <div title={post.body}>{post.title}</div>
          </li>
        )
      })}
    </ul>
  )
}

function Comments({ comments }) {
  return (
    <ul className="list-unstyled comments">
      {comments.map((comment) => {
        return (
          <li key={comment.id}>
            <div title={comment.body}>{comment.name}</div>
          </li>
        )
      })}
    </ul>
  )
}
