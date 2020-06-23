import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button, Typography  } from '@material-ui/core';
import { convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Heartbeat from 'react-heartbeat';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



class BlockEditor extends Component {
  constructor(props) {
    super(props);
    let contentState = "";
    if(this.isJSON(this.props.postContent.draft_js_content)){
      contentState = convertFromRaw(JSON.parse(this.props.postContent.draft_js_content));
    }
    console.log(this.isJSON(this.props.postContent.draft_js_content))
    
    this.state = {
      contentState,
    }
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

      isJSON = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
      }
      onContentStateChange = (contentState) => {
        this.setState({
          contentState,
        });
      };
    
      clickSave = () => {
        this.saveContent(JSON.stringify(this.state.contentState, null, 4));
      }
    
      saveContent = (JSONContent) => {
        let contentBlocks = {
            empty: ""
        }
        let post_content = JSON.stringify(contentBlocks);
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
                  blocks: post_content,
                  rawContent: JSONContent
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

  uploadImageCallBack = (file) => {
    
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
              post_id: this.props.postID,
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
    const { contentState } = this.state;
    let initialContentState = ""
    if(this.isJSON(this.props.postContent.draft_js_content)){
      initialContentState = JSON.parse(this.props.postContent.draft_js_content);
    } 
    return (
      <Container style={{padding: '30px'}}>
          <Editor
          initialContentState={initialContentState}  
          wrapperClassName="schoolistit-creator-wrapper"
          editorClassName="schoolistit-lesson-creator"
          onContentStateChange={this.onContentStateChange}
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
