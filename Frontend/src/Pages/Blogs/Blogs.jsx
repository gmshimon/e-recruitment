import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    id: 1,
    image: "https://jobi-svelte.vercel.app/assets/images/blog/blog_img_19.jpg",
    badge: "SOLUTION",
    date: "Featured - 18 Jul 2022",
    title: "Print, publishing qui visual quis layout mockups.",
  },
  {
    id: 3,
    image: "https://jobi-svelte.vercel.app/assets/images/blog/blog_img_20.jpg",
    badge: "DEVELOPMENT",
    date: "18 Jul 2022",
    title:
      "How to build a complete web application using React and Node.js.",
  },
  {
    id: 4,
    image: "https://jobi-svelte.vercel.app/assets/images/blog/blog_img_21.jpg",
    badge: "BUSINESS",
    date: "18 Jul 2022",
    title: "Make more productive working flow daily.",
  },
  {
    id: 5,
    image: "https://jobi-svelte.vercel.app/assets/images/blog/blog_img_22.jpg",
    badge: "BRANDING",
    date: "18 Jul 2022",
    title: "Quis nostrud exercitation ullamco laboris nisi.",
  },
  {
    id: 6,
    image: "https://jobi-svelte.vercel.app/assets/images/blog/blog_img_23.jpg",
    badge: "MARKETING",
    date: "18 Jul 2022",
    title: "Make Your WordPress dus Journal.",
  },
];

const Blogs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="pt-24 pb-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Our Latest Insights
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay up to date with design trends, development tips, and career
            advice from our industry experts.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
           <article
           key={card.id}
                  onClick={() => navigate(`/read-blog/${encodeURIComponent(card.title)}`)}
                  className='group flex h-full max-w-sm flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl'
                >
                  <div className='relative h-56 w-full overflow-hidden'>
                    <img
                      src={card.image}
                      alt={card.title}
                      className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
                    />
                    <span className='absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-900 shadow-sm'>
                      {card.badge}
                    </span>
                  </div>
                  <div className='flex flex-1 flex-col p-6'>
                    <div className='text-xs font-semibold uppercase tracking-wide text-blue-600'>
                      {card.date}
                    </div>
                    <h3 className='mt-2 text-lg font-semibold text-slate-900 transition group-hover:text-blue-600'>
                      {card.title}
                    </h3>
                    <p className='mt-3 text-sm text-slate-500'>{card.description}</p>
                    <div className='mt-auto flex items-center justify-between pt-5 text-xs text-slate-400'>
                      <div className='flex items-center gap-3'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold uppercase tracking-wide text-blue-600'>
                          {card.badge.slice(0, 2)}
                        </div>
                        <div className='text-left'>
                          <p className='text-sm font-semibold text-slate-700'>Talent IQ Team</p>
                          <p>{card.readTime}</p>
                        </div>
                      </div>
                      <span className='text-sm font-semibold text-blue-600 transition group-hover:text-blue-700 cursor-pointer'>
                        Read story
                      </span>
                    </div>
                  </div>
                </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
