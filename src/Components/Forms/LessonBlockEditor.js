import React from "react";
import ReactDOM from "react-dom";
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from "megadraft";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container  } from '@material-ui/core';


//Import megadraft.css
import 'megadraft/dist/css/megadraft.css'

export default class LessonBlockEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: editorStateFromRaw(null)};
  }

  onChange = (editorState) => {
    this.setState({editorState});
  }

  saveLesson = () => {
    const {editorState} = this.state;
    const content = editorStateToJSON(editorState);
    // Your function to save the content
    // save_my_content(content);
    this.props.updateContent(content);
  }

  render() {
    return (
      //Add some margin left to show plugins sidebar
      <Container style={{padding: "30px", marginLeft: 80}}>
        <MegadraftEditor
          editorState={this.state.editorState}
          onChange={this.onChange}
          placeholder='Add some text'/>
        <Button onClick={() => this.saveLesson()}>
          <FontAwesomeIcon icon="save"> {" Save"}</FontAwesomeIcon>
        </Button>
      </Container>
    )
  }
}