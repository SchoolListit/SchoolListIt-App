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
    
    this.state = {
        contentState,
      }
  }

    isJSON = (str) => {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
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

      dontPanic = (post) => {
       let content = {
            "blocks": [
              {
                "key": "rjbm",
                "text": "Dont Panic",
                "type": "header-two",
                "depth": 0,
                "inlineStyleRanges": "[]",
                "entityRanges": "[]",
                "data": "{}"
              },
              {
                "key": "174b8",
                "text": "Your content is in the database, but there was an error translating it back into the editor. No Problem. Please contact us and we will do our best to recover it. Sorry for the inconvenience.",
                "type": "unstyled",
                "depth": 0,
                "inlineStyleRanges": "[]",
                "entityRanges": "[]",
                "data": "{}"
              }
            ],
            "entityMap": "{}"
          }
        return content; 
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
        let changed = {
          attribute: 'draft_js_content',
          value: JSONContent
        }
        this.props.onChanged(changed);
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
    let initialContentState = "";
    let contentIsJson = this.isJSON(this.props.postContent.draft_js_content);
    let hasContent = (this.props.postContent.draft_js_content !== '') ? true : false ;
    if(contentIsJson && hasContent){
      initialContentState = JSON.parse(this.props.postContent.draft_js_content);
    } 
    if(hasContent && contentIsJson === false){
      initialContentState = this.dontPanic(this.props.postContent);
    }
    let editorWrapperClass = (this.props.isAuthor === true) ? "schoolistit-lesson-creator" : 'editor-disabled';


    return (
      <Container style={{padding: '30px'}}>
          <Editor
          initialContentState={initialContentState}  
          wrapperClassName="schoolistit-creator-wrapper"
          editorClassName={editorWrapperClass}
          onContentStateChange={this.onContentStateChange}
          toolbarHidden={!this.props.isAuthor}
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
                icon: 'http://schoolistit.com/wp-content/uploads/2020/06/video-icon-02.png',
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
        {(this.props.isAuthor === true)
          ? <Button onClick={() => this.clickSave()} variant="contained" color="primary" style={{margin: '15px 15px 15px 0'}}>
            <Typography variant="h6">
              <FontAwesomeIcon icon="save"></FontAwesomeIcon>
              {" Save"}
            </Typography>
          </Button>
          : null
        }
        
      </Container>
    );
  }
}

export default BlockEditor;
// <Heartbeat heartbeatFunction={this.clickSave} heartbeatInterval={12000} />
