import "./globals.css";

export const metadata = {
  title: "STNP | Tailwind Rebuild",
  description: "A brand new website build using Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans flex flex-col min-h-screen">
        <header className="w-full p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">STNP</h1>
          <nav className="flex gap-4">
            <a href="#" className="text-sm font-medium hover:underline">Home</a>
            <a href="#" className="text-sm font-medium hover:underline">Services</a>
            <a href="#" className="text-sm font-medium hover:underline">About</a>
            <a href="#" className="text-sm font-medium hover:underline">Contact</a>
          </nav>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-8">
          {children}
        </main>

        <footer className="w-full p-6 text-center text-sm text-gray-500 border-t border-gray-200 dark:border-gray-800">
          © {new Date().getFullYear()} STNP. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
