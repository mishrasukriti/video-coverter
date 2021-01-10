import _ from 'lodash';
import React, { useState } from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';

import { HomeButton } from "../components/HomeButton";
import { Convert } from "../components/Convert";
window.ipcRenderer = window.require('electron').ipcRenderer;


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
    let videosData;
    const [videos, setVideos] = useState([]);
    const onDrop = (files) => {
        videosData = _.map(files, ({name, path, size, type}) => {
            return {name, path, size, type};
        });
        setVideos(videosData);
        if(videos.length) {
            console.log("Printing jayant log: ");
            console.log(videos);
        }
    }

    const onConvertClick = () => {
      console.log("inside convert click function. length of videos is: ");
      window.ipcRenderer.send('videos-added', videos, props.outputPath);
      window.ipcRenderer.on('conversion:end', (event) => {        
      alert("Videos converted successfully in HLS format");
      alert('Generated files are uploaded in the same folder where your mp4 file(s) was/were located');
      });
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

        
      
    let acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
        {file.path} - {file.size} bytes
        </li>
    ));

    let fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
            {errors.map(e => (
            <li key={e.code}>{e.message}</li>
            ))}
        </ul>
        </li>
    ));

  return (
    <div>
      <section className="Container">
        <HomeButton/>
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
        <Convert onConvertClick={onConvertClick} />
      </section>
    </div>
    
  );
}



