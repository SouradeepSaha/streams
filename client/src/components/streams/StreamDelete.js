import React, { useEffect } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";
import { Link } from "react-router-dom";

const StreamDelete = (props) => {
  const streamId = props.match.params.id;

  //First, fetch the stream and set it to the redux store
  useEffect(() => {
    props.fetchStream(streamId);
  }, []);

  const actions = (
    <div>
      <button
        onClick={() => {
          props.deleteStream(streamId);
        }}
        className='ui button negative'
      >
        Delete
      </button>
      <Link to='/' className='ui button'>
        Cancel
      </Link>
    </div>
  );

  const renderContent = () => {
    if (!props.stream) {
      return "Are you sure you want to delete the stream?";
    }
    return `Are you sure you want to delete the stream with title: ${props.stream.title} `;
  };

  return (
    <Modal
      title='Delete Stream'
      content={renderContent()}
      actions={actions}
      onDismiss={() => {
        history.push("/");
      }}
    />
  );
};

const mapDispatchToProps = {
  fetchStream,
  deleteStream,
};

//Then, get the stream from redux state and set it to props
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamDelete);
