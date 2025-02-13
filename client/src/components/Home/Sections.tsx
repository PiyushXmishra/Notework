import { Sparkles, Zap, Clock } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuth';
export default function Section() {
  const {user,isAuthenticated}= useAuthContext()
  return (
    <section className="dark:bg-colorGradient2 py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex flex-row justify-center gap-2">


          <h2 className="  text-3xl font-bold text-gray-900 dark:text-white">Why Choose </h2>
            <h2 className="text-3xl text-gray-500 dark:text-gray-400">Notework</h2>
          </div>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">Simple, powerful, and intelligent PDF processing</p>
        </div>
        
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="dark:bg-colorGradient1 p-8 rounded-xl shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Sparkles className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2  dark:text-white ">Smart Analysis</h3>
            <p className="text-gray-600 dark:text-gray-400">Our AI-powered platform automatically extracts key information from videos.</p>
            <ul className="mt-4 space-y-2  text-gray-600 dark:text-gray-400 ">
                <ul className='flex flex-row items-center gap-2'>
            <li className="w-1.5 h-1.5 bg-black dark:bg-gray-500 rounded-full"></li>

              <li > Instant audio-to-text extraction</li>
              </ul>
              <ul className='flex flex-row items-center gap-2' >
              
              <li className="w-1.5 h-1.5 bg-black dark:bg-gray-500 rounded-full"></li>

              <li> Automatic summarization</li></ul>
              <ul className='flex flex-row items-center gap-2'>
              <li className="w-1.5 h-1.5 bg-black dark:bg-gray-500 rounded-full"></li>

              <li> Key points identification</li>
              </ul>
            </ul>
          </div>

          <div className="dark:bg-colorGradient1 p-8 rounded-xl shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Zap className="h-6 w-6 text-gray-600 dark" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white ">Lightning Fast</h3>
            <p className="text-gray-600 dark:text-gray-400">Process your youtube videos at immense speed.</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className='w-1.5 h-1.5 bg-black dark:bg-gray-500 rounded-full'></div>
                <span className="text-gray-600 dark:text-gray-400"> Video Processing</span>
                          {/* <span className="text-gray-600 dark font-semibold">&lt; 2 seconds</span> */}
              </div>
              <div className="flex items-center gap-2">
              <div className='w-1.5 h-1.5 bg-black dark:bg-gray-500 rounded-full'></div>

                <span className="text-gray-600 dark:text-gray-400"> Transcript Extraction</span>
                {/* <span className="text-gray-600 dark font-semibold">Instant</span> */}
              </div>
              <div className="flex items-center gap-2">
              <div className='w-1.5 h-1.5 bg-black dark:bg-gray-500 rounded-full'></div>

                <span className="text-gray-600 dark:text-gray-400">AI Analysis </span>
                {/* <span className="text-gray-600 dark font-semibold dark:text-gray-400">&lt; 5 seconds</span> */}
              </div>
            </div>
          </div>

          <div className="dark:bg-colorGradient1 p-8 rounded-xl shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Clock className="h-6 w-6 text-gray-600 dark" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white ">Time Saving</h3>
            <p className="text-gray-600 dark:text-gray-400">Focus on what matters while we handle the heavy lifting.</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-black dark:bg-gray-500 rounded-lg"></div>
                <span className="ml-2 text-gray-600 dark:text-gray-400"> PDF generation at one click</span>
              </div>
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-black dark:bg-gray-500 rounded-full"></div>
                <span className="ml-2 text-gray-600 dark:text-gray-400"> Getting instant notes of huge lectures </span>
              </div>
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-black dark:bg-gray-500 rounded-full"></div>
                <span className="ml-2 text-gray-600 dark:text-gray-400">Gamechanger for students </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 mb-14 text-center">
          <NavLink to={(user && isAuthenticated)? '/pdf': '/login' }>
          <button className="bg-black hover:bg-colorGradient2 text-white px-8 py-3 rounded-lg text-lg font-bold  dark:bg-colorGradient2 dark:hover:bg-colorGradient1 inline-flex items-center  ">
            Try It Now
            <span className="ml-2">→</span>
          </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
}