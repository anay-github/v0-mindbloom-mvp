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
  X,
  Play,
  Clock
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
  dailyGoal: 1,
  weeklyGoal: 5,
  completedToday: 0,
  completedThisWeek: 3
}

// Team Data
const teams = [
  { name: 'Team Blue', participation: 82, activities: 41, goalProgress: 82 },
  { name: 'Team Green', participation: 74, activities: 37, goalProgress: 74 },
  { name: 'Team Orange', participation: 68, activities: 34, goalProgress: 68 },
  { name: 'Team Purple', participation: 61, activities: 31, goalProgress: 61 }
]

// Activity Data with Labels
const activities = [
  {
    id: 'box-breathing',
    name: 'Box Breathing',
    icon: Wind,
    duration: '2 min',
    bestFor: 'Stress, test anxiety, calming down',
    classroomUse: 'Before a quiz or presentation',
    description: 'Breathe in a calming square pattern'
  },
  {
    id: 'sensory-countdown',
    name: 'Sensory Countdown',
    icon: Eye,
    duration: '3 min',
    bestFor: 'Feeling overwhelmed or distracted',
    classroomUse: 'After a transition or noisy activity',
    description: 'Ground yourself with your senses'
  },
  {
    id: 'look-for-green',
    name: 'Look for Green',
    icon: Eye,
    duration: '2 min',
    bestFor: 'Refocusing attention',
    classroomUse: 'Quick reset during class',
    description: 'Find green objects around you'
  },
  {
    id: 'body-scan',
    name: 'Body Scan',
    icon: Heart,
    duration: '3 min',
    bestFor: 'Low energy or tension',
    classroomUse: 'Morning routine or end-of-day reset',
    description: 'Notice how your body feels'
  },
  {
    id: 'muscle-tension',
    name: 'Muscle Tension & Release',
    icon: Hand,
    duration: '3 min',
    bestFor: 'Physical tension or frustration',
    classroomUse: 'After recess, lunch, or stressful moments',
    description: 'Tense and relax your muscles'
  }
]

// Supportive Messages
const supportiveMessages = [
  "Your BloomBird is ready for today's reset.",
  "No pressure. Want to try a quick reset today?",
  "Your team is 80% of the way to this week's goal.",
  "You helped Team Blue move closer to its goal.",
  "Great job staying consistent this week!",
  "These skills work best when practiced regularly."
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
  const [activitiesCompletedToday, setActivitiesCompletedToday] = useState(studentProfile.completedToday)
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
  
  // Mood Trend Tracking
  const [moodHistory, setMoodHistory] = useState<Mood[]>([])
  const [stressHistory, setStressHistory] = useState<StressLevel[]>([])

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
  
  const getGardenStageName = () => {
    switch (gardenStage) {
      case 1: return 'Seed'
      case 2: return 'Small Plant'
      case 3: return 'Flower'
      case 4: return 'Tree'
      default: return 'Seed'
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
    if (activityEnergy === 'low') return 'muscle-tension'
    return 'look-for-green'
  }
  
  const getSuggestedActivityFromDayResponse = () => {
    if (dayResponse === 'stressed') return 'Box Breathing'
    if (dayResponse === 'tired') return 'Body Scan'
    return 'Look for Green'
  }
  
  const getMoodTrend = () => {
    if (moodHistory.length < 2) return 'stable'
    const recentMoods = moodHistory.slice(-3)
    const stressedCount = recentMoods.filter(m => m === 'stressed' || m === 'tired').length
    if (stressedCount >= 2) return 'needs-attention'
    return 'stable'
  }
  
  const getStressTrend = () => {
    if (stressHistory.length < 2) return 'stable'
    const recentStress = stressHistory.slice(-3)
    const highCount = recentStress.filter(s => s === 'high').length
    if (highCount >= 2) return 'elevated'
    return 'stable'
  }

  const completeActivity = useCallback(() => {
    setBloomPoints(prev => prev + 10)
    setStreak(prev => prev + 1)
    setActivitiesCompletedToday(prev => prev + 1)
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
    setCheckInComplete(false)
    setActivityMood(null)
    setActivityStress(null)
    setActivityEnergy(null)
  }

  const handleDayResponse = (response: Mood) => {
    setDayResponse(response)
    setMoodHistory(prev => [...prev, response])
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
  
  const handleStartActivity = (activityId: string) => {
    setCurrentActivity(activityId)
    setActivityStep(0)
    setCheckInComplete(false)
  }
  
  const handlePreActivityCheckIn = () => {
    if (activityMood && activityStress && activityEnergy) {
      setMoodHistory(prev => [...prev, activityMood])
      setStressHistory(prev => [...prev, activityStress])
      setCheckInComplete(true)
      setActivityStep(1)
    } else {
      toast.error('Please complete all check-in questions')
    }
  }

  // Rotate notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification(prev => (prev + 1) % supportiveMessages.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Box Breathing Timer
  useEffect(() => {
    if (currentActivity !== 'box-breathing' || breathingPhase === 'idle' || activityComplete) return
    
    const phases: ('in' | 'hold1' | 'out' | 'hold2')[] = ['in', 'hold1', 'out', 'hold2']
    const currentIndex = phases.indexOf(breathingPhase as 'in' | 'hold1' | 'out' | 'hold2')
    
    const timer = setTimeout(() => {
      if (currentIndex === 3) {
        if (breathingCycle >= 2) {
          completeActivity()
        } else {
          setBreathingCycle(c => c + 1)
          setBreathingPhase('in')
        }
      } else {
        setBreathingPhase(phases[currentIndex + 1])
      }
    }, 4000)
    
    return () => clearTimeout(timer)
  }, [breathingPhase, breathingCycle, currentActivity, activityComplete, completeActivity])

  // Render activity content
  const renderActivityContent = () => {
    if (!currentActivity) return null
    
    // Pre-activity check-in
    if (!checkInComplete) {
      return (
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Quick Check-In</CardTitle>
            <CardDescription>How are you feeling right now?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">Mood</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 'great' as const, emoji: '😊', label: 'Great' },
                  { value: 'okay' as const, emoji: '🙂', label: 'Okay' },
                  { value: 'stressed' as const, emoji: '😰', label: 'Stressed' },
                  { value: 'tired' as const, emoji: '😴', label: 'Tired' }
                ].map(option => (
                  <Button
                    key={option.value}
                    variant={activityMood === option.value ? 'default' : 'outline'}
                    className="flex-col h-16 gap-1"
                    onClick={() => setActivityMood(option.value)}
                  >
                    <span className="text-xl">{option.emoji}</span>
                    <span className="text-xs">{option.label}</span>
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium">Stress Level</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'low' as const, label: 'Low' },
                  { value: 'medium' as const, label: 'Medium' },
                  { value: 'high' as const, label: 'High' }
                ].map(option => (
                  <Button
                    key={option.value}
                    variant={activityStress === option.value ? 'default' : 'outline'}
                    onClick={() => setActivityStress(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium">Energy Level</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'low' as const, label: 'Low' },
                  { value: 'medium' as const, label: 'Medium' },
                  { value: 'high' as const, label: 'High' }
                ].map(option => (
                  <Button
                    key={option.value}
                    variant={activityEnergy === option.value ? 'default' : 'outline'}
                    onClick={() => setActivityEnergy(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
            
            {activityStress === 'high' && currentActivity !== 'box-breathing' && (
              <div className="bg-primary/10 rounded-lg p-3 text-sm">
                <p className="text-primary font-medium">Suggestion: Box Breathing might help with high stress!</p>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={resetActivityState}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handlePreActivityCheckIn}>
                Start Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }
    
    // Post-activity reflection
    if (showPostReflection) {
      return (
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-3xl mb-2">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-center">Great job!</CardTitle>
            <CardDescription className="text-center">How do you feel now?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'better' as const, emoji: '😊', label: 'Better' },
                { value: 'same' as const, emoji: '🙂', label: 'Same' },
                { value: 'worse' as const, emoji: '😕', label: 'Need more' }
              ].map(option => (
                <Button
                  key={option.value}
                  variant={postFeeling === option.value ? 'default' : 'outline'}
                  className="flex-col h-20 gap-2"
                  onClick={() => setPostFeeling(option.value)}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span>{option.label}</span>
                </Button>
              ))}
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">Would you like to talk to someone?</p>
              <Button variant="outline" size="sm" onClick={handleRequestCheckIn}>
                Request Supportive Check-In
              </Button>
            </div>
            
            <Button className="w-full" onClick={() => {
              resetActivityState()
              setActiveTab('home')
            }}>
              Done
            </Button>
          </CardContent>
        </Card>
      )
    }
    
    // Activity-specific content
    switch (currentActivity) {
      case 'box-breathing':
        return (
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Box Breathing</CardTitle>
              <CardDescription className="text-center">Follow the circle and breathe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-6">
                <div className={`w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center transition-all duration-1000 ${
                  breathingPhase === 'in' ? 'scale-150 bg-primary/40' :
                  breathingPhase === 'hold1' ? 'scale-150 bg-primary/30' :
                  breathingPhase === 'out' ? 'scale-100 bg-primary/20' :
                  breathingPhase === 'hold2' ? 'scale-100 bg-primary/10' : ''
                }`}>
                  <span className="text-lg font-medium text-primary">
                    {breathingPhase === 'idle' ? 'Ready' :
                     breathingPhase === 'in' ? 'Breathe In' :
                     breathingPhase === 'hold1' ? 'Hold' :
                     breathingPhase === 'out' ? 'Breathe Out' : 'Hold'}
                  </span>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Cycle {breathingCycle + 1} of 3</p>
                  <Progress value={(breathingCycle / 3) * 100} className="h-2 w-32 mt-2" />
                </div>
                
                {breathingPhase === 'idle' && (
                  <Button onClick={() => setBreathingPhase('in')}>
                    <Play className="h-4 w-4 mr-2" />
                    Begin
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )
        
      case 'sensory-countdown':
        const sensorySteps = [
          { count: 5, sense: 'things you can SEE', emoji: '👀' },
          { count: 4, sense: 'things you can TOUCH', emoji: '✋' },
          { count: 3, sense: 'things you can HEAR', emoji: '👂' },
          { count: 2, sense: 'things you can SMELL', emoji: '👃' },
          { count: 1, sense: 'thing you can TASTE', emoji: '👅' }
        ]
        
        return (
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Sensory Countdown</CardTitle>
              <CardDescription className="text-center">5-4-3-2-1 grounding technique</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sensorySteps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                    sensoryChecks[index] ? 'bg-primary/10 border border-primary/30' : 'bg-muted/50'
                  }`}
                >
                  <div className="text-3xl">{step.emoji}</div>
                  <div className="flex-1">
                    <p className="font-medium">Name {step.count} {step.sense}</p>
                  </div>
                  <Button
                    variant={sensoryChecks[index] ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      const newChecks = [...sensoryChecks]
                      newChecks[index] = !newChecks[index]
                      setSensoryChecks(newChecks)
                      
                      if (newChecks.every(c => c)) {
                        setTimeout(completeActivity, 500)
                      }
                    }}
                  >
                    {sensoryChecks[index] ? <CheckCircle2 className="h-4 w-4" /> : 'Done'}
                  </Button>
                </div>
              ))}
              
              <Progress value={(sensoryChecks.filter(c => c).length / 5) * 100} className="h-2" />
            </CardContent>
          </Card>
        )
        
      case 'look-for-green':
        const correctCount = selectedGreenObjects.filter(i => greenObjects[i].isGreen).length
        const targetCount = 5
        
        return (
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Look for Green</CardTitle>
              <CardDescription className="text-center">Find 5 green objects in your surroundings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-2xl font-bold text-primary">{correctCount} / {targetCount}</p>
                <p className="text-sm text-muted-foreground">green objects found</p>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {greenObjects.map((obj, index) => (
                  <Button
                    key={index}
                    variant={selectedGreenObjects.includes(index) ? (obj.isGreen ? 'default' : 'destructive') : 'outline'}
                    className="h-16 text-xs"
                    onClick={() => {
                      if (selectedGreenObjects.includes(index)) {
                        setSelectedGreenObjects(prev => prev.filter(i => i !== index))
                      } else {
                        setSelectedGreenObjects(prev => [...prev, index])
                        if (!obj.isGreen) {
                          setGreenHint(`"${obj.name}" isn't green - keep looking!`)
                          setTimeout(() => setGreenHint(null), 2000)
                        }
                      }
                      
                      const newSelection = selectedGreenObjects.includes(index) 
                        ? selectedGreenObjects.filter(i => i !== index)
                        : [...selectedGreenObjects, index]
                      const newCorrect = newSelection.filter(i => greenObjects[i].isGreen).length
                      
                      if (newCorrect >= targetCount) {
                        setTimeout(completeActivity, 500)
                      }
                    }}
                  >
                    {obj.name}
                  </Button>
                ))}
              </div>
              
              {greenHint && (
                <p className="text-sm text-center text-amber-600 animate-grow">{greenHint}</p>
              )}
              
              <Progress value={(correctCount / targetCount) * 100} className="h-2" />
            </CardContent>
          </Card>
        )
        
      case 'body-scan':
        const bodyScanSteps = [
          { area: 'Head & Face', instruction: 'Notice any tension in your forehead, jaw, or neck.' },
          { area: 'Shoulders & Arms', instruction: 'Let your shoulders drop. Relax your arms and hands.' },
          { area: 'Chest & Stomach', instruction: 'Take a deep breath. Notice how your chest rises and falls.' },
          { area: 'Back & Hips', instruction: 'Feel the support beneath you. Release any tension.' },
          { area: 'Legs & Feet', instruction: 'Relax your thighs, calves, and feet. Feel grounded.' }
        ]
        
        return (
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Body Scan</CardTitle>
              <CardDescription className="text-center">Notice how your body feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Step {bodyScanStep + 1} of {bodyScanSteps.length}</p>
                <Progress value={((bodyScanStep + 1) / bodyScanSteps.length) * 100} className="h-2 mt-2" />
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 text-center space-y-4">
                <h3 className="text-xl font-semibold text-primary">{bodyScanSteps[bodyScanStep].area}</h3>
                <p className="text-muted-foreground">{bodyScanSteps[bodyScanStep].instruction}</p>
              </div>
              
              <Button 
                className="w-full" 
                onClick={() => {
                  if (bodyScanStep < bodyScanSteps.length - 1) {
                    setBodyScanStep(s => s + 1)
                  } else {
                    completeActivity()
                  }
                }}
              >
                {bodyScanStep < bodyScanSteps.length - 1 ? 'Next Area' : 'Complete'}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )
        
      case 'muscle-tension':
        const muscleSteps = [
          { area: 'Hands', instruction: 'Make tight fists for 5 seconds, then release. Feel the difference.' },
          { area: 'Arms', instruction: 'Tense your biceps for 5 seconds, then let them go completely.' },
          { area: 'Shoulders', instruction: 'Shrug your shoulders up to your ears, hold, then drop them.' },
          { area: 'Face', instruction: 'Scrunch up your face tightly, then relax all the muscles.' },
          { area: 'Legs', instruction: 'Press your feet into the floor, tense your legs, then release.' }
        ]
        
        return (
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Muscle Tension & Release</CardTitle>
              <CardDescription className="text-center">Tense and relax different muscle groups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Step {muscleTensionStep + 1} of {muscleSteps.length}</p>
                <Progress value={((muscleTensionStep + 1) / muscleSteps.length) * 100} className="h-2 mt-2" />
              </div>
              
              <div className="bg-accent/20 rounded-xl p-6 text-center space-y-4">
                <h3 className="text-xl font-semibold">{muscleSteps[muscleTensionStep].area}</h3>
                <p className="text-muted-foreground">{muscleSteps[muscleTensionStep].instruction}</p>
              </div>
              
              <Button 
                className="w-full" 
                onClick={() => {
                  if (muscleTensionStep < muscleSteps.length - 1) {
                    setMuscleTensionStep(s => s + 1)
                  } else {
                    completeActivity()
                  }
                }}
              >
                {muscleTensionStep < muscleSteps.length - 1 ? 'Next Muscle Group' : 'Complete'}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )
        
      default:
        return null
    }
  }

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

            {/* Today's Wellness Routine Card */}
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  {"Today's Wellness Routine"}
                </CardTitle>
                <CardDescription>These skills work best when practiced regularly.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{activitiesCompletedToday}/{studentProfile.dailyGoal}</p>
                    <p className="text-xs text-muted-foreground">Daily Goal</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{activitiesCompletedThisWeek}/{studentProfile.weeklyGoal}</p>
                    <p className="text-xs text-muted-foreground">Weekly Goal</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{streak}</p>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{bloomPoints}</p>
                    <p className="text-xs text-muted-foreground">Bloom Points</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between bg-card rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{getBloomBirdEmoji()}</div>
                    <div>
                      <p className="font-medium">BloomBird: {getBloomBirdStateName()}</p>
                      <p className="text-xs text-muted-foreground">Level {bloomBirdLevel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{getGardenEmoji()}</div>
                    <div>
                      <p className="font-medium">Garden: {getGardenStageName()}</p>
                      <p className="text-xs text-muted-foreground">{teamProgress}% team contribution</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg p-3">
                  <p className="text-sm text-muted-foreground mb-2">Suggested activity based on your check-in:</p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{getSuggestedActivityFromDayResponse()}</span>
                    <Button size="sm" onClick={() => {
                      const suggested = dayResponse === 'stressed' ? 'box-breathing' : 
                                       dayResponse === 'tired' ? 'body-scan' : 'look-for-green'
                      handleStartActivity(suggested)
                      setActiveTab('activities')
                    }}>
                      <Play className="h-4 w-4 mr-1" />
                      Start My 2-Minute Practice
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* BloomBird Card */}
              <Card className="overflow-hidden">
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

              {/* Team Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5 text-blue-500" />
                    {studentProfile.team}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Progress value={teamProgress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {teamProgress}% of weekly goal
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
                  <p className="font-medium">{studentProfile.buddy}</p>
                  <p className="text-sm text-muted-foreground">Encourage each other!</p>
                </CardContent>
              </Card>

              {/* Bloom Garden Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="text-xl">{getGardenEmoji()}</span>
                    Bloom Garden
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{getGardenStageName()}</p>
                  <p className="text-sm text-muted-foreground">
                    {gardenStage < 4 ? `${4 - activitiesCompletedThisWeek} more activities to grow` : 'Fully grown!'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ACTIVITIES TAB */}
          <TabsContent value="activities" className="space-y-6">
            {currentActivity ? (
              <>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={resetActivityState}>
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                </div>
                {renderActivityContent()}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">Wellness Activities</h2>
                    <p className="text-muted-foreground">Choose an activity to complete your daily practice</p>
                  </div>
                </div>
                
                {activityStress === 'high' && (
                  <Card className="border-primary/30 bg-primary/5">
                    <CardContent className="py-4">
                      <p className="text-sm text-primary">
                        <strong>Recommended:</strong> Based on your check-in, Box Breathing might help with high stress.
                      </p>
                    </CardContent>
                  </Card>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  {activities.map(activity => {
                    const isRecommended = getRecommendedActivity() === activity.id
                    return (
                      <Card 
                        key={activity.id} 
                        className={`cursor-pointer hover:shadow-lg transition-all ${isRecommended ? 'border-primary/50 bg-primary/5' : ''}`}
                        onClick={() => handleStartActivity(activity.id)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <activity.icon className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-lg flex items-center gap-2">
                                  {activity.name}
                                  {isRecommended && <Badge variant="secondary" className="text-xs">Suggested</Badge>}
                                </CardTitle>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {activity.duration}
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <div className="bg-muted/50 rounded-lg p-2 space-y-1">
                            <p className="text-xs"><strong>Best for:</strong> {activity.bestFor}</p>
                            <p className="text-xs"><strong>Classroom use:</strong> {activity.classroomUse}</p>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </>
            )}
          </TabsContent>

          {/* TEAM TAB */}
          <TabsContent value="team" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Team Challenge</h2>
              <p className="text-muted-foreground">Work together to reach your goals</p>
            </div>

            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Weekly Class Challenge
                </CardTitle>
                <CardDescription>Complete 100 wellness activities as a class</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Class Progress</span>
                    <span className="font-medium">{teamProgress}%</span>
                  </div>
                  <Progress value={teamProgress} className="h-3" />
                </div>
                <Button onClick={handleCelebrateTeam} variant="outline" className="w-full">
                  Celebrate Team Progress
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Leaderboard</CardTitle>
                <CardDescription>See how all teams are doing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teams.map((team, index) => (
                    <div 
                      key={team.name} 
                      className={`flex items-center gap-4 p-3 rounded-lg ${
                        team.name === studentProfile.team ? 'bg-primary/10 border border-primary/30' : 'bg-muted/50'
                      }`}
                    >
                      <div className="text-2xl font-bold text-muted-foreground w-8">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{team.name}</p>
                          {team.name === studentProfile.team && (
                            <Badge variant="secondary" className="text-xs">Your Team</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{team.activities} activities completed</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{team.participation}%</p>
                        <p className="text-xs text-muted-foreground">participation</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-500" />
                  Buddy System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Your Buddy: {studentProfile.buddy}</p>
                    <p className="text-sm text-muted-foreground">Encourage each other to keep your streaks going!</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Send Encouragement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PROGRESS TAB */}
          <TabsContent value="progress" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Your Progress</h2>
              <p className="text-muted-foreground">Track your wellness journey</p>
            </div>

            {/* Your Patterns Card */}
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Your Patterns
                </CardTitle>
                <CardDescription>Your participation pattern this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold">{activitiesCompletedThisWeek}</p>
                    <p className="text-xs text-muted-foreground">Activities this week</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold">{streak}</p>
                    <p className="text-xs text-muted-foreground">Current streak</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold">{weeklyCheckInSubmitted ? 'Done' : 'Pending'}</p>
                    <p className="text-xs text-muted-foreground">Weekly check-in</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold capitalize">{getMoodTrend()}</p>
                    <p className="text-xs text-muted-foreground">Mood trend</p>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium">Stress trend</p>
                    <p className="text-lg capitalize">{getStressTrend()}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium">Support request</p>
                    <p className="text-lg">{supportRequested ? 'Sent' : 'None'}</p>
                  </div>
                </div>
                
                {supportRequested && (
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm text-primary">Supportive check-in available. A counselor will reach out soon.</p>
                  </div>
                )}
                
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Would you like support?</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={handleRequestCheckIn}
                    disabled={supportRequested}
                  >
                    {supportRequested ? 'Check-in requested' : 'Request check-in'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Bloom Garden */}
              <Card>
                <CardHeader>
                  <CardTitle>Bloom Garden</CardTitle>
                  <CardDescription>Watch your garden grow with each activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-40 bg-gradient-to-b from-sky-100 to-green-100 dark:from-sky-900/20 dark:to-green-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-6xl mb-2">{getGardenEmoji()}</div>
                      <p className="font-medium">{getGardenStageName()}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {['🌱', '🌿', '🌸', '🌳'].map((emoji, i) => (
                      <div 
                        key={i} 
                        className={`text-center p-2 rounded-lg ${i + 1 <= gardenStage ? 'bg-primary/10' : 'bg-muted/30 opacity-50'}`}
                      >
                        <span className="text-2xl">{emoji}</span>
                        <p className="text-xs mt-1">{['Seed', 'Plant', 'Flower', 'Tree'][i]}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* BloomBird Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>BloomBird Growth</CardTitle>
                  <CardDescription>Level up your BloomBird companion</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`flex items-center justify-center h-40 bg-gradient-to-br from-mint to-primary/10 rounded-xl text-6xl ${isBloomBirdCelebrating ? 'animate-celebrate' : 'animate-float'}`}>
                    {getBloomBirdEmoji()}
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Level {bloomBirdLevel} Progress</span>
                      <span>{bloomBirdProgress}%</span>
                    </div>
                    <Progress value={bloomBirdProgress} className="h-2" />
                  </div>
                  <div className="mt-4 grid grid-cols-5 gap-1">
                    {['🐦', '🐦✨', '🐦🌿', '🐦🎉', '🐦🌈'].map((emoji, i) => (
                      <div 
                        key={i} 
                        className={`text-center p-1 rounded ${i + 1 <= bloomBirdLevel ? 'bg-primary/10' : 'bg-muted/30 opacity-50'}`}
                      >
                        <span className="text-lg">{emoji}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Milestones */}
            <Card>
              <CardHeader>
                <CardTitle>Milestones</CardTitle>
                <CardDescription>Celebrate your achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'First Activity', icon: '🎯', earned: activitiesCompletedThisWeek >= 1 },
                    { name: '3-Day Streak', icon: '🔥', earned: streak >= 3 },
                    { name: 'Weekly Goal', icon: '🏆', earned: activitiesCompletedThisWeek >= studentProfile.weeklyGoal },
                    { name: 'Team Player', icon: '🤝', earned: teamProgress >= 50 },
                    { name: '5-Day Streak', icon: '⭐', earned: streak >= 5 },
                    { name: 'Garden Grown', icon: '🌳', earned: gardenStage >= 4 },
                    { name: 'Super BloomBird', icon: '🌈', earned: bloomBirdLevel >= 5 },
                    { name: '100 Points', icon: '💎', earned: bloomPoints >= 100 }
                  ].map(milestone => (
                    <div 
                      key={milestone.name}
                      className={`text-center p-4 rounded-lg ${milestone.earned ? 'bg-primary/10 border border-primary/30' : 'bg-muted/30 opacity-60'}`}
                    >
                      <div className="text-3xl mb-2">{milestone.icon}</div>
                      <p className="text-sm font-medium">{milestone.name}</p>
                      {milestone.earned && <CheckCircle2 className="h-4 w-4 text-primary mx-auto mt-1" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* WEEKLY CHECK-IN TAB */}
          <TabsContent value="weekly" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Weekly Check-In</h2>
              <p className="text-muted-foreground">Help us understand how you are doing (+15 Bloom Points)</p>
            </div>

            {weeklyCheckInSubmitted ? (
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="py-8 text-center">
                  <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Weekly Check-In Complete!</h3>
                  <p className="text-muted-foreground mb-4">Thank you for sharing. Your responses help us support you better.</p>
                  {supportRequested && (
                    <div className="bg-card rounded-lg p-4 max-w-md mx-auto">
                      <p className="text-sm text-primary">A counselor may reach out to check in with you.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>How has your week been?</CardTitle>
                  <CardDescription>Your answers are private and help us support you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Stress Level */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">How stressed have you felt this week?</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'low' as const, label: 'Not very stressed' },
                        { value: 'medium' as const, label: 'Somewhat stressed' },
                        { value: 'high' as const, label: 'Very stressed' }
                      ].map(option => (
                        <Button
                          key={option.value}
                          variant={weeklyStress === option.value ? 'default' : 'outline'}
                          className="h-auto py-3"
                          onClick={() => setWeeklyStress(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Sleep */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">How has your sleep been?</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'good' as const, label: 'Good sleep' },
                        { value: 'okay' as const, label: 'Okay sleep' },
                        { value: 'poor' as const, label: 'Poor sleep' }
                      ].map(option => (
                        <Button
                          key={option.value}
                          variant={weeklySleep === option.value ? 'default' : 'outline'}
                          className="h-auto py-3"
                          onClick={() => setWeeklySleep(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Connection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">How connected do you feel to others?</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'connected' as const, label: 'Connected' },
                        { value: 'somewhat' as const, label: 'Somewhat' },
                        { value: 'not' as const, label: 'Not connected' }
                      ].map(option => (
                        <Button
                          key={option.value}
                          variant={weeklyConnection === option.value ? 'default' : 'outline'}
                          className="h-auto py-3"
                          onClick={() => setWeeklyConnection(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Activities Helping */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Are the wellness activities helping?</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'yes' as const, label: 'Yes, a lot' },
                        { value: 'some' as const, label: 'A little' },
                        { value: 'no' as const, label: 'Not really' }
                      ].map(option => (
                        <Button
                          key={option.value}
                          variant={weeklyActivities === option.value ? 'default' : 'outline'}
                          className="h-auto py-3"
                          onClick={() => setWeeklyActivities(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Counselor Check-in */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Would you like to talk to a counselor?</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'yes' as const, label: 'Yes, please' },
                        { value: 'maybe' as const, label: 'Maybe later' },
                        { value: 'no' as const, label: 'No, I\'m okay' }
                      ].map(option => (
                        <Button
                          key={option.value}
                          variant={wantsCounselorCheckIn === option.value ? 'default' : 'outline'}
                          className="h-auto py-3"
                          onClick={() => setWantsCounselorCheckIn(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" size="lg" onClick={handleWeeklySubmit}>
                    Submit Weekly Check-In (+15 Points)
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
