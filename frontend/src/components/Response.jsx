import React from 'react'

const Response = ({ message, next }) => {
  return (
    <div>
    <h1 className="response">{message}</h1>
    <h2>{next}</h2>

    </div>
  )
}

export default Response