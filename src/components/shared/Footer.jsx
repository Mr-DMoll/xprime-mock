import React from 'react'

function Footer() {
  return (
    <div className='pb-20 pt-23 flex flex-col text-center'>
        <h1 className='font-bold pb-5 text-white'>
            LEGAL
        </h1>
        <p className='pb-4 px-3.5 text-white/30'>
            This platform serves as a content aggregator and does not host any media files directly. All content is streamed through trusted third-party services while maintaining the highest standards of user privacy and security.
        </p>
        <h1 className='font-bold pb-3 text-white'>
            CONTACT
        </h1>
        <a className='text-white/30 hover:text-white delay-300 transition ease-in-out'>
            contact@xprime.tv
        </a>
        <p className='mt-15 text-white/30'>
            &copy; 2025 XPrime. All rights reserved.
        </p>
    </div>
  )
}

export default Footer