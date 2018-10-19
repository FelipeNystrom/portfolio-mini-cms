import React, { Component, Fragment } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactDropzone from 'react-dropzone';
import styles from './HandleProject.css';
import baseUrl from '../../_helpers/api';
import {
  updateProject,
  newProject,
  deleteProject,
  loadProjects
} from '../../_actions/projectAction';

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
    const { update, match, projects } = this.props;
    if (update) {
      if (projects.length === 0) {
        this.getProject(match.params.id);
      } else {
        const projectToUpdate = projects.filter(
          project => project.id === parseInt(match.params.id, 0)
        );

        const imgSrc = { preview: projectToUpdate[0].image };
        this.setState({
          titleInput: projectToUpdate[0].title,
          bodyInput: projectToUpdate[0].body,
          roleInput: projectToUpdate[0].role,
          oldImgPublicId: projectToUpdate[0].image_public_id,
          files: [imgSrc],
          update: true
        });
      }
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
    const url = `${baseUrl}/admin/project/update/${id}`;
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
          files: [imgSrc],
          update: true
        });
      })
      .catch(err => console.error(err));
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

    const { dispatch } = this.props;

    let url = `${baseUrl}/admin/project/new`;
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
      url = `${baseUrl}/admin/project/update/${id}`;

      formData.append('oldImgPublicId', oldImgPublicId);
      if (files[0].preview.substr(59, 54) === oldImgPublicId) {
        formData.delete('image', files[0]);
        formData.append('keepLink', files[0].preview);
      }

      dispatch(updateProject(url, methodType, formData));
      this.setState({ redirect: true });
    }

    if (destroy) {
      const { match } = this.props;
      const { id } = match.params;
      url = `${baseUrl}/admin/project/delete/${id}`;
      methodType = 'DELETE';
      const deleteImg = new FormData();
      deleteImg.append('publicId', oldImgPublicId);
      dispatch(deleteProject(url, methodType, deleteImg));
      this.setState({
        // msgFromServer: msg.message,
        redirect: true
      });
    }

    if (methodType === 'POST') {
      dispatch(newProject(url, methodType, formData));

      this.setState({
        // msgFromServer: result.message,
        titleInput: '',
        bodyInput: '',
        roleInput: '',
        files: []
      });
    }
    dispatch(loadProjects());
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
                    className={styles.previewStyle}
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
export default withRouter(connect()(HandleProject));
