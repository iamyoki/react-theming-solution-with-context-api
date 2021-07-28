import { css } from '@emotion/react'
import { Link } from '@reach/router'
import { useTheme } from 'contexts/ThemeContext'
import React from 'react'
import { RiContrast2Line, RiContrastLine } from 'react-icons/ri'
import { themeCSS } from 'utils/themeCSS'

const navCSS = themeCSS(
  (theme) => css`
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: auto;
    padding: 8px 0;
    position: relative;
    background-color: ${theme.colors.background};
    transition: 0.2s;
  `
)

const linkCSS = css`
  /* background-color: lavender; */
  color: lightslategray;
  font-size: 15px;
  padding: 8px 18px;
  margin: 0 12px;
  position: relative;
  display: flex;
  align-items: center;
  font-weight: bold;
  transition: 0.2s;

  &[aria-current='page'] {
    color: whitesmoke;
    background-color: slategrey;
    border-radius: 100px;
  }
`

const themeButtonCSS = css`
  padding: 8px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  position: absolute;
  right: 8vmax;
`

function Navigation({ children }) {
  // Make sure children is an array
  const arrayChildren = React.Children.toArray(children.props.children)
  const { curThemeKey, toggleTheme } = useTheme()
  const isDark = curThemeKey === 'darkTheme'

  return (
    <nav
      className='Navigation'
      css={[
        navCSS,
        (theme) => ({
          // backgroundColor: theme.colors.background,
          borderBottom: `1px solid ${theme.colors.black[6]}`,
        }),
      ]}>
      {arrayChildren.map((child) => {
        const { path, label } = child.props

        if (child.props.default) return null

        if (child.props.path === undefined) {
          throw new Error(`${child.type.name} should have path prop.`)
        }

        // Render nav link by nested routes
        return (
          <Link to={path} key={path} css={linkCSS}>
            {label ?? child.type.name}
          </Link>
        )
      })}

      <button type='button' css={themeButtonCSS} onClick={() => toggleTheme()}>
        {isDark ? <RiContrastLine /> : <RiContrast2Line />}
      </button>
    </nav>
  )
}

export default Navigation
