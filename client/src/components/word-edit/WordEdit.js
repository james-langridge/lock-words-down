import React, { useState, useEffect, useRef } from 'react'; // https://reactjs.org/
import { Form, Row, Col, Button } from 'react-bootstrap'; // https://react-bootstrap.github.io/
import Dropzone from 'react-dropzone'; // https://react-dropzone.js.org/
import axios from 'axios'; // https://www.npmjs.com/package/axios
// import { API_URL } from '../../utils/constants';
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';

const WordEdit = (props) => {
  // https://reactjs.org/docs/hooks-intro.html
  // https://reactjs.org/docs/hooks-reference.html#usestate
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [image, setImage] = useState(null);
  const [state, setState] = useState({
    word: '',
    syllable: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(true); // state to show preview only for images
  // https://reactjs.org/docs/hooks-reference.html#useref
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const query = useQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    const getFile = async () => {
      try {
        const { data } = await axios.get('file/getFile/' + query.get('id'));
        setErrorMsg('');
        setState({
          ...state,
          word: data.word,
          syllable: data.syllable
        });
        setPreviewSrc('http://localhost:5000/' + data.file_path);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFile();
  }, []);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const onDrop = (files) => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    // assigns files[0] to uploadedFile
    const [uploadedFile] = files;
    setFile(uploadedFile);

    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };

  // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
    try {
      const { word, syllable } = state;
      if (word.trim() !== '' && syllable.trim() !== '') {
        if (!file) {
          // https://developer.mozilla.org/en-US/docs/Web/API/FormData
          const formData = new FormData();
          formData.append('word', word);
          formData.append('syllable', syllable);

          setErrorMsg('');
          await axios.post('file/update/' + query.get('id'), formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          props.history.push('/list');
        } else if (file) {
          // https://developer.mozilla.org/en-US/docs/Web/API/FormData
          const formData = new FormData();
          formData.append('file', file);
          formData.append('word', word);
          formData.append('syllable', syllable);

          setErrorMsg('');
          await axios.post('file/update/' + query.get('id'), formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          props.history.push('/list');
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  return (
    // https://reactjs.org/docs/fragments.html
    <React.Fragment>
      <Form className="search-form" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Row>
          <Col>
            <Form.Group controlId="word">
              <Form.Control
                type="text"
                name="word"
                value={state.word || ''}
                placeholder="Enter word"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="syllable">
              <Form.Control
                type="text"
                name="syllable"
                value={state.syllable || ''}
                placeholder="Enter syllable"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="upload-section">
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder('over')}
            onDragLeave={() => updateBorder('leave')}
          >
            {({ getRootProps, getInputProps }) => (
              // https://reactjs.org/docs/refs-and-the-dom.html
              <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                <input {...getInputProps()} />
                <p>Drag and drop a file OR click here to select a file</p>
                {file && (
                  <div>
                    <strong>Selected file:</strong> {file.name}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          {previewSrc ? (
            isPreviewAvailable ? (
              <div className="image-preview">
                <img className="preview-image" src={previewSrc} alt="Preview" />
              </div>
            ) : (
              <div className="preview-message">
                <p>No preview available for this file</p>
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )}
        </div>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default WordEdit;
