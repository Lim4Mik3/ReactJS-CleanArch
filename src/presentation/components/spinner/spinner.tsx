import React from 'react'
import Styles from './spinner-styles.scss'

const Spinner: React.FC = () => {
  return (
    <div className={Styles.ldsEllipsis}><div></div><div></div><div></div><div></div></div>
  )
}

export default Spinner;
