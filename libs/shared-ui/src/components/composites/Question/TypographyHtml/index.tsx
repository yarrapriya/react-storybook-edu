import {Typography, TypographyProps} from '@mui/material'
import * as React from 'react'
import {GeneoKatex} from '../GeneoKatex'

type TypographyHtmlProps = TypographyProps

const TypographyHtml: React.FC<TypographyHtmlProps> = (props) => {
  const {children, ...rem} = props
  let text = ''
  if (children) {
    text = children.toString()
  }
  return <Typography {...rem}>
    <span dangerouslySetInnerHTML={{__html: (new GeneoKatex(text)).parsedHtml()}}></span>
  </Typography>
}

export default TypographyHtml
