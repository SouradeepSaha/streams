import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";

const StreamList = (props) => {
  const renderAdmin = (stream) => {
    if (props.currentUserId === stream.userId) {
      return (
        <div className='right floated content'>
          <Link to={`/streams/edit/${stream.id}`} className='ui button primary'>
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className='ui button negative'
          >
            Delete
          </Link>
        </div>
      );
    }
  };

  const renderCreate = () => {
    if (props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link className='ui button primary' to='/streams/new'>
            Create
          </Link>
        </div>
      );
    }
  };

  const renderList = () => {
    return props.streams.map((stream) => {
      return (
        <div className='item' key={stream.id}>
          {renderAdmin(stream)}
          <i className='large middle alligned icon camera' />
          <div className='content'>
            <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
            <div className='description'>{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  //console.log(props);
  useEffect(() => {
    props.fetchStreams();
  }, []);
  return (
    <div>
      <h2>Streams</h2>
      <div className='ui celled list'>{renderList()}</div>
      {renderCreate()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

const mapDispatchToProps = {
  fetchStreams,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamList);
