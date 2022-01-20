import { atom, useRecoilState } from 'recoil'

export const moviesPlaylist = atom({
  key: 'moviesPlaylist',
  default: null
})

function MoviesPlaylist () {
  const [moviePlaylist] = useRecoilState(moviesPlaylist)

  return (
    <div className='mb-6 text-center'>
      <h1 className='text-xl'>Playlist</h1>
      <div className='flex flex-wrap'>
        {(moviePlaylist || []).map(({ Poster, Title, Type, Year, imdbID }) => (
          <a
            key={imdbID}
            href='#0'
            className='group max-w-[240px] min-h-[300px] w-full m-2 flex flex-col justify-end'
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
        ))}
      </div>
    </div>
  )
}

export { MoviesPlaylist }
