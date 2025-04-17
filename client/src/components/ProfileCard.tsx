import profileImage from "@assets/20241020_194528.jpg";
import { EnvelopeIcon, TwitterIcon, LinkedInIcon } from "@/assets/icons";

export default function ProfileCard() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 text-center border border-white/20">
      <div className="flex justify-center mb-5 relative">
        <div className="w-32 h-32 rounded-full overflow-hidden shadow-xl
                      ring-2 ring-white ring-offset-4 ring-offset-primary/20
                      before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-blue-400 before:to-purple-600 before:opacity-20 before:blur-xl">
          <img src={profileImage} alt="Aakash Vaishnav" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur-xl -z-10"></div>
      </div>
      <h1 className="font-heading font-bold text-3xl mb-1 bg-gradient-to-r from-blue-600 to-purple-600 inline-block text-transparent bg-clip-text">Aakash Vaishnav</h1>
      <p className="text-gray-700 mb-4 font-medium">Product Manager @ Microsoft</p>
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl mb-4">
        <p className="text-gray-700">
          Product manager driving subscription growth for Microsoft 365 and Copilot. MBA from Indian Institute of Management Kozhikode. Previously led Microsoft Shopping on Bing and Edge, boosting revenue and engagement with AI-powered features.
        </p>
      </div>
      <div className="flex justify-center gap-4 mt-5">
        <a 
          href="mailto:contact@example.com" 
          className="text-blue-500 hover:text-purple-500 transition-all transform hover:scale-110"
          aria-label="Email"
        >
          <EnvelopeIcon className="h-6 w-6" />
        </a>
        <a 
          href="https://www.linkedin.com/in/aakashvaishnav1/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 hover:text-purple-500 transition-all transform hover:scale-110"
          aria-label="LinkedIn"
        >
          <LinkedInIcon className="h-6 w-6" />
        </a>
        <a 
          href="https://twitter.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 hover:text-purple-500 transition-all transform hover:scale-110"
          aria-label="Twitter"
        >
          <TwitterIcon className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
}
