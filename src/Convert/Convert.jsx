import "./convert.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useRef, useState } from "react";
import { youtube_parser } from "./Youtube";

export default function Convert() {
  const [urlError, setUrlError] = useState("");
  const [showDownloadButton, setShowDownloadButton] = useState(true);

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

  return (
    <>
      <div className="list_set">
        <div
          class="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="toast-header">
            <img src="..." class="rounded me-2" alt="..." />
            <strong class="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div class="toast-body">Hello, world! This is a toast message.</div>
        </div>

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
              <br />

              {urlResult ? (
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
