// *********************
// Role of the component: Simple H2 heading component
// Name of the component: Heading.tsx
// Developer: Shahwaiz Karim
// Version: 1.0
// Component call: <Heading title={title} />
// Input parameters: { title: string }
// Output: h2 heading title with some styles
// *********************

import React from 'react'

const Heading = ({ title } : { title: string }) => {
  return (
    <h2 className="text-4xl font-extrabold mt-12 max-lg:text-3xl">{ title }</h2>
  )
}

export default Heading
