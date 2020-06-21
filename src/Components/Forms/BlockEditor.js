import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button, Typography  } from '@material-ui/core';
import { EditorState, convertFromHTML, convertFromRaw, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Heartbeat from 'react-heartbeat';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



class BlockEditor extends Component {
    constructor(props) {
        super(props);
        let rawContent = JSON.parse(this.props.postContent);
        //let content = convertFromRaw(this.props.postContent);
        //let content = ContentState.createFromBlockArray(rawContent);
        //console.log(content);
        this.state = {
          editorState: EditorState.createWithContent(convertFromRaw(rawContent)),
          editorState: EditorState.createEmpty(),
          images: []
        };
      }

      prepareContent = (rawContent) => {
        let blocks = rawContent.blocks
          .map( block => {
          if(block.type === 'atomic'){
            let entityKey = block.entityRanges[0].key;
            block.data = rawContent.entityMap[entityKey].data;
          }
          if(block.type === 'unstyled' && block.entityRanges.length !== 0){
            block.links = {
              number: block.entityRanges.length,
              links: []
            };
            block.entityRanges.map( rangeData => {
              let substr = block.text.substring(rangeData.offset, (rangeData.offset+rangeData.length));
              let thisLink = {
                offset: rangeData.offset,
                length: rangeData.length,
                anchorText: substr,
                href: rawContent.entityMap[rangeData.key].data.url,
                target: rawContent.entityMap[rangeData.key].data.targetOption
              }
              block.links.links.push(thisLink);
            }) 
          }
          return block;
        })
        return blocks;
      }

      saveContent = (rawContent) => {
        let contentBlocks = this.prepareContent(rawContent);
        console.log(contentBlocks);
        const url = 'http://schoolistit.com/wp-json/schoolistit-rest/v2/post-content';
        //create user
        axios.get(url)
            .then( (res) => {
                const salt = res.data['salt'];
                const key = 'aVdG#D.KRFXw)dr!37}BrpkxdQM8N4';
                //const authHeader = btoa(salt+"_"+key);
                const authHeader = salt+"_"+key;
                let formdata = new FormData();
                let body = {
                  post_id: this.props.postID,
                  blocks: JSON.stringify(contentBlocks),
                  rawContent: JSON.stringify(rawContent)
                };
                const headers = {
                    "X-Scholistit-Auth": authHeader,
                    "Content-Type": "multipart/form-data"
                }
                for (const property in body) {
                    formdata.append(property, body[property]);
                }
                //make 2nd call
                axios.post(url, formdata, {headers: headers})
                .then( (res) => {
                 //console.log(res.data);
                })
            });
      }

  
  onEditorStateChange = (editorState) => {
      let newstate = this.state;
        newstate.editorState = editorState;
        this.setState({
        newstate
        });
    };

  clickSave = () => {
    let currentContent = this.state.editorState.getCurrentContent();
    this.saveContent(convertToRaw(currentContent));
  }

   imageToState = (newImage) => {
       let newState = this.state;
       newState.images.push(newImage);
       this.setState({
           newState
       });
   } 

  uploadImagetoWp = (imageKey, file) => {
    const url = 'http://localhost:8888/parentchecklist/wp-json/schoolistit-rest/v2/post-image';
    //create user
    axios.get(url)
        .then( (res) => {
            const salt = res.data['salt'];
            const key = 'aVdG#D.KRFXw)dr!37}BrpkxdQM8N4';
            //const authHeader = btoa(salt+"_"+key);
            const authHeader = salt+"_"+key;
            let formdata = new FormData();
            let body = {
              post_id: 190,
              alt: 'beaubeau',
              file: file
            }
            const headers = {
                "X-Scholistit-Auth": authHeader,
                "Content-Type": "multipart/form-data"
            }
            for (const property in body) {
                formdata.append(property, body[property]);
            }
            //make 2nd call
            axios.post(url, formdata, {headers: headers})
            .then( (res) => {
              return res.data;
            })
        });
    }

  uploadImageCallBack = (file) => {
    let imageKey = this.state.images.length + 1;
    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
      imagesKey: imageKey
    }
    return new Promise(
      (resolve, reject) => {
        const url = 'http://schoolistit.com/wp-json/schoolistit-rest/v2/post-image';
    //create user
    axios.get(url)
        .then( (res) => {
            const salt = res.data['salt'];
            const key = 'aVdG#D.KRFXw)dr!37}BrpkxdQM8N4';
            //const authHeader = btoa(salt+"_"+key);
            const authHeader = salt+"_"+key;
            let formdata = new FormData();
            let body = {
              post_id: 190,
              alt: 'beaubeau',
              file: file
            }
            const headers = {
                "X-Scholistit-Auth": authHeader,
                "Content-Type": "multipart/form-data"
            }
            for (const property in body) {
                formdata.append(property, body[property]);
            }
            //make 2nd call
            axios.post(url, formdata, {headers: headers})
            .then( (res) => {
              resolve({ data: { link: res.data.image_src } });
            })
        });
      }
    );  
  }

  

  embedVideoCallBack = (url) => {
    if(url.indexOf('youtu.be') !== '-1'){
      url = url.replace('https://youtu.be/', 'https://youtube.com/embed/');
    }
    return url;
  }

  render() {
    const { editorState } = this.state;
    return (
      <Container style={{padding: '30px'}}>
        <Heartbeat heartbeatFunction={this.clickSave} heartbeatInterval={12000} />
          <Editor
          initialEditorState={editorState}
          wrapperClassName="schoolistit-creator-wrapper"
          editorClassName="schoolistit-lesson-creator"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            options: ['blockType', 'list', 'link', 'emoji', 'embedded', 'image', 'remove', 'history'] , 
            blockType: {
                inDropdown: true,
                options: ['Normal', 'H2', 'H3', 'H4', 'Blockquote', 'Code'],
              },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { 
              inDropdown: true,
            },
            history: { inDropdown: true },
            embedded: {
                icon: 'http://localhost:8888/parentchecklist/wp-content/uploads/2020/06/video-icon-02.png',
                embedCallback: this.embedVideoCallBack,
                defaultSize: {
                    height: '315',
                    width: '560'
                },
            },
            image: { 
                uploadCallback: this.uploadImageCallBack,
                defaultSize: {
                    width: '100%'
                },
                previewImage: true,
                alt: { present: true, mandatory: true } },
            }
            }
        />
        <Button onClick={() => this.clickSave()} variant="contained" color="primary" style={{margin: '15px 15px 15px 0'}}>
          <Typography variant="h6">
            <FontAwesomeIcon icon="save"></FontAwesomeIcon>
            {" Save"}
          </Typography>
        </Button>
      </Container>
    );
  }
}

export default BlockEditor;
// <Heartbeat heartbeatFunction={this.clickSave} heartbeatInterval={12000} />
