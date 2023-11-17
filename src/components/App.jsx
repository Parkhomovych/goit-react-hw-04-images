import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';

import { SearchBar } from './Searchbar/Searchbar';
import { fetchImg } from './Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button, Div } from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalImg, setTotalImg] = useState(0);
  const [loader, setLoader] = useState(false);

  const searchImage = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.children.search;
    if (input.value.trim() === '') {
      toast('🟡 Write something!');
      return;
    }
    setImages([]);
    setCurrentPage(1);
    setSearch(input.value);
  };

  const moreImg = async () => {
    setCurrentPage(currentPage + 1);
  };
  useEffect(() => {
    const fisrImages = async () => {
      if (search.trim() === '') return;
      try {
        setLoader(true);
        const data = await fetchImg(search, currentPage);
        if (data.totalHits === 0) {
          toast('Not a valid value');
          return;
        }
        setImages([...images, ...data.hits]);
        setTotalImg(data.totalHits);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    fisrImages();
  }, [search, currentPage]);
  return (
    <div className="App">
      <SearchBar search={searchImage} />
      {images.length > 0 && <ImageGallery image={images} />}

      {loader && (
        <Div>
          <RotatingLines
            strokeColor="#3f51b5"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </Div>
      )}
      {totalImg > images.length && totalImg >= 12 && (
        <Button onClick={moreImg}>Load More</Button>
      )}
      <Toaster position="top-right" />
    </div>
  );
};
