import React, { useEffect } from "react";
import { UseBookmarks } from "../../context/BookmarkListContext";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../LocationList/Loading";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const navigate = useNavigate();
  const { currentBookmark, isLoading, getBookmark } =
    UseBookmarks();
  const { id } = useParams();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  if (isLoading) return <Loading />;
  return (
    <div>
      <h2>{currentBookmark.cityName}</h2>
      <br />
      <div className="bookmarkItem">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp;<strong>{currentBookmark.cityName}</strong>&nbsp;
        <span>{currentBookmark.country}</span>
      </div>
      <button className="btn btn--back" onClick={() => {navigate(-1)}}>
        &larr;Back
      </button>
    </div>
  );
}

export default SingleBookmark;
