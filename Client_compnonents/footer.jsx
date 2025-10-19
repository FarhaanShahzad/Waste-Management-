import React from 'react';
import { LOGO_URL } from '../material';
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="flex flex-col items-center justify-center">
        <img src={LOGO_URL} alt="Logo" className="h-10 mb-2" />

        {/* Social Icons */}
        <div className="flex gap-4 mt-4 text-xl">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
            <FaInstagram />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
            <FaFacebook />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube">
            <FaYoutube />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <FaLinkedin />
          </a>
        </div>

        <p className="text-center mt-4">© 2025 Waste Company</p>
      </div>
    </footer>
  );
};

export default Footer;
