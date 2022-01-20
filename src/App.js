import { RecoilRoot } from 'recoil'
import { MoviesPlaylist } from './MoviesPlaylist'
import { MoviesSearch } from './MoviesSearch'
import { MoviesList } from './MoviesList'
import { Footer } from './Footer'

function App () {
  return (
    <RecoilRoot>
      <div className='flex flex-col min-h-screen'>
        <MoviesPlaylist />
        <MoviesSearch />
        <MoviesList />
        <Footer />
      </div>
    </RecoilRoot>
  )
}

export { App }
