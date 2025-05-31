import { useState } from "react";

const carImages = [
  {
    url: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
    alt: "Luxury Car 1",
  },
  {
    url: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
    alt: "Red sports car on mountain road",
  },
  {
    url: "https://images.unsplash.com/photo-1535448580089-c7f9490c78b1?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Luxury Car 3",
  },
];

const HomePage = () => {
  const [current, setCurrent] = useState(0);
  const total = carImages.length;

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  const goToSlide = (idx: number) => setCurrent(idx);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-neutral-900 to-black flex flex-col items-center justify-start px-4">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center pt-24 pb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Welcome to DigiCars
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          Premium car rentals made easy. Choose from our digital-first fleet and
          drive with confidence, style, and convenience.
        </p>
        <button className="rounded-full bg-gradient-to-b from-gray-200 to-gray-400 px-8 py-2 text-black font-semibold shadow hover:from-white hover:to-gray-300 transition mb-10">
          Pick Your Perfect Drive
        </button>
        {/* Car Image and Carousel Controls */}
        <div className="relative w-full flex items-center justify-center max-w-2xl mx-auto">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center shadow border border-white/20 z-10"
            onClick={prevSlide}
            aria-label="Previous slide"
            type="button"
          >
            &#8592;
          </button>
          <img
            src={carImages[current].url}
            alt={carImages[current].alt}
            className="w-full max-w-2xl rounded-xl shadow-2xl object-cover aspect-[16/7]"
          />
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center shadow border border-white/20 z-10"
            onClick={nextSlide}
            aria-label="Next slide"
            type="button"
          >
            &#8594;
          </button>
        </div>
        {/* Carousel Dots */}
        <div className="flex gap-2 justify-center mt-4">
          {carImages.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full inline-block cursor-pointer transition-all ${
                idx === current ? "bg-white/80 scale-110" : "bg-white/40"
              }`}
              onClick={() => goToSlide(idx)}
            ></span>
          ))}
        </div>
      </section>
      {/* About Us Section */}
      <section className="w-full max-w-4xl mx-auto text-center py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          About DigiCars
        </h2>
        <p className="text-lg text-gray-300 mb-10">
          DigiCars is your trusted partner for premium car rentals. We offer a
          modern, digital-first experience with a diverse fleet of top-tier
          vehicles, making it easy and convenient to drive the car you want,
          when you want it. Whether you need a car for business, travel, or a
          special event, DigiCars delivers flexibility, reliability, and style.
        </p>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mt-8">
          <div className="bg-neutral-800 rounded-xl p-8 shadow w-full md:w-1/3 flex flex-col items-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              Wide Selection
            </h3>
            <p className="text-gray-400">
              From luxury sedans to sporty convertibles and practical SUVs,
              DigiCars has the perfect vehicle for every occasion and
              preference.
            </p>
          </div>
          <div className="bg-neutral-800 rounded-xl p-8 shadow w-full md:w-1/3 flex flex-col items-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              Seamless Booking
            </h3>
            <p className="text-gray-400">
              Book your car in minutes with our easy-to-use online platform.
              Enjoy transparent pricing, instant confirmation, and flexible
              rental terms.
            </p>
          </div>
          <div className="bg-neutral-800 rounded-xl p-8 shadow w-full md:w-1/3 flex flex-col items-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              Customer Focused
            </h3>
            <p className="text-gray-400">
              Our team is dedicated to your satisfaction, offering 24/7 support
              and tailored solutions to make your rental experience smooth and
              enjoyable.
            </p>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="w-full max-w-4xl mx-auto text-center py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Contact DigiCars
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Have questions or ready to book your next ride? Reach out to DigiCars
          for fast, friendly assistance and personalized service.
        </p>
        <form className="bg-neutral-800 rounded-xl p-8 shadow flex flex-col gap-4 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            className="rounded-md px-4 py-2 bg-neutral-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="rounded-md px-4 py-2 bg-neutral-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="rounded-md px-4 py-2 bg-neutral-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          ></textarea>
          <button
            type="submit"
            className="rounded-full bg-gradient-to-b from-gray-200 to-gray-400 px-8 py-2 text-black font-semibold shadow hover:from-white hover:to-gray-300 transition mt-2"
          >
            Send Message
          </button>
        </form>
      </section>
      
    </div>
  );
};

export default HomePage;
