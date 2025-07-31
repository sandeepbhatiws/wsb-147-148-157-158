import React from 'react'

export default function Commonlayout({ children }) {
  return (
    <div>
      <div>Header Component</div>

      <div>Sidebar Component</div>


      {children}


      <div>Footer Component</div>
    </div>
  )
}
