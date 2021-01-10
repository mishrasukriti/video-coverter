import React from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';

import { HomeButton } from "../components/HomeButton";
import { useHistory } from "react-router-dom";



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
  text: 20px;
`;


export const EmptyFolderSelectScreen = (props) =>{
    // let videosData;
    // const [videos, setVideos] = useState([]);
    const history = useHistory();

    // const onDrop  = useCallback((acceptedFiles) => {
    //     acceptedFiles.forEach((file) => {
    //       const reader = new FileReader()
    
    //       reader.onabort = () => console.log('file reading was aborted')
    //       reader.onerror = () => console.log('file reading has failed')
    //       reader.onload = () => {
    //         props.setOutputPath(acceptedFiles.path);
    //       }
    //       reader.readAsArrayBuffer(file)
    //     })
        
    //   }, [])

    const onDrop = (files) => {
            if(files.length >0) {
                alert("Please select an empty folder");
            } else {
                alert("Empty folder selected. Your converted files will be saved in:");
                // let output = document.getElementById("emptyFolderId");
                // props.setOutputPath(output.files[0].webkitRelativePath);
                // alert(JSON.stringify(files));
                history.push('/videoSelect', { from: "EmptyFolderSelectScreen" });
            }
    }

     const onChangeOutputPath = (event) => {
        let files = event.target.files;
        props.setOutputPath(files[0].webkitRelativePath);
        alert('inside set outtput path alert');
        alert(props.outputPath);
     }

      const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
      } = useDropzone({
          onDrop: onDrop,
          accept:'*'
        });

        let acceptedFileItems = acceptedFiles.map(file => (
            <li key={file.path}>
            {file.path} - {file.size} bytes
            </li>
        ));

  return (
    <div>
      <section className="Container">
        <HomeButton/>
        <div className="container">
          <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
              <input {...getInputProps()} id="emptyFolderId" directory webkitdirectory onSelect={onChangeOutputPath} />
              <h3>Drag and drop Empty Folder here to start a new project</h3>
              
          </Container>
          <aside>
          <h4>Accepted files</h4>
          <ul>{acceptedFileItems}</ul>
        </aside>
          </div>
      </section>
    </div>
    
  );
}



