import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { MdOutlineTimer } from 'react-icons/md';

export default function SearchMeals() {
  const { query } = useRouter();
  console.log(query, 'di searchMeals component');
  const { data: meals, error } = useSWR(
    `/api/search?search=${query.search}`,
    (url) => fetch(url).then((res) => res.json()),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (!meals) return <></>;

  return (
    <section className='p-8 dark:bg-slate-200 dark:text-gray-600'>
      <div className='flex justify-center'>
        <h1 className='text-xl'>{`Search results for ${query.search}`}</h1>
      </div>
      {error ? (
        <div>No recipes found</div>
      ) : (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 p-10'>
          {meals?.map((food) => (
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
                <div className='flex-1 p-2 flex justify-center flex-col'>
                  <div>
                    <h1 className='text-lg font-medium'>{food.title}</h1>
                  </div>
                  {/* <div className='flex flex-wrap'>
                      {food.dishTypes?.map((dish) => (
                        <span
                          key={dish}
                          className=' text-xs bg-slate-400 text-white rounded-lg px-2 py-1 m-1 w-fit'
                        >
                          {dish}
                        </span>
                      ))}
                    </div> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
