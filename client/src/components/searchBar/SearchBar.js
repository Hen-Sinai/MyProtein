import { useState } from "react"
import "./SearchBar.css"
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

const SearchBar = ({ placeholder, data }) => {
  const [wordEntered, setWordEntered] = useState("")
  const initialData = data

  const handleFilter = (event) => {
    const searchWord = event.target.value
    setWordEntered(searchWord)
    const dataFiltered = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase())
    })
    data = dataFiltered
    console.log(data)
  }

  const init =() => {
    setWordEntered("")
    data = initialData
    console.log(data)
  }

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {wordEntered.length === 0 ? (
            <SearchIcon fontSize="small"/>
          ) : (
            <CloseIcon id="clearBtn" onClick={init} />
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchBar