export default function Home() {
  return (
    <div className="max-w-2xl text-center space-y-6">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Welcome to the New STNP</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        We've successfully created a brand new blank canvas with Tailwind CSS v4. 
        Your old code is safely stowed away on the <code>main</code> branch, allowing you to build the new aesthetic you want with complete freedom!
      </p>
      <div className="flex justify-center gap-4 pt-4">
        <button className="px-6 py-3 bg-foreground text-background font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
          Get Started
        </button>
        <button className="px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-700 font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
}
