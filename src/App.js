import axios from "axios";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { imageDb } from "./Config";

// getDownloadURL: tham chiếu đến file trong bộ lưu trữ để lấy URL tải xuống của một tệp đã lưu trữ trong Firebase
// ref:  tạo một tham chiếu đến vị trí của tệp.
// uploadBytes: tải dữ liệu lên vị trí được chỉ định
// listAll: liệt kê tất cả các files được chỉ định

function App() {
  const [img, setImg] = useState(null);
  const [imgUrls, setImgUrls] = useState([]);

  const handleClick = () => {
    if (img !== null) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          setImgUrls((data) => [...data, url]);
          axios.post("https://66a0979c7053166bcabbed65.mockapi.io/testURL", {
            imageURL: url,
          });
        });
      });
    }
  };

  useEffect(() => {
    listAll(ref(imageDb, "files")).then((imgs) => {
      console.log(imgs);
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgUrls((data) => [...data, url]);
        });
      });
    });
  }, []);

  console.log(imgUrls, "imgUrl");
  return (
    <div>
      <input type="file" onChange={(e) => setImg(e.target.files[0])}></input>
      <button onClick={handleClick}>Upload</button>
      <br />
      {imgUrls.map((dataVal, index) => (
        <div key={index}>
          <img src={dataVal} height={200} width={200}></img>
          <br />
        </div>
      ))}
    </div>
  );
}

export default App;
