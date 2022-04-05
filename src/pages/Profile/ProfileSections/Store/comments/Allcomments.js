import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Allcomments({ setShowAllComments, contentData }) {
  const user = useSelector((state) => state.User.user);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [counter,setCounter] = useState(0);
  useEffect(async () => {
    if (contentData.comments) {
      setTotalComments(contentData.comments.length);
      for (var i = 0; i < 2; i++) {
        if (contentData.comments[i]) {
          let x = counter + 1;
          setCounter((counter) => counter+1);
          const res = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/user/shortData/${contentData.comments[i].user_id}`,
          );
          let temp = {
            ...contentData.comments[i],
            profile_image: res.data.profile_image,
            username: res.data.username,
            name: res.data.name,
          };
          setComments((comments) => [...comments, temp]);
        }
      }
    } else {
      setComments(null);
    }
  }, [contentData]);
  const handleLoadComments = async() =>{
    console.log(counter);
    console.log(totalComments);
    if(counter < totalComments){
      for (var i = counter; i < counter + 5; i++) {
        if (contentData.comments[i]) {
          let x = counter + 1;
          setCounter((counter) => counter+1);
          const res = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/user/shortData/${contentData.comments[i].user_id}`,
          );
          let temp = {
            ...contentData.comments[i],
            profile_image: res.data.profile_image,
            username: res.data.username,
            name: res.data.name,
          };
          setComments((comments) => [...comments, temp]);
        }
      }
    }
  }
  return (
    <div className="mx-4 my-1">
      <div
        onClick={() => setShowAllComments(false)}
        className="cursor-pointer text-white  ml-5 m-3 "
      >
        Latest comments <i className="fa-solid fa-sort-down self-center  "></i>
      </div>
      {comments.map((comment, index) => (
        <div className="flex" key={index}>
          <img src={comment.profile_image} className="h-8 w-8 mr-2 rounded-full"></img>
          <div>
            <div className="text-gray-300 border border-dbeats-dark-secondary  rounded-lg px-3  py-2 nm-inset-dbeats-dark-primary">
              <div className="font-semibold">{comment.name}</div>
              <p>{comment.comment}</p>
            </div>
            <div className="text-xs my-1 ml-2 cursor-pointer group">
              <i className="fa-solid fa-heart group-hover:text-red-600"></i> Like
            </div>
          </div>
        </div>
      ))}

      <div className="text-sm ml-2 my-3 cursor-pointer" onClick={handleLoadComments}>Load more comments...</div>
    </div>
  );
}

export default Allcomments;
