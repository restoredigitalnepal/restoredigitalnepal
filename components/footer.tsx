import Image from "next/image"
export default function Footer() {
  return (
    <footer className="bg-black/95 backdrop-blur-md border-t border-red-600/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Mission */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 overflow-hidden rounded-full border-2 border-red-500">
                <Image
                  src="/images/revolution.png"
                  alt="Restore Digital Nepal"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-protest text-white text-lg tracking-wide">
                  Restore Digital Nepal
                </span>
                <span className="text-xs text-red-400 font-semibold">#EnoughIsEnough</span>
              </div>
            </div>
            <p className="text-gray-400">
              Fighting for digital freedom and the right to connect. The revolution starts with us.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-protest text-white mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-red-400 transition-colors font-medium px-2 py-1 rounded hover:bg-red-600/10">
                  About the Ban
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-red-400 transition-colors font-medium px-2 py-1 rounded hover:bg-red-600/10">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#petition" className="text-gray-400 hover:text-red-400 transition-colors font-medium px-2 py-1 rounded hover:bg-red-600/10">
                  Sign Petition
                </a>
              </li>
              <li>
                <a href="#join-team" className="text-gray-400 hover:text-red-400 transition-colors font-medium px-2 py-1 rounded hover:bg-red-600/10">
                  Join Team
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-protest text-white mb-4 tracking-wide">Follow the Revolution</h4>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-600/10" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-600/10" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-600/10" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.988-5.367 11.988-11.988C24.005 5.367 18.638.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.151-3.44-.453-.992-.302-1.808-.735-2.449-1.297-.64-.562-1.116-1.297-1.297-2.096-.302-.8-.453-1.735-.453-2.811V8.449c0-1.297.151-2.448.453-3.44.302-.992.735-1.808 1.297-2.449.562-.64 1.297-1.116 2.096-1.297.8-.302 1.735-.453 2.811-.453h1.882c1.297 0 2.448.151 3.44.453.992.302 1.808.735 2.449 1.297.64.562 1.116 1.297 1.297 2.096.302.8.453 1.735.453 2.811v1.882c0 1.297-.151 2.448-.453 3.44-.302.992-.735 1.808-1.297 2.449-.562.64-1.297 1.116-2.096 1.297-.8.302-1.735.453-2.811.453H8.449z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-600/10" aria-label="GitHub">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.29 3.438 9.8 8.205 11.385.6.113.82-.261.82-.58 0-.285-.01-1.04-.016-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 11.987 24.002 5.367 18.635.001 12.017.001z" />
                </svg>
              </button>
            </div>
            <div className="mt-4">
              <p className="text-red-400 font-semibold">#EnoughIsEnough</p>
            </div>
          </div>
        </div>

        <div className="border-t border-red-600/30 mt-8 pt-8 text-center">
          <div className="flex flex-col items-center space-y-3 mb-4">
            <div className="inline-flex items-center justify-center rounded-full bg-black/60 border border-red-400/30 px-3 py-1">
              <span className="text-white font-protest font-bold mr-2 inline-block text-center min-w-[4ch] tracking-wide">0+</span>
              <span className="text-red-200 text-xs">people signed the petition</span>
            </div>
            <div className="inline-flex items-center justify-center rounded-full bg-black/60 border border-red-400/30 px-3 py-1">
              <span className="text-white font-protest font-bold mr-2 inline-block text-center min-w-[4ch] tracking-wide">0</span>
              <span className="text-red-200 text-xs">joined hand to hand</span>
            </div>
          </div>
          <p className="text-gray-400">© 2025 Restore Digital Nepal. Built for the people, by the people.</p>
        </div>
      </div>
    </footer>
  )
}

