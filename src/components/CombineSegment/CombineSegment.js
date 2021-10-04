import React, { useEffect, useState } from 'react';
import './CombineSegment.css'

function CombineSegment() {
  const [rows, setRows] = useState([]);

  const validURL = (e) => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    console.log("!!pattern.test(e.target.value)", !!pattern.test(e.target.value));
    // if (!!pattern.test(e.target.value)) {
    //   setRequest({
    //     ...request,
    //     video_link: e.target.value
    //   })
    // }
    // setIsValid({
    //   ...isValid,
    //   url: !!pattern.test(e.target.value)
    // })
  }

  const onAddClick = (e) => {
    setRows([...rows, rows.length + 1])
  }

  const onDeleteClick = (e) => {
    console.log(rows)
    if (rows.length <= 1) {
      setRows([]);
    } else {
      let arr = [...rows];
      arr.pop();
      setRows(arr)
    }
  }

  return (
    <div className="combine-segement">
      <h2>Combine Video</h2>
      <div>
        <button className="add-video" onClick={onAddClick}>Add Video</button>
        {rows.length > 0 && rows.map((elem, index) => {
          return <div className="row-div">
            <div className="row-div-link">
              <label>Video Link:</label>
              <input type="url" name="url"
                placeholder="https://example.com"
                pattern="https://.*"
                onChange={validURL}
                required className={`combine-video-${index + 1}`} />
            </div>
            <div className="row-div-start">
              <label>Start at (in seconds)</label>
              <input type="number" className={`combine-video-range-duration-start-${index + 1}`} />
            </div>
            <div className="row-div-end">
              <label>End at (in seconds)</label>
              <input type="number" className={`combine-video-range-duration-end-${index + 1}`} />
            </div>
            <button className={`delete-combine-video-range-duration-${index + 1} delete-video`} onClick={onDeleteClick}>Delete</button>
          </div>
        })}
      </div>
    </div>
  );
}

export default CombineSegment;
