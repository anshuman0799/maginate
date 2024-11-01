"use client";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import PostCollage from "../components/PostCollage";
import Loader from "../components/Loader";
import { fetchImages, searchImages } from "../service/imageService";

const PAGE_SIZE = 20;
const CommunityPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [images, setImages] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [searching, setSearching] = useState<boolean>(false);

  const loadImages = async (page: number) => {
    setLoading(true);
    try {
      const data = await fetchImages(page, PAGE_SIZE);
      if (data.length < PAGE_SIZE) {
        setHasMore(false);
      }
      setImages((prevImages) => (page === 1 ? data : [...prevImages, ...data]));
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };

  // Debounced live search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchText.trim()) {
        setSearching(true);
        try {
          const searchData = await searchImages(searchText);
          setImages(searchData); // Reset images state with search results
          setHasMore(false); // Disable pagination while searching
        } catch (error) {
          console.error("Error searching images:", error);
        }
        setSearching(false);
      } else {
        // Reload images with pagination if search text is cleared
        setPage(1);
        loadImages(1);
        setHasMore(true);
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  useEffect(() => {
    if (!searchText) {
      loadImages(page);
      setPageLoading(false);
    }
  }, [page, searchText]);

  const handleScroll = () => {
    if (!hasMore || loading || searchText) return; // Skip pagination during search
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, searchText]);

  return (
    <section className="w-full h-full pt-10 md:pt-20 flex flex-col gap-10 pl-5 pr-5">
      {(pageLoading || (loading && !searchText) || searching) && <Loader />}
      <div className="flex flex-col lg:flex-row justify-center">
        <h1 className="text-2xl md:text-3xl font-titleFont text-center leading-6">
          Explore Inspiring AI Art<span className="text-bodyColor">.</span>
        </h1>
        <h1 className="pt-2 lg:pt-0 text-2xl md:text-3xl font-titleFont text-center leading-6">
          From Our<span className="text-designColor"> Community</span>!
        </h1>
      </div>
      <div className="flex flex-col gap-5 w-full items-center">
        <div className="flex flex-col gap-2 w-[85%] lg:w-[45%] relative">
          <div className="relative">
            <textarea
              id="searchText"
              rows={1}
              maxLength={50}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search images, prompts, or creators..."
              className="w-full p-3 pl-10 text-sm font-bodyFont text-white bg-bodyColor rounded-md resize-none border-[0.5px] border-gray-300 focus:border-designColor focus:outline-none"
            />
            <FaSearch className="absolute left-3 top-[23px] transform -translate-y-1/2 text-gray-400" />
          </div>
          <p className="text-xs text-gray-400">
            {searchText.length}/{50} characters
          </p>
        </div>
      </div>
      <PostCollage images={images} />
      {loading && !searching && (
        <div className="text-center py-4">
          <span className="animate-spin w-10 h-10 border-4 border-t-transparent border-white rounded-full"></span>
        </div>
      )}
      {!hasMore && !searchText && (
        <p className="text-gray-400 text-center">No more images to load.</p>
      )}
    </section>
  );
};

export default CommunityPage;
