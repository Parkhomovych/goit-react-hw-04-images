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

  useEffect(() => {
    if (search === '' && currentPage === 1) return;
    setLoader(true);

    const response = async () => {
      try {
        const data = await fetchImg(search, currentPage);
        setImages([...images, ...data.hits]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    response();
  }, [currentPage]);

  const searchImage = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.children.search;
    if (input.value.trim() === '') {
      toast('🟡 Write something!');
      return;
    }

    try {
      setImages([]);
      setCurrentPage(1);
      setLoader(true);
      const response = await fetchImg(input.value, 1);
      setImages(response.hits);
      setTotalImg(response.totalHits);
      setSearch(input.value);
      if (response.totalHits > 0) {
        toast('Good Job!', {
          icon: '👏',
        });
      } else {
        toast('🟠 There are no pictures');
      }
      input.placeholder = input.value;
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      form.reset();
    }
  };

  const moreImg = async () => {
    setCurrentPage(currentPage + 1);
  };
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
