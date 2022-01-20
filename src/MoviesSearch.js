import axios from 'axios'
import { useState, useEffect } from 'react'
import _ from 'lodash'
import { useRecoilState } from 'recoil'
import { moviesList } from './MoviesList'

const searchMovies = async ({ value, callback }) => {
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${value}`
    )
    callback(response.data)
  } catch (err) {
    console.error(err)
  }
}

const debouncedMovieSearch = _.debounce(searchMovies, 750)

function MoviesSearch () {
  const [value, setValue] = useState('')
  const [, setMovieList] = useRecoilState(moviesList)

  function updateMovieList (value) {
    debouncedMovieSearch({ value, callback: (data) => setMovieList(data) })
  }

  useEffect(() => {
    if (value) {
      updateMovieList(value)
    }
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='min-w-[320px] mx-auto'>
      <label
        htmlFor='name'
        className='block pl-4 ml-px text-sm font-medium text-gray-700'
      >
        Movie search
      </label>
      <div className='mt-1'>
        <input
          type='text'
          name='name'
          id='name'
          className='block w-full px-4 border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          placeholder='Search for a movie here...'
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    </div>
  )
}

export { MoviesSearch }
