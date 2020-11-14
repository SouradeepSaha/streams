import _ from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = (props) => {
  const streamId = props.match.params.id;

  useEffect(() => {
    props.fetchStream(streamId);
  }, []);

  const onSubmit = (formValues) => {
    props.editStream(streamId, formValues);
  };

  if (!props.stream) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        initialValues={_.pick(props.stream, "title", "description")}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

const mapDispatchToProps = {
  fetchStream,
  editStream,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamEdit);
