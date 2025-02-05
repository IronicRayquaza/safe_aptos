
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';


const FeatureSection = ({ darkMode }) => {
  return (
    <section
      id="services"
      className={`relative pt-20 pb-8 md:pt-16 md:pb-0 transition-colors ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      <div className="container xl:max-w-6xl mx-auto px-4">
        {/* Heading */}
        <header className="text-center mx-auto mb-12 lg:px-20">
          <h2
            className={`text-2xl leading-normal mb-2 font-bold ${
              darkMode ? 'text-white' : 'text-black'
            }`}
          >
            What We Do
          </h2>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 60"
            style={{ margin: '0 auto', height: '35px' }}
            xmlSpace="preserve"
          >
            <circle
              cx="50.1"
              cy="30.4"
              r="5"
              className="stroke-primary"
              style={{
                fill: 'transparent',
                strokeWidth: '2',
                strokeMiterlimit: '10',
                stroke: darkMode ? '#FACC15' : '#000',
              }}
            ></circle>
            <line
              x1="55.1"
              y1="30.4"
              x2="100"
              y2="30.4"
              className="stroke-primary"
              style={{
                strokeWidth: '2',
                strokeMiterlimit: '10',
                stroke: darkMode ? '#FACC15' : '#000',
              }}
            ></line>
            <line
              x1="45.1"
              y1="30.4"
              x2="0"
              y2="30.4"
              className="stroke-primary"
              style={{
                strokeWidth: '2',
                strokeMiterlimit: '10',
                stroke: darkMode ? '#FACC15' : '#000',
              }}
            ></line>
          </svg>
          <p
            className={`leading-relaxed font-light text-xl mx-auto pb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            Save time managing advertising &amp; Content for your business.
          </p>
        </header>

        {/* Service Blocks */}
        <div className="flex flex-wrap flex-row -mx-4 text-center">
          {/** Service Block */}
          {[
            { title: 'SEO Services', icon: 'bi bi-search' },
            { title: 'Social Content', icon: 'bi bi-chat-square-dots' },
            { title: 'Marketing Strategy', icon: 'bi bi-bar-chart' },
          ].map((service, index) => (
            <div
              key={index}
              className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6"
            >
              <div
                className={`py-8 px-12 mb-12 border-b transform transition duration-300 ease-in-out hover:-translate-y-2 ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-gray-50 border-gray-100 text-black'
                }`}
              >
                <div className="inline-block mb-4 text-yellow-500">
                  {/* Icon */}
                  <i className={`${service.icon} text-3xl`}></i>
                </div>
                <h3 className="text-lg leading-normal mb-2 font-semibold">
                  {service.title}
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  This is a wider card with supporting text below as a natural content.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
