import profileImage from "@assets/20241020_194528.jpg";
import { EnvelopeIcon, TwitterIcon, InstagramIcon } from "@/assets/icons";

export default function ProfileCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-accent shadow-md">
          <img src={profileImage} alt="Aakash Vaishnav" className="w-full h-full object-cover" />
        </div>
      </div>
      <h1 className="font-heading font-bold text-2xl mb-1 text-primary">Aakash Vaishnav</h1>
      <p className="text-gray-600 mb-4">Software Developer & Tech Enthusiast</p>
      <p className="text-gray-700 mb-2">
        Passionate about creating elegant solutions to complex problems through code. 
        Specializing in web development and UI/UX design.
      </p>
      <div className="flex justify-center gap-3 mt-4">
        <a 
          href="mailto:contact@example.com" 
          className="text-secondary hover:text-primary transition-colors"
          aria-label="Email"
        >
          <EnvelopeIcon className="h-5 w-5" />
        </a>
        <a 
          href="https://twitter.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-secondary hover:text-primary transition-colors"
          aria-label="Twitter"
        >
          <TwitterIcon className="h-5 w-5" />
        </a>
        <a 
          href="https://instagram.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-secondary hover:text-primary transition-colors"
          aria-label="Instagram"
        >
          <InstagramIcon className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
