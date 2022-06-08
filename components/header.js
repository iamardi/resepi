import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

function Header() {
  const router = useRouter();

  return (
    <header className='shadow-lg navbar'>
      <div className='flex justify-center'>
        <div className='header-logo'>
            <Image
              src='/myresepi-logo.png'
              width='100px'
              height='50px'
              alt='logo'
              className='cursor-pointer'
              onClick={() => router.push('/')}
            />
        </div>
      </div>
    </header>
  );
}

export default Header;
