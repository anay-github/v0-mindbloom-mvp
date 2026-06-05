'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Home,
  Activity,
  Users,
  TrendingUp,
  Calendar,
  Flame,
  Star,
  Target,
  Heart,
  Wind,
  Eye,
  Hand,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  X
} from 'lucide-react'

// Types
type Mood = 'great' | 'okay' | 'stressed' | 'tired' | null
type StressLevel = 'low' | 'medium' | 'high' | null
type EnergyLevel = 'low' | 'medium' | 'high' | null
type BloomBirdLevel = 1 | 2 | 3 | 4 | 5
type PostFeeling = 'better' | 'same' | 'worse' | null

// Student Profile
const studentProfile = {
  name: 'Student A',
  team: 'Team Blue',
  buddy: 'Student B',
  startingPoints: 240,
  startingStreak: 4,
  weeklyGoal: 5,
  completedThisWeek: 3
}

// Team Data
const teams = [
  { name: 'Team Blue', participation: 82, activities: 41, goalProgress: 82 },
  { name: 'Team Green', participation: 74, activities: 37, goalProgress: 74 },
  { name: 'Team Orange', participation: 68, activities: 34, goalProgress: 68 },
  { name: 'Team Purple', participation: 61, activities: 31, goalProgress: 61 }
]

// Supportive Messages
const supportiveMessages = [
  "Your BloomBird is ready for today's reset.",
  "No pressure. Want to try a quick reset today?",
  "Your team is 80% of the way to this week's goal.",
  "You helped Team Blue move closer to its goal.",
  "Great job staying consistent this week!"
]

// Green Objects for Look for Green Activity
const greenObjects = [
  { name: 'Green leaf', isGreen: true },
  { name: 'Green notebook', isGreen: true },
  { name: 'Blue backpack', isGreen: false },
  { name: 'Yellow pencil', isGreen: false },
  { name: 'Green water bottle', isGreen: true },
  { name: 'Red apple', isGreen: false },
  { name: 'Green marker', isGreen: true },
  { name: 'Purple folder', isGreen: false },
  { name: 'White paper', isGreen: false },
  { name: 'Green hoodie', isGreen: true },
  { name: 'Orange ball', isGreen: false },
  { name: 'Gray laptop', isGreen: false }
]

export default function StudentExperience() {
  const [activeTab, setActiveTab] = useState('home')
  
  // Student State
  const [bloomPoints, setBloomPoints] = useState(studentProfile.startingPoints)
  const [streak, setStreak] = useState(studentProfile.startingStreak)
  const [activitiesCompletedThisWeek, setActivitiesCompletedThisWeek] = useState(studentProfile.completedThisWeek)
  const [teamProgress, setTeamProgress] = useState(76)
  
  // BloomBird State
  const [bloomBirdLevel, setBloomBirdLevel] = useState<BloomBirdLevel>(2)
  const [bloomBirdProgress, setBloomBirdProgress] = useState(35)
  const [isBloomBirdCelebrating, setIsBloomBirdCelebrating] = useState(false)
  const [bloomBirdMessage, setBloomBirdMessage] = useState<string | null>(null)
  
  // Bloom Garden State
  const [gardenStage, setGardenStage] = useState(2) // 1=seed, 2=small plant, 3=flower, 4=tree
  
  // Daily Check-in State
  const [showDayPopup, setShowDayPopup] = useState(true)
  const [dayResponse, setDayResponse] = useState<Mood>(null)
  
  // Activity Check-in State
  const [activityMood, setActivityMood] = useState<Mood>(null)
  const [activityStress, setActivityStress] = useState<StressLevel>(null)
  const [activityEnergy, setActivityEnergy] = useState<EnergyLevel>(null)
  const [activityReflection, setActivityReflection] = useState('')
  const [checkInComplete, setCheckInComplete] = useState(false)
  
  // Current Activity State
  const [currentActivity, setCurrentActivity] = useState<string | null>(null)
  const [activityStep, setActivityStep] = useState(0)
  const [activityComplete, setActivityComplete] = useState(false)
  
  // Box Breathing State
  const [breathingPhase, setBreathingPhase] = useState<'idle' | 'in' | 'hold1' | 'out' | 'hold2'>('idle')
  const [breathingCycle, setBreathingCycle] = useState(0)
  
  // Sensory Countdown State
  const [sensoryChecks, setSensoryChecks] = useState([false, false, false, false, false])
  
  // Look for Green State
  const [selectedGreenObjects, setSelectedGreenObjects] = useState<number[]>([])
  const [greenHint, setGreenHint] = useState<string | null>(null)
  
  // Body Scan State
  const [bodyScanStep, setBodyScanStep] = useState(0)
  
  // Muscle Tension State
  const [muscleTensionStep, setMuscleTensionStep] = useState(0)
  
  // Post Activity State
  const [showPostReflection, setShowPostReflection] = useState(false)
  const [postFeeling, setPostFeeling] = useState<PostFeeling>(null)
  const [supportRequested, setSupportRequested] = useState(false)
  
  // Weekly Check-in State
  const [weeklyStress, setWeeklyStress] = useState<'low' | 'medium' | 'high' | null>(null)
  const [weeklySleep, setWeeklySleep] = useState<'good' | 'okay' | 'poor' | null>(null)
  const [weeklyConnection, setWeeklyConnection] = useState<'connected' | 'somewhat' | 'not' | null>(null)
  const [weeklyActivities, setWeeklyActivities] = useState<'yes' | 'some' | 'no' | null>(null)
  const [wantsCounselorCheckIn, setWantsCounselorCheckIn] = useState<'yes' | 'maybe' | 'no' | null>(null)
  const [weeklyCheckInSubmitted, setWeeklyCheckInSubmitted] = useState(false)
  
  // Notification State
  const [currentNotification, setCurrentNotification] = useState(0)

  // BloomBird helpers
  const getBloomBirdEmoji = () => {
    if (isBloomBirdCelebrating) return '🐦🎉'
    switch (bloomBirdLevel) {
      case 1: return '🐦'
      case 2: return '🐦✨'
      case 3: return '🐦🌿'
      case 4: return '🐦🎉'
      case 5: return '🐦🌈'
      default: return '🐦'
    }
  }
  
  const getBloomBirdStateName = () => {
    switch (bloomBirdLevel) {
      case 1: return 'Resting'
      case 2: return 'Awake'
      case 3: return 'Energized'
      case 4: return 'Celebrating'
      case 5: return 'Super Bloom'
      default: return 'Resting'
    }
  }
  
  const getGardenEmoji = () => {
    switch (gardenStage) {
      case 1: return '🌱'
      case 2: return '🌿'
      case 3: return '🌸'
      case 4: return '🌳'
      default: return '🌱'
    }
  }

  const updateBloomBird = useCallback((action: string) => {
    setIsBloomBirdCelebrating(true)
    setTimeout(() => setIsBloomBirdCelebrating(false), 2000)
    
    setBloomBirdProgress(prev => {
      const newProgress = Math.min(prev + 20, 100)
      if (newProgress >= 100 && bloomBirdLevel < 5) {
        setBloomBirdLevel(l => Math.min(l + 1, 5) as BloomBirdLevel)
        return 0
      }
      return newProgress
    })
    
    switch (action) {
      case 'activity':
        setBloomBirdMessage('BloomBird woke up because you completed today\'s activity.')
        break
      case 'streak':
        setBloomBirdMessage('BloomBird is energized by your streak.')
        break
      case 'team':
        setBloomBirdMessage('BloomBird is celebrating your team progress.')
        break
      case 'weekly':
        setBloomBirdMessage('BloomBird loves that you completed your weekly check-in!')
        break
    }
    
    setTimeout(() => setBloomBirdMessage(null), 4000)
  }, [bloomBirdLevel])

  const getRecommendedActivity = () => {
    if (activityStress === 'high') return 'box-breathing'
    if (activityMood === 'stressed') return 'sensory-countdown'
    if (activityMood === 'tired') return 'body-scan'
    return 'look-for-green'
  }
  
  const getSuggestedActivityFromDayResponse = () => {
    if (dayResponse === 'stressed') return 'Box Breathing'
    if (dayResponse === 'tired') return 'Body Scan'
    return 'Look for Green'
  }

  const completeActivity = useCallback(() => {
    setBloomPoints(prev => prev + 10)
    setStreak(prev => prev + 1)
    setActivitiesCompletedThisWeek(prev => prev + 1)
    setTeamProgress(prev => Math.min(prev + 2, 100))
    setActivityComplete(true)
    
    // Update garden
    if (activitiesCompletedThisWeek + 1 >= 4 && gardenStage < 4) {
      setGardenStage(prev => Math.min(prev + 1, 4))
    }
    
    updateBloomBird('activity')
    
    toast.success('Nice work! +10 Bloom Points', {
      description: 'Your team progress increased!'
    })
    
    setTimeout(() => {
      setShowPostReflection(true)
    }, 1500)
  }, [activitiesCompletedThisWeek, gardenStage, updateBloomBird])

  const resetActivityState = () => {
    setCurrentActivity(null)
    setActivityStep(0)
    setActivityComplete(false)
    setBreathingPhase('idle')
    setBreathingCycle(0)
    setSensoryChecks([false, false, false, false, false])
    setSelectedGreenObjects([])
    setGreenHint(null)
    setBodyScanStep(0)
    setMuscleTensionStep(0)
    setShowPostReflection(false)
    setPostFeeling(null)
  }

  const handleDayResponse = (response: Mood) => {
    setDayResponse(response)
    setShowDayPopup(false)
    toast.success(`Thanks for sharing! We suggest: ${getSuggestedActivityFromDayResponse()}`)
  }

  const handleRequestCheckIn = () => {
    setSupportRequested(true)
    toast.success('Check-in request sent', {
      description: 'A counselor will reach out soon.'
    })
    resetActivityState()
    setActiveTab('home')
  }

  const handleWeeklySubmit = () => {
    if (!weeklyStress || !weeklySleep || !weeklyConnection || !weeklyActivities || !wantsCounselorCheckIn) {
      toast.error('Please answer all questions')
      return
    }
    
    setBloomPoints(prev => prev + 15)
    setWeeklyCheckInSubmitted(true)
    updateBloomBird('weekly')
    
    if (weeklyStress === 'high' || weeklySleep === 'poor' || weeklyConnection === 'not' || wantsCounselorCheckIn === 'yes') {
      setSupportRequested(true)
    }
    
    toast.success('Weekly check-in submitted! +15 Bloom Points')
  }

  const handleCelebrateTeam = () => {
    updateBloomBird('team')
    toast.success('Team celebration!', {
      description: 'Great teamwork everyone!'
    })
  }

  // Rotate notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification(prev => (prev + 1) % supportiveMessages.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Update day response suggestion
  useEffect(() => {
    if (dayResponse) {
      // This effect runs when dayResponse changes
    }
  }, [dayResponse])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon" className="mr-2">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-xl">
                🌱
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">MindBloom</h1>
                <p className="text-xs text-muted-foreground">Student Experience</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-accent/50">
                <Flame className="h-3 w-3 mr-1 text-orange-500" />
                {streak} day streak
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Star className="h-3 w-3 mr-1" />
                {bloomPoints} pts
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Bar */}
      <div className="bg-primary/5 border-b border-primary/10 py-2 px-4">
        <div className="container mx-auto flex items-center gap-2 text-sm text-primary">
          <Sparkles className="h-4 w-4 flex-shrink-0" />
          <p className="truncate">{supportiveMessages[currentNotification]}</p>
        </div>
      </div>

      {/* Day Check-in Popup */}
      {showDayPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md animate-grow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">How is your day going?</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowDayPopup(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>Quick check-in to suggest the best activity for you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'great' as const, emoji: '😊', label: 'Great' },
                  { value: 'okay' as const, emoji: '🙂', label: 'Okay' },
                  { value: 'stressed' as const, emoji: '😰', label: 'Stressed' },
                  { value: 'tired' as const, emoji: '😴', label: 'Tired' }
                ].map(option => (
                  <Button
                    key={option.value}
                    variant="outline"
                    className="h-20 flex-col gap-2 hover:bg-primary/10 hover:border-primary"
                    onClick={() => handleDayResponse(option.value)}
                  >
                    <span className="text-3xl">{option.emoji}</span>
                    <span>{option.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="home" className="gap-1.5">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="activities" className="gap-1.5">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Activities</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-1.5">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="gap-1.5">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
            <TabsTrigger value="weekly" className="gap-1.5">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Weekly</span>
            </TabsTrigger>
          </TabsList>

          {/* HOME TAB */}
          <TabsContent value="home" className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">Welcome back, {studentProfile.name}</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* BloomBird Card */}
              <Card className="md:col-span-2 lg:col-span-1 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>Your BloomBird</span>
                    <Badge variant="outline">Level {bloomBirdLevel}</Badge>
                  </CardTitle>
                  <CardDescription>{getBloomBirdStateName()}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`flex h-28 items-center justify-center rounded-xl bg-gradient-to-br from-mint to-primary/10 text-5xl ${isBloomBirdCelebrating ? 'animate-celebrate' : 'animate-float'}`}>
                    {getBloomBirdEmoji()}
                  </div>
                  {bloomBirdMessage && (
                    <p className="text-sm text-primary text-center bg-primary/10 rounded-lg p-2 animate-grow">
                      {bloomBirdMessage}
                    </p>
                  )}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">BloomBird Growth</span>
                      <span className="font-medium">{bloomBirdProgress}%</span>
                    </div>
                    <Progress value={bloomBirdProgress} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Stats Cards */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Bloom Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{bloomPoints}</div>
                  <p className="text-sm text-muted-foreground">Points earned</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Flame className="h-5 w-5 text-orange-500" />
                    Current Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{streak} Days</div>
                  <p className="text-sm text-muted-foreground">Keep it going!</p>
                </CardContent>
              </Card>

              {/* Weekly Goal */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="h-5 w-5 text-primary" />
                    Weekly Goal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Progress value={(activitiesCompletedThisWeek / studentProfile.weeklyGoal) * 100} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {activitiesCompletedThisWeek} / {studentProfile.weeklyGoal} activities
                  </p>
                </CardContent>
              </Card>

              {/* Buddy Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Heart className="h-5 w-5 text-pink-500" />
                    Your Buddy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-semibold">{studentProfile.buddy}</div>
                  <p className="text-sm text-muted-foreground">Wellness partner</p>
                </CardContent>
              </Card>

              {/* Team Progress */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5 text-blue-500" />
                    {studentProfile.team}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Progress value={teamProgress} className="h-2" />
                  <p className="text-sm text-muted-foreground">{teamProgress}% weekly goal</p>
                </CardContent>
              </Card>
            </div>

            {/* Suggested Activity */}
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Suggested Activity of the Day
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{getSuggestedActivityFromDayResponse()}</p>
                  <p className="text-sm text-muted-foreground">Based on your check-in</p>
                </div>
                <Button onClick={() => setActiveTab('activities')}>
                  Start <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ACTIVITIES TAB */}
          <TabsContent value="activities" className="space-y-6">
            {!currentActivity && !checkInComplete && (
              <>
                <h2 className="text-2xl font-semibold">Quick Check-In</h2>
                <p className="text-muted-foreground">Tell us how you&apos;re feeling to get the best activity recommendation.</p>
                
                <div className="grid gap-4">
                  {/* Mood */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Current Mood</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { value: 'great' as const, emoji: '😌', label: 'Calm' },
                          { value: 'okay' as const, emoji: '🙂', label: 'Okay' },
                          { value: 'stressed' as const, emoji: '😰', label: 'Stressed' },
                          { value: 'tired' as const, emoji: '😴', label: 'Tired' }
                        ].map(option => (
                          <Button
                            key={option.value}
                            variant={activityMood === option.value ? 'default' : 'outline'}
                            className="h-auto flex-col gap-1 py-3"
                            onClick={() => setActivityMood(option.value)}
                          >
                            <span className="text-xl">{option.emoji}</span>
                            <span className="text-xs">{option.label}</span>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stress */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Stress Level</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 'low' as const, color: 'bg-green-500', label: 'Low' },
                          { value: 'medium' as const, color: 'bg-yellow-500', label: 'Medium' },
                          { value: 'high' as const, color: 'bg-red-500', label: 'High' }
                        ].map(option => (
                          <Button
                            key={option.value}
                            variant={activityStress === option.value ? 'default' : 'outline'}
                            className="gap-2"
                            onClick={() => setActivityStress(option.value)}
                          >
                            <div className={`w-3 h-3 rounded-full ${option.color}`} />
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Energy */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Energy Level</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 'low' as const, emoji: '🔋', label: 'Low' },
                          { value: 'medium' as const, emoji: '⚡', label: 'Medium' },
                          { value: 'high' as const, emoji: '💪', label: 'High' }
                        ].map(option => (
                          <Button
                            key={option.value}
                            variant={activityEnergy === option.value ? 'default' : 'outline'}
                            className="gap-2"
                            onClick={() => setActivityEnergy(option.value)}
                          >
                            <span>{option.emoji}</span>
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Optional Reflection */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">One sentence about your day (optional)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <textarea
                        className="w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        rows={2}
                        placeholder="How's your day going?"
                        value={activityReflection}
                        onChange={(e) => setActivityReflection(e.target.value)}
                      />
                    </CardContent>
                  </Card>

                  <Button 
                    size="lg" 
                    className="w-full"
                    disabled={!activityMood || !activityStress || !activityEnergy}
                    onClick={() => setCheckInComplete(true)}
                  >
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Continue to Activities
                  </Button>
                </div>
              </>
            )}

            {checkInComplete && !currentActivity && (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Choose an Activity</h2>
                  <Badge className="bg-primary/10 text-primary">
                    Recommended: {getRecommendedActivity().replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { id: 'box-breathing', name: 'Box Breathing', icon: Wind, description: 'Calm your mind with guided breathing', time: '2 min' },
                    { id: 'sensory-countdown', name: 'Sensory Countdown', icon: Eye, description: '5-4-3-2-1 grounding exercise', time: '3 min' },
                    { id: 'look-for-green', name: 'Look for Green', icon: Sparkles, description: 'Find green objects around you', time: '2 min' },
                    { id: 'body-scan', name: 'Body Scan', icon: Activity, description: 'Notice sensations in your body', time: '3 min' },
                    { id: 'muscle-tension', name: 'Muscle Tension & Release', icon: Hand, description: 'Tense and release muscle groups', time: '3 min' }
                  ].map(activity => {
                    const isRecommended = getRecommendedActivity() === activity.id
                    return (
                      <Card 
                        key={activity.id} 
                        className={`cursor-pointer transition-all hover:shadow-md ${isRecommended ? 'border-primary bg-primary/5' : ''}`}
                        onClick={() => setCurrentActivity(activity.id)}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <activity.icon className={`h-8 w-8 ${isRecommended ? 'text-primary' : 'text-muted-foreground'}`} />
                            {isRecommended && <Badge className="bg-primary">Recommended</Badge>}
                          </div>
                          <CardTitle className="text-lg">{activity.name}</CardTitle>
                          <CardDescription>{activity.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </>
            )}

            {/* BOX BREATHING ACTIVITY */}
            {currentActivity === 'box-breathing' && !showPostReflection && (
              <BoxBreathingActivity
                breathingPhase={breathingPhase}
                setBreathingPhase={setBreathingPhase}
                breathingCycle={breathingCycle}
                setBreathingCycle={setBreathingCycle}
                activityComplete={activityComplete}
                completeActivity={completeActivity}
                resetActivityState={resetActivityState}
              />
            )}

            {/* SENSORY COUNTDOWN ACTIVITY */}
            {currentActivity === 'sensory-countdown' && !showPostReflection && (
              <SensoryCountdownActivity
                sensoryChecks={sensoryChecks}
                setSensoryChecks={setSensoryChecks}
                activityComplete={activityComplete}
                completeActivity={completeActivity}
                resetActivityState={resetActivityState}
              />
            )}

            {/* LOOK FOR GREEN ACTIVITY */}
            {currentActivity === 'look-for-green' && !showPostReflection && (
              <LookForGreenActivity
                selectedGreenObjects={selectedGreenObjects}
                setSelectedGreenObjects={setSelectedGreenObjects}
                greenHint={greenHint}
                setGreenHint={setGreenHint}
                activityComplete={activityComplete}
                completeActivity={completeActivity}
                resetActivityState={resetActivityState}
              />
            )}

            {/* BODY SCAN ACTIVITY */}
            {currentActivity === 'body-scan' && !showPostReflection && (
              <BodyScanActivity
                bodyScanStep={bodyScanStep}
                setBodyScanStep={setBodyScanStep}
                activityComplete={activityComplete}
                completeActivity={completeActivity}
                resetActivityState={resetActivityState}
              />
            )}

            {/* MUSCLE TENSION ACTIVITY */}
            {currentActivity === 'muscle-tension' && !showPostReflection && (
              <MuscleTensionActivity
                muscleTensionStep={muscleTensionStep}
                setMuscleTensionStep={setMuscleTensionStep}
                activityComplete={activityComplete}
                completeActivity={completeActivity}
                resetActivityState={resetActivityState}
              />
            )}

            {/* POST-ACTIVITY REFLECTION */}
            {showPostReflection && (
              <Card className="max-w-lg mx-auto">
                <CardHeader>
                  <CardTitle>How do you feel now?</CardTitle>
                  <CardDescription>Your feedback helps us improve</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'better' as const, emoji: '😊', label: 'Better' },
                      { value: 'same' as const, emoji: '😐', label: 'Same' },
                      { value: 'worse' as const, emoji: '😔', label: 'Worse' }
                    ].map(option => (
                      <Button
                        key={option.value}
                        variant={postFeeling === option.value ? 'default' : 'outline'}
                        className="h-auto flex-col gap-2 py-4"
                        onClick={() => setPostFeeling(option.value)}
                      >
                        <span className="text-2xl">{option.emoji}</span>
                        <span>{option.label}</span>
                      </Button>
                    ))}
                  </div>

                  {postFeeling === 'worse' && (
                    <div className="bg-primary/5 rounded-lg p-4 space-y-3 animate-grow">
                      <p className="text-sm">
                        Thanks for being honest. You can try another reset or ask for a supportive check-in.
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => {
                          resetActivityState()
                          setCheckInComplete(true)
                        }}>
                          Try Another Activity
                        </Button>
                        <Button onClick={handleRequestCheckIn}>
                          Request Check-in
                        </Button>
                      </div>
                    </div>
                  )}

                  {postFeeling && postFeeling !== 'worse' && (
                    <Button className="w-full" onClick={() => {
                      resetActivityState()
                      setCheckInComplete(false)
                      setActivityMood(null)
                      setActivityStress(null)
                      setActivityEnergy(null)
                      setActivityReflection('')
                      setActiveTab('home')
                      toast.success('Great job completing your activity!')
                    }}>
                      Back to Home
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* TEAM TAB */}
          <TabsContent value="team" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Calm Classroom Challenge</h2>
              <p className="text-muted-foreground">Complete 100 wellness activities as a class this week.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Team Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    {studentProfile.team} Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Progress value={teamProgress} className="h-3" />
                  <p className="text-sm text-muted-foreground">{teamProgress}% of weekly goal</p>
                </CardContent>
              </Card>

              {/* Buddy Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-pink-500" />
                    Buddy Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{studentProfile.buddy}</p>
                  <p className="text-sm text-muted-foreground">Your wellness partner is doing great!</p>
                </CardContent>
              </Card>
            </div>

            {/* Team Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle>Team Leaderboard</CardTitle>
                <CardDescription>Rankings are based on participation only.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teams.map((team, index) => (
                    <div 
                      key={team.name} 
                      className={`flex items-center justify-between p-3 rounded-lg ${team.name === studentProfile.team ? 'bg-primary/10 border border-primary/30' : 'bg-muted/50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          index === 0 ? 'bg-yellow-500' : 
                          index === 1 ? 'bg-gray-400' : 
                          index === 2 ? 'bg-amber-600' : 'bg-muted-foreground'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="font-medium">{team.name}</span>
                        {team.name === studentProfile.team && (
                          <Badge variant="outline" className="text-xs">Your team</Badge>
                        )}
                      </div>
                      <span className="font-semibold">{team.participation}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Challenges */}
            <Card>
              <CardHeader>
                <CardTitle>Team Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { title: 'Complete 100 wellness activities', progress: 76 },
                    { title: 'Reach 80% weekly participation', progress: teamProgress },
                    { title: 'Try 3 different wellness skills', progress: 66 },
                    { title: 'Complete a 5-day team streak', progress: 80 }
                  ].map((challenge, i) => (
                    <div key={i} className="p-3 rounded-lg border bg-card">
                      <p className="text-sm font-medium mb-2">{challenge.title}</p>
                      <Progress value={challenge.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">{challenge.progress}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button size="lg" onClick={handleCelebrateTeam} className="w-full md:w-auto">
              🎉 Celebrate Team Progress
            </Button>
          </TabsContent>

          {/* PROGRESS TAB */}
          <TabsContent value="progress" className="space-y-6">
            <h2 className="text-2xl font-semibold">Your Progress</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Daily */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{activityComplete ? '1' : '0'}</div>
                  <p className="text-sm text-muted-foreground">activity completed</p>
                </CardContent>
              </Card>

              {/* Weekly */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">This Week</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-3xl font-bold text-primary">{activitiesCompletedThisWeek}</div>
                  <Progress value={(activitiesCompletedThisWeek / studentProfile.weeklyGoal) * 100} className="h-2" />
                  <p className="text-sm text-muted-foreground">of {studentProfile.weeklyGoal} goal</p>
                </CardContent>
              </Card>

              {/* Monthly */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">12</div>
                  <p className="text-sm text-muted-foreground">activities completed</p>
                </CardContent>
              </Card>

              {/* Points */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Total Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{bloomPoints}</div>
                </CardContent>
              </Card>

              {/* Streak */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Flame className="h-5 w-5 text-orange-500" />
                    Streak Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{streak} days</div>
                  <p className="text-sm text-muted-foreground">Best: 7 days</p>
                </CardContent>
              </Card>

              {/* Team Contribution */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5 text-blue-500" />
                    Team Contribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{activitiesCompletedThisWeek * 2}%</div>
                  <p className="text-sm text-muted-foreground">of team activities</p>
                </CardContent>
              </Card>
            </div>

            {/* BloomBird Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{getBloomBirdEmoji()}</span>
                  BloomBird Level {bloomBirdLevel}
                </CardTitle>
                <CardDescription>{getBloomBirdStateName()}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Progress value={bloomBirdProgress} className="h-3" />
                <p className="text-sm text-muted-foreground">{bloomBirdProgress}% to next level</p>
              </CardContent>
            </Card>

            {/* Bloom Garden */}
            <Card>
              <CardHeader>
                <CardTitle>Bloom Garden</CardTitle>
                <CardDescription>Your garden grows as you complete activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-32 rounded-xl bg-gradient-to-b from-sky-100 to-green-100 dark:from-sky-900/20 dark:to-green-900/20">
                  <span className={`text-6xl transition-all duration-500 ${gardenStage >= 3 ? 'animate-float' : ''}`}>
                    {getGardenEmoji()}
                  </span>
                </div>
                <div className="flex justify-between mt-4 px-4">
                  {['🌱', '🌿', '🌸', '🌳'].map((emoji, i) => (
                    <div 
                      key={i} 
                      className={`text-2xl ${i + 1 <= gardenStage ? 'opacity-100' : 'opacity-30'}`}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* WEEKLY CHECK-IN TAB */}
          <TabsContent value="weekly" className="space-y-6">
            <h2 className="text-2xl font-semibold">Weekly Wellness Check-In</h2>

            {!weeklyCheckInSubmitted ? (
              <div className="space-y-4 max-w-2xl">
                {/* Stress */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">How was your stress this week?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'low' as const, label: 'Low' },
                        { value: 'medium' as const, label: 'Medium' },
                        { value: 'high' as const, label: 'High' }
                      ].map(option => (
                        <Button
                          key={option.value}
                          variant={weeklyStress === option.value ? 'default' : 'outline'}
                          onClick={() => setWeeklyStress(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Sleep */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">How was your sleep this week?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'good' as const, label: 'Good' },
                        { value: 'okay' as const, label: 'Okay' },
                        { value: 'poor' as const, label: 'Poor' }
                      ].map(option => (
                        <Button
                          key={option.value}
                          variant={weeklySleep === option.value ? 'default' : 'outline'}
                          onClick={() => setWeeklySleep(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Connection */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">How connected did you feel?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'connected' as const, label: 'Connected' },
                        { value: 'somewhat' as const, label: 'Somewhat' },
                        { value: 'not' as const, label: 'Not connected' }
                      ].map(option => (
                        <Button
                          key={option.value}
                          variant={weeklyConnection === option.value ? 'default' : 'outline'}
                          className="text-sm"
                          onClick={() => setWeeklyConnection(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Activities */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Did you complete wellness activities?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'yes' as const, label: 'Yes' },
                        { value: 'some' as const, label: 'Some' },
                        { value: 'no' as const, label: 'No' }
                      ].map(option => (
                        <Button
                          key={option.value}
                          variant={weeklyActivities === option.value ? 'default' : 'outline'}
                          onClick={() => setWeeklyActivities(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Counselor */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Would you like a counselor to check in?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'yes' as const, label: 'Yes' },
                        { value: 'maybe' as const, label: 'Maybe' },
                        { value: 'no' as const, label: 'No' }
                      ].map(option => (
                        <Button
                          key={option.value}
                          variant={wantsCounselorCheckIn === option.value ? 'default' : 'outline'}
                          onClick={() => setWantsCounselorCheckIn(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Button size="lg" className="w-full" onClick={handleWeeklySubmit}>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Submit Weekly Check-In (+15 points)
                </Button>
              </div>
            ) : (
              <Card className="max-w-md">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Check-In Complete!</CardTitle>
                      <CardDescription>Thanks for sharing how your week went</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Your weekly check-in has been submitted. +15 Bloom Points added!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// Activity Components
function BoxBreathingActivity({
  breathingPhase,
  setBreathingPhase,
  breathingCycle,
  setBreathingCycle,
  activityComplete,
  completeActivity,
  resetActivityState
}: {
  breathingPhase: 'idle' | 'in' | 'hold1' | 'out' | 'hold2'
  setBreathingPhase: (phase: 'idle' | 'in' | 'hold1' | 'out' | 'hold2') => void
  breathingCycle: number
  setBreathingCycle: (cycle: number | ((c: number) => number)) => void
  activityComplete: boolean
  completeActivity: () => void
  resetActivityState: () => void
}) {
  const [timer, setTimer] = useState(4)

  useEffect(() => {
    if (breathingPhase === 'idle') return

    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          // Move to next phase
          if (breathingPhase === 'in') {
            setBreathingPhase('hold1')
          } else if (breathingPhase === 'hold1') {
            setBreathingPhase('out')
          } else if (breathingPhase === 'out') {
            setBreathingPhase('hold2')
          } else if (breathingPhase === 'hold2') {
            setBreathingCycle((c: number) => c + 1)
            setBreathingPhase('in')
          }
          return 4
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [breathingPhase, setBreathingPhase, setBreathingCycle])

  const startBreathing = () => {
    setBreathingPhase('in')
    setTimer(4)
  }

  const getPhaseText = () => {
    switch (breathingPhase) {
      case 'in': return 'Breathe in...'
      case 'hold1': return 'Hold...'
      case 'out': return 'Breathe out...'
      case 'hold2': return 'Hold...'
      default: return 'Get ready...'
    }
  }

  const getStepNumber = () => {
    switch (breathingPhase) {
      case 'in': return 1
      case 'hold1': return 2
      case 'out': return 3
      case 'hold2': return 4
      default: return 0
    }
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-primary" />
            Box Breathing
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={resetActivityState}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Calm your mind with guided breathing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Breathing Circle */}
        <div className="flex justify-center">
          <div className={`w-40 h-40 rounded-full flex items-center justify-center border-4 transition-all duration-1000 ${
            breathingPhase === 'idle' ? 'border-muted bg-muted/20' :
            breathingPhase === 'in' || breathingPhase === 'out' ? 'border-primary bg-primary/20 animate-breathe' :
            'border-accent bg-accent/20'
          }`}>
            <div className="text-center">
              <div className="text-4xl font-bold">{breathingPhase !== 'idle' ? timer : ''}</div>
              <div className="text-sm text-muted-foreground">{getPhaseText()}</div>
            </div>
          </div>
        </div>

        {/* Step Counter */}
        {breathingPhase !== 'idle' && (
          <div className="text-center">
            <Badge variant="outline">Step {getStepNumber()} of 4</Badge>
            <p className="text-sm text-muted-foreground mt-2">Cycle {breathingCycle + 1} of 4</p>
          </div>
        )}

        {/* Controls */}
        {breathingPhase === 'idle' && !activityComplete && (
          <Button className="w-full" size="lg" onClick={startBreathing}>
            Start Breathing
          </Button>
        )}

        {breathingCycle >= 4 && !activityComplete && (
          <Button className="w-full" size="lg" onClick={completeActivity}>
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Complete Activity
          </Button>
        )}

        {activityComplete && (
          <div className="text-center p-4 rounded-lg bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="font-medium text-primary">Nice work! You completed Box Breathing.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function SensoryCountdownActivity({
  sensoryChecks,
  setSensoryChecks,
  activityComplete,
  completeActivity,
  resetActivityState
}: {
  sensoryChecks: boolean[]
  setSensoryChecks: (checks: boolean[]) => void
  activityComplete: boolean
  completeActivity: () => void
  resetActivityState: () => void
}) {
  const items = [
    { count: 5, sense: 'see', emoji: '👀' },
    { count: 4, sense: 'feel', emoji: '✋' },
    { count: 3, sense: 'hear', emoji: '👂' },
    { count: 2, sense: 'smell', emoji: '👃' },
    { count: 1, sense: 'taste', emoji: '👅' }
  ]

  const toggleCheck = (index: number) => {
    const newChecks = [...sensoryChecks]
    newChecks[index] = !newChecks[index]
    setSensoryChecks(newChecks)
  }

  const allChecked = sensoryChecks.every(c => c)

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Sensory Countdown
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={resetActivityState}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>5-4-3-2-1 grounding exercise</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => toggleCheck(index)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              sensoryChecks[index] 
                ? 'border-primary bg-primary/10' 
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.emoji}</span>
                <span className="font-medium">
                  {item.count} thing{item.count > 1 ? 's' : ''} you can {item.sense}
                </span>
              </div>
              {sensoryChecks[index] && (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              )}
            </div>
          </button>
        ))}

        <Button 
          className="w-full" 
          size="lg" 
          disabled={!allChecked || activityComplete}
          onClick={completeActivity}
        >
          {activityComplete ? (
            <>
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Completed!
            </>
          ) : (
            'Complete Activity'
          )}
        </Button>

        {activityComplete && (
          <p className="text-center text-sm text-primary">
            You practiced grounding your attention.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function LookForGreenActivity({
  selectedGreenObjects,
  setSelectedGreenObjects,
  greenHint,
  setGreenHint,
  activityComplete,
  completeActivity,
  resetActivityState
}: {
  selectedGreenObjects: number[]
  setSelectedGreenObjects: (objects: number[]) => void
  greenHint: string | null
  setGreenHint: (hint: string | null) => void
  activityComplete: boolean
  completeActivity: () => void
  resetActivityState: () => void
}) {
  const toggleObject = (index: number) => {
    if (activityComplete) return
    
    const obj = greenObjects[index]
    
    if (!obj.isGreen) {
      setGreenHint('Try looking for something green.')
      setTimeout(() => setGreenHint(null), 2000)
      return
    }
    
    if (selectedGreenObjects.includes(index)) {
      setSelectedGreenObjects(selectedGreenObjects.filter(i => i !== index))
    } else if (selectedGreenObjects.length < 3) {
      const newSelected = [...selectedGreenObjects, index]
      setSelectedGreenObjects(newSelected)
      
      if (newSelected.length === 3) {
        setTimeout(completeActivity, 500)
      }
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Look for Green
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={resetActivityState}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Select 3 green objects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {greenObjects.map((obj, index) => (
            <button
              key={index}
              onClick={() => toggleObject(index)}
              className={`p-3 rounded-lg border-2 text-center transition-all text-sm ${
                selectedGreenObjects.includes(index)
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {obj.name}
            </button>
          ))}
        </div>

        {greenHint && (
          <p className="text-center text-sm text-amber-600 animate-grow">
            {greenHint}
          </p>
        )}

        <div className="flex justify-center gap-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full border-2 ${
                i < selectedGreenObjects.length
                  ? 'border-primary bg-primary'
                  : 'border-muted'
              }`}
            />
          ))}
        </div>

        {activityComplete && (
          <div className="text-center p-4 rounded-lg bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="font-medium text-primary">Great job finding green objects!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function BodyScanActivity({
  bodyScanStep,
  setBodyScanStep,
  activityComplete,
  completeActivity,
  resetActivityState
}: {
  bodyScanStep: number
  setBodyScanStep: (step: number | ((s: number) => number)) => void
  activityComplete: boolean
  completeActivity: () => void
  resetActivityState: () => void
}) {
  const steps = [
    'Notice your head and face',
    'Relax your shoulders',
    'Notice your breathing',
    'Relax your hands',
    'Notice your legs and feet'
  ]

  const handleNext = () => {
    if (bodyScanStep < steps.length - 1) {
      setBodyScanStep((s: number) => s + 1)
    }
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Body Scan
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={resetActivityState}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Notice sensations in your body</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Progress value={((bodyScanStep + 1) / steps.length) * 100} className="h-2" />

        <div className="text-center py-8 px-4 rounded-xl bg-primary/5">
          <p className="text-xl font-medium">{steps[bodyScanStep]}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Step {bodyScanStep + 1} of {steps.length}
          </p>
        </div>

        <div className="flex gap-3">
          {bodyScanStep < steps.length - 1 ? (
            <Button className="flex-1" onClick={handleNext}>
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : !activityComplete ? (
            <Button className="flex-1" onClick={completeActivity}>
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Complete
            </Button>
          ) : null}
        </div>

        {activityComplete && (
          <div className="text-center p-4 rounded-lg bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="font-medium text-primary">You completed a body scan.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function MuscleTensionActivity({
  muscleTensionStep,
  setMuscleTensionStep,
  activityComplete,
  completeActivity,
  resetActivityState
}: {
  muscleTensionStep: number
  setMuscleTensionStep: (step: number | ((s: number) => number)) => void
  activityComplete: boolean
  completeActivity: () => void
  resetActivityState: () => void
}) {
  const steps = [
    'Squeeze your hands for 3 seconds',
    'Release',
    'Raise your shoulders gently',
    'Release',
    'Press your feet into the floor',
    'Release'
  ]

  const handleNext = () => {
    if (muscleTensionStep < steps.length - 1) {
      setMuscleTensionStep((s: number) => s + 1)
    }
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Hand className="h-5 w-5 text-primary" />
            Muscle Tension &amp; Release
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={resetActivityState}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Tense and release muscle groups</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Progress value={((muscleTensionStep + 1) / steps.length) * 100} className="h-2" />

        <div className={`text-center py-8 px-4 rounded-xl ${
          steps[muscleTensionStep].includes('Release') ? 'bg-accent/20' : 'bg-primary/10'
        }`}>
          <p className="text-xl font-medium">{steps[muscleTensionStep]}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Step {muscleTensionStep + 1} of {steps.length}
          </p>
        </div>

        <div className="flex gap-3">
          {muscleTensionStep < steps.length - 1 ? (
            <Button className="flex-1" onClick={handleNext}>
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : !activityComplete ? (
            <Button className="flex-1" onClick={completeActivity}>
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Complete
            </Button>
          ) : null}
        </div>

        {activityComplete && (
          <div className="text-center p-4 rounded-lg bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="font-medium text-primary">You practiced releasing tension.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
