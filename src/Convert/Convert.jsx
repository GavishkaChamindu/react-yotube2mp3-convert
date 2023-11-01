import "./convert.css";
import Download from "../pages/Download";
import Swal from "sweetalert2";
import axios from "axios";
import { useRef, useState } from "react";
import { youtube_parser } from "./Youtube";

export default function Convert() {
  const [urlError, setUrlError] = useState("");
  const [showDownloadButton, setShowDownloadButton] = useState(true);
  const [fileTitle, setFileTitle] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [duration, setDuration] = useState(null);


  const [imageData, setImageData] = useState("");
const [base64Image, setBase64Image] = useState(null); 

  function bytesToMB(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2);
  }

  function secondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  function close() {
    setUrlResult(null);
  }
  const [url, setUrl] = useState("");

  function validateYouTubeUrl(urlToParse) {
    if (urlToParse) {
      var regExp =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (urlToParse.match(regExp)) {
        return true;
      }
    }

    Swal.fire({
      icon: "error",
      title: "Invalid URL...",
      text: "Something went wrong!",
      //inputUrl.current.value = "";
    });

    return false;
  }

  const inputUrl = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const startConvert = (e) => {
    if (e) {
      e.preventDefault();
    }

    const youtubeID = youtube_parser(inputUrl.current.value);
    console.log(youtubeID);

    const options = {
      method: "get",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      headers: {
        "X-RapidAPI-Key": "4342129c60msh3bcf52663ded8dep104820jsnd0f05668875d",
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
      params: {
        id: youtubeID,
      },
    };

    axios(options)
      .then((res) => {
        setUrlResult(res.data.link);
        setShowDownloadButton(true);
        setFileTitle(res.data.title);
        setDuration(secondsToTime(res.data.duration));
        setFileSize(bytesToMB(res.data.filesize));
        startConvert2();
       // console.log(res);
        //inputUrl.current.value = "";
      })
      .catch((err) => console.log(err));
    inputUrl.current.value = "";
  };

  const validation = () => {
    if (!url) {
      Swal.fire("Empty URL ?", "Enter valid URL ", "question");
    } else {
      if (validateYouTubeUrl(url)) {
        startConvert();
      }
    }
  };

  const [imageSrc, setImageSrc] = useState(null);

  const startConvert2 = (e) => {
    if (e) {
      e.preventDefault();
    }

    const youtubeID = youtube_parser(inputUrl.current.value);
    console.log(youtubeID);

    const options = {
      method: "get",
      url: "https://youtube-thumbnail-downloader1.p.rapidapi.com/api/Thumbnail/GetThumbnail",
      headers: {
        "X-RapidAPI-Key": "4342129c60msh3bcf52663ded8dep104820jsnd0f05668875d",
        "X-RapidAPI-Host": "youtube-thumbnail-downloader1.p.rapidapi.com",
      },
      params: {
        youtubeLink:url,
      },
      responseType: 'arraybuffer', 
    };

    axios(options)
      .then((res) => {
        console.log(res.data);
        
        
        const base64Image = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
       console.log(base64Image);

        // Set the base64 string as the source for the image
        setImageSrc(`data:image/jpeg;base64,${base64Image}`);

        // setBase64Image()
        //console.log(URL.createObjectURL(res.data));
        // console.log('response',);
        // setImageData('');
        //inputUrl.current.value = "";
        // const base64Image = btoa(String.fromCharCode.apply(null, imageData));
      // setBase64Image(base64Image);
      // console.log('img',imageData);
      //console.log('baseimage',base64Image);


      })
      .catch((err) => console.log(err));
    inputUrl.current.value = "";
  };


  return (
    <>
      <div className="list_set">
        <div className="up">
          <h2 className="upper_header">Youtube2mp3</h2>
        </div>

        <div className="down">
          <div className="home_content">
            <div className="content_list">
              <div className="header_youtube">
                <div class="container-fluid">
                  <h1 className="header_y">Youtube to MP3 Converter</h1>
                </div>
              </div>
             
              <span className="span_youtube">
                Transform YouTube videos into MP3 in just a few clicks !{" "}
              </span>
              

              {urlResult ? (
                <>
                  <div className="download_page">
                    <div className="download_page_content">
                      <div className="download_title">

                        <div className="image">
                        {/* <img src={`data:image/jpeg;base64,${base64Image}`} alt="Binary Image" /> */}
                       
                        

                        </div>
                        <div></div>

                        <span className="song_title">{fileTitle}</span>
                      </div> 
                      <img src={imageSrc} alt="Binary" className="thumbnail"/>
                      <div className="download_button">
                        {" "}
                        <span className="file_size">
                          {" "}
                          Time : {duration}{" "}
                        </span>{" "}
                        
                        <span className="file_size">{fileSize} MB</span>{" "}
                      </div>
                    </div>
                  </div>
                  <br />
                </>
              ) : (
                <>
                  <div className="center_input">
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        ref={inputUrl}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder={"Enter YouTube URL"}
                        style={{ textAlign: "center" }}
                      />
                    </div>
                  </div>

                  <div className="set_btn_width">
                    <button
                      type="button"
                      class="btn btn-primary btn-lg"
                      style={{ width: "250px" }}
                      onClick={validation}
                    >
                      Convert
                    </button>
                  </div>
                </>
              )}

              {urlResult ? (
                <>
                  <a
                    class="btn btn-primary"
                    data-bs-toggle="tooltip"
                    // target="_blank"
                    rel="noreferrer"
                    href={urlResult}
                    onClick={() => {
                      setUrlResult(null);
                      setUrl(null);
                    }}
                  >
                    Download MP3
                  </a>
                
                  <br />
                  <button type="button" class="btn btn-danger" onClick={close}>
                    Cancel
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
