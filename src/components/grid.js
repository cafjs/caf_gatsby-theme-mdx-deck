/** @jsx jsx */
import { jsx } from 'theme-ui'
import { jump } from '../navigate'
import useDeck from '../hooks/use-deck'
import { modes } from '../constants'
import SlideList from './slide-list'

export default ({ slides }) => {
    const { slug, index, setState } = useDeck()
  return (
    <div
      sx={{
        minHeight: '100vh',
        color: 'white',
        bg: 'black',
      }}>
      <div
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
        <SlideList
          slides={slides}
          onClick={i => {
              jump(slug, index, i)
              setState({ mode: modes.normal })
          }}
          sx={{
            width: '25%',
            m: 0,
          }}
        />
      </div>
    </div>
  )
}
