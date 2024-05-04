import "./convert.css";
import Download from "../pages/Download";
import Swal from "sweetalert2";
import axios from "axios";
import { saveAs } from "file-saver";
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
    setUrl("");
    console.clear();
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
  const [audioLink, setAudioLink] = useState("");

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
        setAudioLink(res.data.link);
        setShowDownloadButton(true);
        // setFileTitle(res.data.title);
        //setDuration(secondsToTime(res.data.duration));
        setFileSize(bytesToMB(res.data.filesize));
        startConvert3();
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
        startConvert3();
      }
    }
  };

  const [imageSrc, setImageSrc] = useState(null);
  /*
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
        youtubeLink: url,
      },
      responseType: "arraybuffer",
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
  };*/

  //convert 3
  const [thumbnail1, setThumbnail1] = useState("");
  const [thumbnail2, setThumbnail2] = useState("");
  const [thumbnail3, setThumbnail3] = useState("");
  const [thumbnail4, setThumbnail4] = useState("");

  const [audio1, setAudio1] = useState("");
  const [audio2, setAudio2] = useState("");
  const [audio3, setAudio3] = useState("");

  const [mp4, setMp4] = useState("");
  const [mp4_2, setMp4_2] = useState("");

  const [downloadMP3, setDownloadMp3] = useState("");
  const [downloadMP4, setDownloadMp4] = useState("");
  const [downloadThumbnail, setDownloadThumbnail] = useState("");

  const startConvert3 = (e) => {
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
        "X-RapidAPI-Host": "ytstream-download-youtube-videos.p.rapidapi.com",
      },
      params: {
        id: youtubeID,
      },
    };

    axios(options)
      .then((res) => {
        setUrlResult(res);

        console.log(res.data.formats[0].url);

        setThumbnail1(res.data.thumbnail[0].url);
        setThumbnail2(res.data.thumbnail[1].url);
        setThumbnail3(res.data.thumbnail[2].url);
        setThumbnail4(res.data.thumbnail[3].url);

        setDuration(secondsToTime(res.data.lengthSeconds));
        setFileTitle(res.data.title);
        startConvert();
        // setFileTitle(res.data.captions.description);

        setAudio1(res.data.formats[0].url);

        setMp4(res.data.formats[1].url);
        setMp4_2(res.data.formats[2].url);

        //inputUrl.current.value = "";
      })
      .catch((err) => console.log(err));
  };

  const handleSizeChange = (event) => {
    const selectedSize = event.target.value;
    if (selectedSize === "1") {
      setDownloadThumbnail(thumbnail1);
    } else if (selectedSize === "2") {
      setDownloadThumbnail(thumbnail2);
    } else if (selectedSize === "3") {
      setDownloadThumbnail(thumbnail3);
    } else {
      setDownloadThumbnail(thumbnail4);
    }
  };

  const handleFormat = (event) => {
    const selectedSize = event.target.value;
    if (selectedSize === "1") {
      setDownloadMp3(audio1);
    }
  };
  const handleVideoQuality = (event) => {
    const selectedSize = event.target.value;
    if (selectedSize === "1") {
      setDownloadMp4(audio1);
    } else if (selectedSize === "2") {
      setDownloadMp4(mp4);
    } else if (selectedSize === "3") {
      setDownloadMp4(mp4_2);
    } else {
      setDownloadMp4(mp4);
    }
  };

  const imageProxyUrl = `https://i.ytimg.com=${encodeURIComponent(thumbnail1)}`;

  function downloadImage(url, filename) {
    alert(url);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      })
      .catch((error) => {
        console.error("Error downloading the image:", error);
        // Display an error message to the user here, or handle the error appropriately
      });
  }

  function downloadImages() {
    const imageUrl = "https://i.ytimg.com/vi_webp/RuAx8ndhvxA/default.webp";

    fetch(imageUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch the image");
        }
        return res.blob();
      })
      .then((blob) => {
        let url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Image.png";
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error(error);
      });
  }

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

                      <img src={thumbnail2} alt="" />
                      <div className="download_button">
                        {" "}
                        <span className="file_size">
                          {" "}
                          Time : {duration}{" "}
                        </span>{" "}
                        {/* <span className="file_size">{fileSize} MB</span>{" "}*/}
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
                  <div className="buttons">
                    <div className="download-mp3">
                      <a
                        class="btn btn-primary"
                        href={audioLink}
                        //  target="_blank"
                      >
                        Download mp3
                      </a>
                    </div>
                    <div className="download-video">
                      <div className="select">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={handleVideoQuality}
                        >
                          <option selected>Default Quality</option>
                          <option value="1">144p</option>
                          <option value="2">360p</option>
                          <option value="3">720p</option>
                        </select>
                      </div>
                      <a
                        class="btn btn-primary"
                        href={downloadMP4}
                        target="_blank"
                      >
                        Video download
                      </a>
                    </div>
                    <div className="download-thumbnail">
                      <div className="select">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={handleSizeChange}
                        >
                          <option selected>Default Size</option>
                          <option value="1">W:120 , H:90</option>
                          <option value="2">W:320 , H:180</option>
                          <option value="3">W:480 , H:360</option>
                          <option value="4">W:640 , H:480</option>
                        </select>
                      </div>
                      <a
                        class="btn btn-primary"
                        href={downloadThumbnail}
                        target="_blank"
                      >
                        thumbnail download
                      </a>
                      {/* <button
                        onClick={() =>
                          downloadImage(imageProxyUrl, "image.jpeg")
                        }
                      >
                        {" "}
                        download
                      </button>
                      <button onClick={downloadImage}>btn</button> */}
                    </div>

                    <div className="cancel_button">
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={close}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
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
