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
  const [currentPage, setCurrentPage] = useState();
  const [totalImg, setTotalImg] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setCurrentPage(2);
  }, [search]);

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
        toast('🟠 There are no pictures')
      }
      input.placeholder = input.value;
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      setCurrentPage(currentPage + 1);
      form.reset();
    }
  };

  const moreImg = async () => {
    setCurrentPage(currentPage + 1);
    setLoader(true);
    try {
      const response = await fetchImg(search, currentPage);
      setImages([...images, ...response.hits]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
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
