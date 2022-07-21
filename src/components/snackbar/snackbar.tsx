/* eslint-disable jsx-control-statements/jsx-use-if-tag */
import React, { FC, ReactNode, useEffect } from 'react'
import RoundAlertIconWithWhiteBg from '../../images/ic_alert_round_white_bg'
import TriangularAlertIcon from '../../images/ic_triangular_alert_with_white_bg'
import './snackbar.scss'

export const enum SnackbarTypes {
  error = 'error',
  success = 'success',
  info = 'info',
}

interface SnackbarProps {
  type: SnackbarTypes
  duration: number
  children: ReactNode
  hideSnackbar: Function
}

const Snackbar: FC<SnackbarProps> = (props: SnackbarProps) => {
  const { type = SnackbarTypes.success, duration = 5000, children, hideSnackbar } = props
  useEffect(() => {
    const timer = setTimeout(() => {
      hideSnackbar()
    }, duration)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="snackbar-container">
      <div className={`snackbar ${type}`}>
        {type === SnackbarTypes.success ? <RoundAlertIconWithWhiteBg /> : <TriangularAlertIcon />}
        {children}
      </div>
    </div>
  )
}

export default Snackbar
