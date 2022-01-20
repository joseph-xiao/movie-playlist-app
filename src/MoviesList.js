import { atom, useRecoilState, useRecoilValue } from 'recoil'
import _ from 'lodash'
import { moviesPlaylist } from './MoviesPlaylist'

export const moviesList = atom({
  key: 'moviesList',
  default: null
})

function MoviesList () {
  const [moviePlaylist, setMoviePlaylist] = useRecoilState(moviesPlaylist)
  const movieList = useRecoilValue(moviesList)

  if (movieList !== null && _.get(movieList, 'Response') === 'False') {
    return (
      <div>
        <div className='my-6 text-center text-rose-500'>
          {_.get(movieList, 'Error') || 'Movie not found!'}
        </div>
      </div>
    )
  }

  if (movieList !== null && _.get(movieList, 'Response') === 'True') {
    return (
      <div className='flex flex-wrap mb-6'>
        {_.get(movieList, 'Search', []).map(
          ({ Poster, Title, Type, Year, imdbID }) => (
            <a
              key={imdbID}
              href='#0'
              className='group max-w-[300px] min-h-[360px] w-full m-2 flex flex-col justify-end'
              onClick={() => {
                const currentPlaylist = moviePlaylist || []
                const alreadyExists = currentPlaylist.findIndex(
                  ({ imdbID: existingimdbID }) => existingimdbID === imdbID
                )
                if (alreadyExists === -1) {
                  setMoviePlaylist([
                    ...currentPlaylist,
                    { Poster, Title, Type, Year, imdbID }
                  ])
                }
              }}
            >
              {Poster === 'N/A'
                ? (
                  <div className='text-center'>Poster not available</div>
                  )
                : (
                  <div className='w-full overflow-hidden rounded-lg aspect-w-1 aspect-h-1 sm:aspect-w-2 sm:aspect-h-3'>
                    <img
                      src={Poster}
                      alt={Title}
                      className='object-cover object-center w-full h-full group-hover:opacity-75'
                    />
                  </div>
                  )}
              <div className='mt-4 text-base font-medium text-gray-900'>
                <h3 className='truncate'>{Title}</h3>
                <h5>
                  {Year} {Type}
                </h5>
              </div>
            </a>
          )
        )}
      </div>
    )
  }

  return null
}

export { MoviesList }
