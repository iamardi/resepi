import { MdOutlineSearch } from 'react-icons/md';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Hero() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();
    router.push({
      pathname: '/',
      query: { search: keyword },
    });
    console.log(keyword, 'di HERO');
  }
  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        height: '35vh',
        backgroundImage: `url(https://images.unsplash.com/photo-1543353071-873f17a7a088?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80)`,
      }}
      className='flex flex-col justify-center items-center'
    >
      <h1 className='text-2xl drop-shadow-lg text-slate-800 outline-white outline-2 m-4'>
        Search your favourite recipe
      </h1>
      <div className=' bg-white shadow-xl rounded-lg overflow-hidden flex items-center'>
        <div className='ml-2'>
          <MdOutlineSearch />
        </div>
        <form onSubmit={handleSearch}>
          <input
            className='px-3 py-1 outline-none w-80'
            type='search'
            placeholder='What are you craving for?'
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
        </form>
      </div>
    </section>
  );
}
