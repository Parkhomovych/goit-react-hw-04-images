import { SearchIcon } from './Searchbar.style';

export const SearchBar = props => {

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={props.search}>
        <button type="button" className="SearchForm-button">
          <SearchIcon />
        </button>
        <input

          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
      </form>
    </header>
  );
};
