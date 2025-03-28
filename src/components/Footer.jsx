import React from 'react';

const Footer = () => {
  return (
    <footer className="w-ful h-[300px] text-center flex flex-col items-center justify-between mt-[100px]">
      <h1 style={{ fontFamily: 'ananda, sans-serif'}} className="text-[24px] md:text-[30px] mt-5">
        Mohammed Ajmal Khan
      </h1>

      <div className="w-[90%] h-[100px] mt-5 flex items-center justify-center">
        <ul className="flex justify-center items-center flex-wrap gap-5">
          {['Home', 'About', 'Blog', 'Portfolio', 'Contact'].map((link) => (
            <li key={link} className="list-none font-semibold text-[18px] font-p">
              <a href="/home" className="no-underline text-black hover:text-gray-700">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* <div style={{ fontFamily: 'poppins, sans-serif'}} className="w-1/2 h-[50px] flex justify-between items-center">
        {[
          { icon: 'fa-twitter', link: '#' },
          { icon: 'fa-instagram', link: '#' },
          { icon: 'fa-linkedin', link: '#' },
          { icon: 'fa-pinterest', link: '#' },
          { icon: 'fa-github', link: '#' },
        ].map((plugin) => (
          <a
            href={plugin.link}
            key={plugin.icon}
            className="text-black text-2xl hover:text-gray-700"
          >
            <i className={`fa-brands ${plugin.icon}`}></i>
          </a>
        ))}
      </div> */}

      <div style={{ fontFamily: 'poppins, sans-serif'}} className="flex gap-4 mb-6 bg-opacity-50">
        <p className="text-sm font-light">© 2024 Crad Craft</p>
        <p className="text-sm font-light">Terms</p>
        <p className="text-sm font-light">Privacy</p>
        <p className="text-sm font-light">Cookies</p>
      </div>
    </footer>
  );
};

export default Footer;