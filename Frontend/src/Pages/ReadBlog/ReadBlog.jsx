import { useEffect } from 'react';
import { FaGoogle, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const ReadBlog = () => {
  const { name } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="pt-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <img
          src="https://jobi-svelte.vercel.app/assets/images/blog/blog_img_32.jpg"
          alt="Blog hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-3xl md:text-5xl font-bold leading-snug max-w-3xl">
            {name}
          </h1>
          <p className="mt-4 text-gray-200">
            Published on <span className="font-semibold">18 Jul 2022</span> · 6 min read
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16">
        <article className="prose prose-lg md:prose-xl prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed text-justify">
            Tomfoolery crikey bits and bobs brilliant bamboozled down the pub
            amongst brolly hanky panky, cack bonnet arse over tit burke bugger all
            mate bodge. Cillum dolore eu fugiat pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
            id est laborum. Suspendisse interdum consectetur libero id faucibus
            nisl. Lacus vel facilisis volutpat est velit egestas.
          </p>

          <p className="text-gray-700 leading-relaxed text-justify mt-8">
            Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum.
            Sit amet risus nullam eget felis. Enim praesent elementum facilisis leo.
            Ultricies leo integer.
          </p>

          <img
            src="https://jobi-svelte.vercel.app/assets/images/blog/blog_img_33.jpg"
            alt="Team discussion"
            className="w-full rounded-2xl my-10 shadow-md"
          />

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Learning From Mistakes
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            This response is important for our ability to learn from mistakes, but
            it also gives rise to self-criticism imperdiet nulla malesuada elit.
            One touch of a red-hot stove is usually all we need to avoid that kind
            of discomfort in the future.
          </p>

          {/* Quote */}
          <div className="bg-gradient-to-r from-green-100 to-green-50 p-8 rounded-2xl shadow-inner my-12 text-center">
            <blockquote className="text-2xl md:text-3xl italic font-semibold text-gray-800">
              “Everything is designed. Few things are designed well.”
            </blockquote>
            <p className="text-gray-600 mt-3">
              <span className="font-bold text-green-700">Brian Reed</span>, Front-End Developer
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Work Harder & Gain Success
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify mb-6">
            One touch of a red-hot stove is usually all we need to avoid that kind of discomfort in the future.
            The same applies as we experience the emotional sensation of stress. Duis aute irure dolor in reprehenderit.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify">
            It is true as we experience the emotional sensation of stress from our first social rejection or ridicule. 
            We quickly learn to fear and avoid potentially stressful situations of all kinds, including the most common of all.
          </p>
        </article>

        {/* Tags & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-8 mt-10">
          <p className="text-gray-600 mb-4 md:mb-0">
            <span className="font-semibold text-gray-800">Tags:</span>{' '}
            <span className="text-green-700">business, marketing, tips</span>
          </p>

          <div className="flex items-center space-x-5">
            <span className="font-semibold text-gray-800">Share:</span>
            <a href="#" className="text-gray-600 hover:text-red-500 transition-all">
              <FaGoogle size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-sky-500 transition-all">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-all">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadBlog;
