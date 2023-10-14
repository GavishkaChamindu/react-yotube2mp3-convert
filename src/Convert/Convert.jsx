import "./convert.css";
import axios from "axios";
import { useRef, useState } from "react";
import { youtube_parser } from "./Youtube";

export default function Convert() {
  const inputUrl = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const startConvert = (e) => {
    e.preventDefault(e);

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
      .then((res) => setUrlResult(res.data.link))
      .catch((err) => console.log(err));
    inputUrl.current.value = "";
  };

  return (
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
              Transform YouTube videos into  MP3 in just a few clicks !{" "}
            </span>

            <div className="center_input">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  ref={inputUrl}
                />
              </div>
            </div>
            <button type="button" class="btn btn-info" onClick={startConvert}>
              Search
            </button>


<br />
            {urlResult ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={urlResult}
                className="download_link"
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
  );
}
