import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import logo from '../assets/images/logo_resepi-removebg.png';
import React from 'react';

function Header() {
  const router = useRouter();

  return (
    <header className='shadow-lg navbar'>
      <div className='flex justify-center'>
        <div className='header-logo'>
          {/* <Link href='/' passHref> */}
            <Image
              src='/myresepi-logo.png'
              width='100px'
              height='50px'
              alt='logo'
              className='cursor-pointer'
              onClick={() => router.push('/')}
            />
          {/* </Link> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
