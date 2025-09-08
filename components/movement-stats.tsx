export default function MovementStats() {
  return (
    <section className="border-y border-yellow-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-2 gap-3 md:flex md:items-center md:justify-center md:space-x-6 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-black/60 border border-yellow-400/30 px-4 py-2">
            <span className="text-white font-montserrat font-extrabold mr-2 inline-block text-center min-w-[4ch]">0+</span>
            <span className="text-yellow-200 font-inter text-sm md:text-base">people signed the petition</span>
          </div>
          <div className="inline-flex items-center justify-center rounded-full bg-black/60 border border-yellow-400/30 px-4 py-2">
            <span className="text-white font-montserrat font-extrabold mr-2 inline-block text-center min-w-[4ch]">0</span>
            <span className="text-yellow-200 font-inter text-sm md:text-base">people has joined us hand to hand in this revolution</span>
          </div>
        </div>
      </div>
    </section>
  )
}


