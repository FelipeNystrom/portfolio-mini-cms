import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import ReactDropzone from 'react-dropzone';
import styles from './HandleProject.css';

class HandleProject extends Component {
  state = {
    username: '',
    projects: [],
    titleInput: '',
    bodyInput: '',
    roleInput: '',
    files: [],
    oldImgPublicId: '',
    fileTypeError: '',
    destroy: false,
    update: false,
    redirect: false,
    msgFromServer: '',
    errorMsgFromServer: ''
  };

  componentDidMount() {
    const { update, match } = this.props;
    if (update) {
      this.getProject(match.params.id);
      this.setState({ update: true });
    }
  }

  componentWillUnmount() {
    this.state.files.forEach(file => {
      window.URL.revokeObjectURL(file.preview);
    });
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  onPreviewDrop = (files, rejected) => {
    if (files) {
      this.setState({ files: files, fileTypeError: '' });
    }
    if (rejected.length !== 0) {
      this.setState({ fileTypeError: 'Image must be of type .jpg/.jpeg/.png' });
    }
  };

  getProject = id => {
    const url = `http://localhost:7000/admin/project/update/${id}`;
    fetch(url, {
      method: 'GET',
      headers: {
        authorization: localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(result => result.json())
      .then(project => {
        console.log(project);
        const imgSrc = { preview: project.image };
        this.setState({
          titleInput: project.title,
          bodyInput: project.body,
          roleInput: project.role,
          oldImgPublicId: project.image_public_id,
          files: [imgSrc]
        });
      })
      .catch(err => console.error(err));
  };

  req = (url, methodType, formData) => {
    console.log(url);
    console.log(methodType);
    return fetch(url, {
      method: methodType,
      headers: {
        authorization: localStorage.getItem('token')
      },
      body: formData
    });
  };

  sendToServer = e => {
    e.preventDefault();
    const {
      titleInput,
      bodyInput,
      roleInput,
      files,
      update,
      destroy,
      oldImgPublicId
    } = this.state;

    const { updateProjects } = this.props;

    let url = 'http://localhost:7000/admin/project/new';
    let methodType = 'POST';
    const formData = new FormData();
    formData.append('title', titleInput);
    formData.append('text', bodyInput);
    formData.append('role', roleInput);
    formData.append('image', files[0]);

    if (update) {
      const { match } = this.props;
      const { id } = match.params;
      methodType = 'PUT';
      url = `http://localhost:7000/admin/project/update/${id}`;

      formData.append('oldImgPublicId', oldImgPublicId);
      if (files[0].preview.substr(59, 54) === oldImgPublicId) {
        formData.delete('image', files[0]);
        formData.append('keepLink', files[0].preview);
      }

      this.req(url, methodType, formData)
        .then(res => res.json())
        .then(msg =>
          this.setState({
            msgFromServer: msg.message,
            redirect: true
          })
        )
        .catch(err => console.error('error: ', err));
    }

    if (destroy) {
      const { match } = this.props;
      const { id } = match.params;
      url = `http://localhost:7000/admin/project/delete/${id}`;

      methodType = 'DELETE';
      const deleteImg = new FormData();
      deleteImg.append('publicId', oldImgPublicId);

      this.req(url, methodType, deleteImg)
        .then(res => res.json())
        .then(msg => {
          updateProjects(msg.id);
          this.setState({
            msgFromServer: msg.message,
            redirect: true
          });
        })
        .catch(err => console.error('error: ', err));
    }

    if (methodType === 'POST') {
      this.req(url, methodType, formData)
        .then(res => res.json())
        .then(result => {
          console.log(result);
          updateProjects(result.id);
          this.setState({
            msgFromServer: result.message,
            titleInput: '',
            bodyInput: '',
            roleInput: '',
            files: []
          });
        })
        .catch(err => console.error('error: ', err));
    }
  };

  render() {
    const {
      titleInput,
      bodyInput,
      roleInput,
      files,
      fileTypeError,
      redirect
    } = this.state;

    const { update, destroy } = this.props;

    const previewStyle = {
      display: 'inline',
      width: 100,
      height: 100
    };
    return (
      <Fragment>
        <form className={styles.form} onSubmit={this.sendToServer}>
          <input
            type="text"
            name="titleInput"
            value={titleInput}
            onChange={this.handleChange}
            placeholder="title"
            required
          />
          <input
            type="text"
            name="roleInput"
            value={roleInput}
            onChange={this.handleChange}
            placeholder="role"
            required
          />
          <textarea
            name="bodyInput"
            value={bodyInput}
            onChange={this.handleChange}
            placeholder="text"
            required
          />
          <div>
            <ReactDropzone
              className={styles.dropzone}
              accept="image/jpeg, image/png"
              onDrop={this.onPreviewDrop}
              multiple={false}
            >
              <div className={styles.dropzoneInner}>
                <h6>Drop Image Here</h6>
              </div>
            </ReactDropzone>
            {files.length > 0 && (
              <div className={styles.preview}>
                <h6>Preview</h6>
                {files.map((file, i) => (
                  <img
                    alt="Preview"
                    key={i}
                    src={file.preview}
                    style={previewStyle}
                  />
                ))}
              </div>
            )}

            {fileTypeError && (
              <div className={styles.preview}>{fileTypeError}</div>
            )}
            {update || destroy ? (
              <div className={styles.projectOpts}>
                <button type="submit" name="PUT" className={styles.update}>
                  Update
                </button>
                <button
                  type="submit"
                  name="DELETE"
                  onClick={() =>
                    this.setState({ update: false, destroy: true })
                  }
                  className={styles.destroy}
                >
                  Delete
                </button>
              </div>
            ) : (
              <button type="submit" name="POST" className={styles.save}>
                Save
              </button>
            )}
            {redirect && <Redirect to="/admin" />}
          </div>
        </form>
      </Fragment>
    );
  }
}

export default HandleProject;
