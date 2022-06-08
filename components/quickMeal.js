import Link from 'next/link';
import useSWR from 'swr';
import { MdOutlineTimer } from 'react-icons/md';

function QuickMeal() {
  const { data: meals, error } = useSWR(
    '/api/meals',
    (url) => fetch(url).then((res) => res.json()),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <section className='dark:bg-slate-200 dark:text-gray-600 p-8'>
      <div className='flex justify-center'>
        <h1 className='text-xl'>{`Or something may interest you...`}</h1>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 p-10'>
        {error ? (
          <div>Something is wrong</div>
        ) : (
          meals?.map((food) => (
            <Link
              key={food.id}
              href={{
                pathname: '/[id]',
                query: { id: food.id, name: food.title },
              }}
            >
              <div className='bg-white text-slate-800 rounded card shadow text-center cursor-pointer hover:shadow-xl hover:outline-4 flex justify-around h-72 overflow-hidden'>
                <div
                  style={{
                    backgroundImage: `url(${food.image})`,
                    backgroundPosition: 'center',
                  }}
                  className='flex-1 rounded-r-lg h-full drop-shadow-xl'
                ></div>
                <div className='flex-1 p-2 flex justify-between flex-col'>
                  <div className='flex justify-end items-center text-red-300 text-lg'>
                    <MdOutlineTimer />
                    {food.readyInMinutes} mins
                  </div>
                  <div>
                    <h1 className='text-lg font-medium'>{food.title}</h1>
                  </div>
                  <div className='flex flex-wrap'>
                    {food.dishTypes?.map((dish) => (
                      <span
                        key={dish}
                        className=' text-xs bg-slate-400 text-white rounded-lg px-2 py-1 m-1 w-fit'
                      >
                        {dish}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}

export default QuickMeal;
