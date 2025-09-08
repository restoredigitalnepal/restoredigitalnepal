"use client"

export default function HashtagTicker() {
  const hashtags = [
    "#EnoughIsEnough",
    "#RestoreDigitalNepal",
    "#DigitalRightsNepal",
    "#YouthVoiceMatters",
    "#ConstitutionalRights",
    "#Article17Nepal",
    "#PeacefulResistance",
    "#NepalUnited",
    "#FreedomOfExpression",
    "#JusticeForNepal",
    "#DigitalDemocracy",
    "#SocialMediaFreedom",
  ]

  return (
    <div className="bg-black py-4 overflow-hidden border-y border-gray-700 relative">
      <div className="animate-scroll whitespace-nowrap relative z-10">
        <span className="inline-flex items-center space-x-8 text-white font-montserrat font-semibold text-lg">
          {hashtags.concat(hashtags).map((tag, index) => (
            <span key={`${tag}-${index}`} className="mx-8 hover:text-red-400 transition-colors">
              {tag}
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}

