import React from 'react'

const Loading = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center bg-black/40 backdrop-blur-sm'>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin'></div>
        <p className='text-primary font-medium animate-pulse'>
          Loading music...
        </p>
      </div>
    </div>
  )
}

export default Loading
