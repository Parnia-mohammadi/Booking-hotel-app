import React, { useEffect } from "react";
import { UseBookmarks } from "../../context/BookmarkListContext";
import { useParams } from "react-router-dom";
import Loading from "../LocationList/Loading";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const { currentBookmark, isLoadingCurrentBookmark, getBookmark } =
    UseBookmarks();
  const { id } = useParams();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  if (isLoadingCurrentBookmark) return <Loading />;
  return (
    <div>
      <h2>{currentBookmark.cityName}</h2>
      <br />
      <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
      &nbsp;<strong>{currentBookmark.cityName}</strong>&nbsp;
      <span>{currentBookmark.country}</span>
    </div>
  );
}

export default SingleBookmark;
