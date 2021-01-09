import _ from 'lodash';
import React from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';



const getColor = (props) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isDragActive) {
      return '#2196f3';
  }
  return '#bebebe';
}

const Container = styled.div`
  margin-top: 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
  height: 300px;
`;

export const VideoSelectScreen = (props) =>{
    const onDrop = (files) => {
        const videos = _.map(files, ({name, path, size, type}) => {
            return {name, path, size, type};
        });
        if(videos.length) {
            //  props.addVideos(videos);
            console.log("Printing jayant log: ");
            console.log(videos);

            if(props.small) {
                props.history.push('/convert');
            }
        }
    }

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
      } = useDropzone({
          accept: 'video/mp4',
          onDrop: onDrop
        });

        
      
    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
        {file.path} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
            {errors.map(e => (
            <li key={e.code}>{e.message}</li>
            ))}
        </ul>
        </li>
    ));

    // const renderChildren = ({ isDragActive, isDragReject}) => {
    //     if(isDragActive) {
    //         return <h4 className="drop-message">Yeah, this LOOKS GOOD, Please Drop here</h4>;
    //     } else if(isDragReject) {
    //         return <h4 className="drop-message">Uh oh, I don't know this file format and how to read this.</h4>;
    //     } else {
    //         {
    //             return <h4 className="drop-message">Drag and Drop some file or Select files from your computer.</h4>;
    //         }
    //     }
    // }

  return (
    <section className="Container">
      <div className="container">
        <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop multiple videos here or click to select files</p>
            
        </Container>
        </div>
      
      
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
}



