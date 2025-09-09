"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface LiveStats {
  petitionCount: number
  teamCount: number
  showMinimums?: boolean
}

export default function LiveStats() {
  const [stats, setStats] = useState<LiveStats>({ petitionCount: 0, teamCount: 0 })
  const [loading, setLoading] = useState(true)

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
    }
    return num.toString()
  }

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch petition count
        const { count: petitionCount, error: petitionError } = await supabase
          .from('petition')
          .select('*', { count: 'exact', head: true })

        // Fetch team applications count
        const { count: teamCount, error: teamError } = await supabase
          .from('team_applications')
          .select('*', { count: 'exact', head: true })

        if (petitionError) {
          console.error('Error fetching petition count:', petitionError)
        }
        if (teamError) {
          console.error('Error fetching team count:', teamError)
        }

        setStats({
          petitionCount: petitionCount || 0,
          teamCount: teamCount || 0
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()

    // Set up real-time subscriptions
    const petitionSubscription = supabase
      .channel('petition_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'petition' },
        () => fetchStats()
      )
      .subscribe()

    const teamSubscription = supabase
      .channel('team_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'team_applications' },
        () => fetchStats()
      )
      .subscribe()

    return () => {
      petitionSubscription.unsubscribe()
      teamSubscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center space-y-3 mb-4">
        <div className="inline-flex items-center justify-center rounded-full bg-black/60 px-3 py-1">
          <span className="text-white font-protest font-bold mr-2 inline-block text-center min-w-[4ch] tracking-wide">
            ...
          </span>
          <span className="text-red-200 text-xs">people joined the revolution</span>
        </div>
        <div className="inline-flex items-center justify-center rounded-full bg-black/60 px-3 py-1">
          <span className="text-white font-protest font-bold mr-2 inline-block text-center min-w-[4ch] tracking-wide">
            ...
          </span>
          <span className="text-red-200 text-xs">joined us to support the revolutionary warriors</span>
        </div>
      </div>
    )
  }

  // Use fake minimums if real data is lower
  const displayPetitionCount = Math.max(stats.petitionCount, 1000)
  const displayTeamCount = Math.max(stats.teamCount, 10)

  return (
    <div className="flex flex-col items-center space-y-3 mb-4">
      <div className="inline-flex items-center justify-center rounded-full bg-black/60 px-3 py-1">
        <span className="text-white font-protest font-bold mr-2 inline-block text-center min-w-[4ch] tracking-wide">
          {formatNumber(displayPetitionCount)}+
        </span>
        <span className="text-red-200 text-xs">people joined the revolution</span>
      </div>
      <div className="inline-flex items-center justify-center rounded-full bg-black/60 px-3 py-1">
        <span className="text-white font-protest font-bold mr-2 inline-block text-center min-w-[4ch] tracking-wide">
          {formatNumber(displayTeamCount)}+
        </span>
        <span className="text-red-200 text-xs">joined us to support the revolutionary warriors</span>
      </div>
    </div>
  )
}
