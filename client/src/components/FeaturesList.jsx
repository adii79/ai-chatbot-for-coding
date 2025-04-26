import bugIcon from '../assets/icons/bug.svg';
import settingsIcon from '../assets/icons/settings.svg';
import bookIcon from '../assets/icons/book.svg';
import codeIcon from '../assets/icons/code.svg';
import refreshIcon from '../assets/icons/refresh.svg';
import flaskIcon from '../assets/icons/flask.svg';

const features = [
  {
    icon: bugIcon,
    title: 'Code Debugging',
    description: 'Identify and fix bugs instantly with smart diagnostics.'
  },
  {
    icon: settingsIcon,
    title: 'Code Generation',
    description: 'Generate code snippets or entire functions in seconds.'
  },
  {
    icon: bookIcon,
    title: 'Code Explanation',
    description: 'Understand complex code with natural language explanations.'
  },
  {
    icon: codeIcon,
    title: 'Code Review & Optimization',
    description: 'Improve code quality with performance and style suggestions.'
  },
  {
    icon: refreshIcon,
    title: 'Code Conversion',
    description: 'Convert code between languages like Python, JavaScript, and more.'
  },
  {
    icon: flaskIcon,
    title: 'Test Case Generation',
    description: 'Generate edge and unit test cases for any function.'
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-10 sm:py-12" id="features">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-12">
          Powerful Features to Boost Your Development
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="text-center rounded-xl p-6 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-center mb-4">
                <img 
                  src={feature.icon} 
                  alt={feature.title} 
                  className="w-10 h-10 dark:invert" 
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}