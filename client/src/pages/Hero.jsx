import { useNavigate } from 'react-router-dom';
import FeaturesSection from '../components/FeaturesList';
import TechStackSection from '../components/TechStackSection';

export default function Hero() {
    const navigate = useNavigate();
    
    const handleGetStarted = () => {
        navigate('/login');
    };
    
    const scrollToFeatures = () => {
        const el = document.getElementById('features');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    
    return (
        <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
            <div className="relative isolate px-6 pt-0 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-20 lg:py-28 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
                        Your AI-Powered <span className="text-indigo-600 dark:text-indigo-400">Code Assistant</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
                        Debug, review, generate, and explain code instantly with intelligent AI.
                    </p>
                    
                    <div className="mt-8 flex items-center justify-center gap-x-6">
                        <button
                            onClick={handleGetStarted}
                            className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                        >
                            Get started
                        </button>
                        <button 
                            onClick={scrollToFeatures} 
                            className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200 flex items-center gap-1 dark:text-gray-300 dark:hover:text-indigo-400"
                        >
                            Learn more <span className="text-indigo-600 dark:text-indigo-400">→</span>
                        </button>
                    </div>
                    
                    <div className="mt-16 space-y-16" id="features">
                        <FeaturesSection />
                        <TechStackSection />
                    </div>
                </div>
                
                {/* Subtle decorative element (optional) */}
                {/* <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 overflow-hidden sm:top-[calc(100%-30rem)]">
                    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-200 dark:from-gray-600 dark:to-gray-800 rounded-full blur-3xl" />
                    </div>
                </div> */}
            </div>
        </div>
    );
}