import React, { useState } from 'react';
import './VideoSegment.css'

function VideoSegment() {
  const [videoResponse, setVideoResponse] = useState();
  const [isValid, setIsValid] = useState({
    url: false,
    interval_duration: 0
  });
  const [request, setRequest] = useState({
    video_link: "",
    interval_duration: 0
  });
  const [segmentValue, setSegmentValue] = useState("select")

  const validURL = (e) => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    if (!!pattern.test(e.target.value)) {
      setRequest({
        ...request,
        video_link: e.target.value
      })
    }
    setIsValid({
      ...isValid,
      url: !!pattern.test(e.target.value)
    })
  }

  const segmentSelect = (e) => {
    setSegmentValue(e.target.value);
  }

  const onIntervalChange = (e) => {
    if (e.target.value) {
      setRequest({
        ...request,
        interval_duration: parseInt(e.target.value)
      })
    }
    setIsValid({
      ...isValid,
      interval_duration: e.target.value
    })
  }

  const segmentClick = (e) => {
    e.preventDefault();
    console.log("request", request)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    };
    fetch('http://3.91.6.76:4060/api/process-interval', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log("data", data)
        setVideoResponse(data)
      });
  }

  return (
    <div className="video-segement">
      <h2>Segment Video</h2>
      <div>
        <div className="link-div">
          <label>Video Link:</label>
          <input type="url" name="url" id="url"
            placeholder="https://example.com"
            pattern="https://.*"
            onChange={validURL}
            required className="video-link" />
        </div>
        <div className="link-div">
          <label>Select Segment Settings:</label>
          <select className="segment-setting" onChange={segmentSelect} value={segmentValue}>
            <option value="select">Select Segment settings...</option>
            <option value="Interval Duration">Interval Duration</option>
          </select>
        </div>
        {(segmentValue === "Interval Duration") && <div className="link-div">
          <label>Interval Duration (in seconds)...</label>
          <input type="number" onChange={onIntervalChange} className="interval-duration" />
        </div>}
        <button className="process-video"
          onClick={segmentClick}
          disabled={(isValid.url && isValid.interval_duration > 0) ? false : true}>Segment Video</button>
      </div>
      {videoResponse && videoResponse.interval_videos && (
        <div className="video-div">
          {videoResponse.interval_videos.map((video, index) => {
            return (<video width="320" height="240" className={`segmented-video-${index+1}`} controls>
              <source src={video.video_url} className={`segmented-video-source-${index+1}`} type="video/mp4"></source>
            </video>)
          })}
        </div>
      )}
    </div>
  );
}

export default VideoSegment;
