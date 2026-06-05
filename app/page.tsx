'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { 
  Leaf, 
  Flame, 
  Star, 
  Users, 
  Target, 
  Heart, 
  Brain, 
  Wind, 
  Eye, 
  Activity,
  TrendingUp,
  AlertCircle,
  Shield,
  BarChart3,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'

// Mock Data
const mockTeams = [
  { name: 'Team Blue', progress: 82, color: 'bg-blue-500' },
  { name: 'Team Green', progress: 74, color: 'bg-emerald-500' },
  { name: 'Team Orange', progress: 68, color: 'bg-orange-500' },
  { name: 'Team Purple', progress: 61, color: 'bg-purple-500' },
]

const mockActivities = [
  { name: 'Box Breathing', icon: Wind, description: 'Calm your mind with guided breathing', forStress: true },
  { name: 'Sensory Countdown', icon: Eye, description: '5-4-3-2-1 grounding exercise', forStress: false },
  { name: 'Body Scan', icon: Activity, description: 'Notice sensations in your body', forTired: true },
  { name: 'Look for Green', icon: Leaf, description: 'Find green objects around you', forStress: false },
  { name: 'Muscle Tension Release', icon: Heart, description: 'Tense and release muscle groups', forStress: false },
]

const mockSupportAlerts = [
  { 
    student: 'Student A', 
    pattern: 'Lower participation + high stress check-ins', 
    action: 'Supportive check-in',
    priority: 'high'
  },
  { 
    student: 'Student B', 
    pattern: 'Missed weekly quiz + low energy', 
    action: 'Monitor',
    priority: 'medium'
  },
  { 
    student: 'Student C', 
    pattern: 'Stable pattern', 
    action: 'No action',
    priority: 'low'
  },
]

type BloomBirdState = 'resting' | 'awake' | 'celebration'
type Mood = 'calm' | 'okay' | 'stressed' | 'tired' | null
type StressLevel = 'low' | 'medium' | 'high' | null
type EnergyLevel = 'low' | 'medium' | 'high' | null

export default function MindBloom() {
  const [activeTab, setActiveTab] = useState('home')
  const [bloomPoints, setBloomPoints] = useState(240)
  const [streak, setStreak] = useState(4)
  const [weeklyProgress, setWeeklyProgress] = useState(65)
  const [teamProgress, setTeamProgress] = useState(82)
  const [birdState, setBirdState] = useState<BloomBirdState>('resting')
  const [activityCompleted, setActivityCompleted] = useState(false)
  
  // Check-in state
  const [mood, setMood] = useState<Mood>(null)
  const [stressLevel, setStressLevel] = useState<StressLevel>(null)
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel>(null)
  const [reflection, setReflection] = useState('')
  const [checkInComplete, setCheckInComplete] = useState(false)
  
  // Dashboard view
  const [dashboardView, setDashboardView] = useState<'teacher' | 'counselor'>('teacher')

  const getRecommendedActivity = () => {
    if (stressLevel === 'high') return mockActivities[0] // Box Breathing
    if (mood === 'tired') return mockActivities[2] // Body Scan
    return mockActivities[1] // Sensory Countdown
  }

  const handleStartActivity = () => {
    setActiveTab('activity')
    setBirdState('awake')
  }

  const handleCompleteActivity = () => {
    setBloomPoints(prev => prev + 10)
    setStreak(prev => prev + 1)
    setWeeklyProgress(prev => Math.min(prev + 5, 100))
    setTeamProgress(prev => Math.min(prev + 2, 100))
    setActivityCompleted(true)
    setBirdState('celebration')
    toast.success('Nice work! +10 Bloom Points', {
      description: 'Your team progress increased!'
    })
  }

  const handleCelebrateTeam = () => {
    setBirdState('celebration')
    toast.success('Team celebration!', {
      description: 'Great teamwork everyone!'
    })
  }

  const BloomBird = ({ state }: { state: BloomBirdState }) => {
    const birdStyles = {
      resting: 'opacity-60 scale-95',
      awake: 'opacity-100 scale-100',
      celebration: 'opacity-100 scale-110 animate-bounce'
    }
    
    const birdEmoji = {
      resting: '🐦',
      awake: '🐤',
      celebration: '🎉🐦🎉'
    }

    return (
      <div className={`text-6xl text-center transition-all duration-500 ${birdStyles[state]}`}>
        {birdEmoji[state]}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">MindBloom</h1>
                <p className="text-xs text-muted-foreground">Grow your mind. Build your streak. Support your team.</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              Hackathon MVP Demo
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="home" className="gap-2">
              <Leaf className="h-4 w-4" />
              <span className="hidden sm:inline">Student Home</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Daily Activity</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Team Challenge</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
          </TabsList>

          {/* Student Home */}
          <TabsContent value="home" className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Welcome back, Student A</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* BloomBird Card */}
              <Card className="md:col-span-2 lg:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Brain className="h-5 w-5 text-primary" />
                    Your BloomBird
                  </CardTitle>
                  <CardDescription>
                    {birdState === 'resting' && 'Complete an activity to wake up your bird!'}
                    {birdState === 'awake' && 'Your bird is ready for the day!'}
                    {birdState === 'celebration' && 'Your bird is celebrating!'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-32 items-center justify-center rounded-xl bg-mint/50">
                    <BloomBird state={birdState} />
                  </div>
                </CardContent>
              </Card>

              {/* Streak Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Flame className="h-5 w-5 text-orange-500" />
                    Current Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground">{streak} Days</div>
                  <p className="text-sm text-muted-foreground">Keep it going!</p>
                </CardContent>
              </Card>

              {/* Points Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Bloom Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground">{bloomPoints}</div>
                  <p className="text-sm text-muted-foreground">Points earned</p>
                </CardContent>
              </Card>

              {/* Team Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5 text-blue-500" />
                    Your Team
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">Team Blue</div>
                  <p className="text-sm text-muted-foreground">Leading the challenge!</p>
                </CardContent>
              </Card>

              {/* Today's Goal */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="h-5 w-5 text-primary" />
                    {"Today's Goal"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-foreground">Complete a 2-minute reset</p>
                  <p className="text-sm text-muted-foreground">
                    {activityCompleted ? 'Completed!' : 'Not started yet'}
                  </p>
                </CardContent>
              </Card>

              {/* Weekly Progress */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Weekly Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Progress value={weeklyProgress} className="h-3" />
                  <p className="text-sm text-muted-foreground">{weeklyProgress}% of weekly goal</p>
                </CardContent>
              </Card>
            </div>

            <Button 
              size="lg" 
              className="w-full md:w-auto"
              onClick={handleStartActivity}
            >
              <Heart className="mr-2 h-5 w-5" />
              {"Start Today's Activity"}
            </Button>
          </TabsContent>

          {/* Daily Activity */}
          <TabsContent value="activity" className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Daily Check-in & Activity</h2>

            {!checkInComplete ? (
              <div className="space-y-6">
                {/* Mood Selector */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How are you feeling?</CardTitle>
                    <CardDescription>Select your current mood</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {(['calm', 'okay', 'stressed', 'tired'] as const).map((m) => (
                        <Button
                          key={m}
                          variant={mood === m ? 'default' : 'outline'}
                          className="h-auto flex-col gap-1 py-4"
                          onClick={() => setMood(m)}
                        >
                          <span className="text-2xl">
                            {m === 'calm' && '😌'}
                            {m === 'okay' && '🙂'}
                            {m === 'stressed' && '😰'}
                            {m === 'tired' && '😴'}
                          </span>
                          <span className="capitalize">{m}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Stress Level */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Stress Level</CardTitle>
                    <CardDescription>How stressed do you feel right now?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3">
                      {(['low', 'medium', 'high'] as const).map((level) => (
                        <Button
                          key={level}
                          variant={stressLevel === level ? 'default' : 'outline'}
                          onClick={() => setStressLevel(level)}
                        >
                          {level === 'low' && '🟢'} {level === 'medium' && '🟡'} {level === 'high' && '🔴'}{' '}
                          <span className="ml-2 capitalize">{level}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Energy Level */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Energy Level</CardTitle>
                    <CardDescription>How is your energy today?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3">
                      {(['low', 'medium', 'high'] as const).map((level) => (
                        <Button
                          key={level}
                          variant={energyLevel === level ? 'default' : 'outline'}
                          onClick={() => setEnergyLevel(level)}
                        >
                          {level === 'low' && '🔋'} {level === 'medium' && '⚡'} {level === 'high' && '💪'}{' '}
                          <span className="ml-2 capitalize">{level}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Reflection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Reflection (Optional)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <textarea
                      className="w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      rows={3}
                      placeholder="Write one sentence about your day..."
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                    />
                  </CardContent>
                </Card>

                <Button
                  size="lg"
                  disabled={!mood || !stressLevel || !energyLevel}
                  onClick={() => {
                    setCheckInComplete(true)
                    setBirdState('awake')
                  }}
                >
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Complete Check-in
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Recommended Activity */}
                <Card className="border-primary/50 bg-mint/30">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary text-primary-foreground">Recommended for you</Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      {(() => {
                        const activity = getRecommendedActivity()
                        const Icon = activity.icon
                        return <Icon className="h-6 w-6 text-primary" />
                      })()}
                      {getRecommendedActivity().name}
                    </CardTitle>
                    <CardDescription>{getRecommendedActivity().description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      2 minutes
                    </div>
                    
                    <div className="rounded-xl bg-card p-6 space-y-4">
                      <h4 className="font-semibold text-foreground">Activity Steps:</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">1</div>
                          <span>Breathe in slowly for 4 seconds</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">2</div>
                          <span>Hold your breath for 4 seconds</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">3</div>
                          <span>Breathe out slowly for 4 seconds</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">4</div>
                          <span>Repeat 4-5 times</span>
                        </div>
                      </div>
                    </div>

                    {!activityCompleted ? (
                      <Button size="lg" className="w-full" onClick={handleCompleteActivity}>
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        Complete Activity
                      </Button>
                    ) : (
                      <div className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 p-4 text-primary">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-medium">Activity Completed!</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Team Challenge */}
          <TabsContent value="team" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Calm Classroom Challenge</h2>
              <p className="text-muted-foreground">Work together to complete 100 wellness activities this week.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Team Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Team Blue Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold text-foreground">{teamProgress}%</div>
                  <Progress value={teamProgress} className="h-4" />
                  <p className="text-sm text-muted-foreground">{teamProgress} of 100 activities completed</p>
                </CardContent>
              </Card>

              {/* Milestone */}
              <Card className="border-accent/50 bg-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent-foreground" />
                    Next Milestone
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-medium text-foreground">90% team participation</p>
                  <p className="text-sm text-muted-foreground">Reward: BloomBird celebration animation</p>
                  <Progress value={(teamProgress / 90) * 100} className="h-3" />
                </CardContent>
              </Card>
            </div>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Team Leaderboard
                </CardTitle>
                <CardDescription>Rankings are based on participation, not wellness scores.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTeams.map((team, index) => (
                    <div key={team.name} className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{team.name}</span>
                          <span className="text-sm text-muted-foreground">{team.progress}%</span>
                        </div>
                        <Progress value={team.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button size="lg" onClick={handleCelebrateTeam}>
              <Sparkles className="mr-2 h-5 w-5" />
              Celebrate Team Progress
            </Button>
          </TabsContent>

          {/* Teacher / Counselor Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Dashboard</h2>
              <div className="flex gap-2">
                <Button
                  variant={dashboardView === 'teacher' ? 'default' : 'outline'}
                  onClick={() => setDashboardView('teacher')}
                >
                  Teacher View
                </Button>
                <Button
                  variant={dashboardView === 'counselor' ? 'default' : 'outline'}
                  onClick={() => setDashboardView('counselor')}
                >
                  Counselor View
                </Button>
              </div>
            </div>

            {dashboardView === 'teacher' ? (
              <div className="space-y-6">
                {/* Teacher Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {"Today's Participation"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-foreground">82%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Weekly Participation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-foreground">76%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Top Team</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">Team Blue</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Suggested Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold text-foreground">Box Breathing</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Class Trend */}
                <Card className="border-secondary/50 bg-secondary/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-secondary-foreground" />
                      Class Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground">
                      {"Class stress check-ins are slightly elevated before Friday's test. Consider a calming activity."}
                    </p>
                  </CardContent>
                </Card>

                {/* Team Performance Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Team Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Team</TableHead>
                          <TableHead>Participation</TableHead>
                          <TableHead>Progress</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockTeams.map((team) => (
                          <TableRow key={team.name}>
                            <TableCell className="font-medium">{team.name}</TableCell>
                            <TableCell>{team.progress}%</TableCell>
                            <TableCell>
                              <Progress value={team.progress} className="h-2 w-24" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Privacy Note */}
                <Card className="border-primary/30 bg-primary/5">
                  <CardContent className="flex items-start gap-3 pt-6">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Teachers see class-level trends only, not private student wellness details.
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Support Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-primary" />
                      Support Alerts
                    </CardTitle>
                    <CardDescription>Students who may benefit from a check-in</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Pattern Detected</TableHead>
                          <TableHead>Suggested Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockSupportAlerts.map((alert) => (
                          <TableRow key={alert.student}>
                            <TableCell className="font-medium">{alert.student}</TableCell>
                            <TableCell>{alert.pattern}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  alert.priority === 'high'
                                    ? 'destructive'
                                    : alert.priority === 'medium'
                                    ? 'secondary'
                                    : 'outline'
                                }
                              >
                                {alert.action}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* AI Pattern Explanation */}
                <Card className="border-accent/50 bg-accent/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-accent-foreground" />
                      Pattern Analysis: Student A
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground">
                      MindBloom noticed Student A missed several activities, lost their streak, and reported higher
                      stress this week. A supportive check-in is recommended.
                    </p>
                  </CardContent>
                </Card>

                {/* Safety Note */}
                <Card className="border-primary/30 bg-primary/5">
                  <CardContent className="flex items-start gap-3 pt-6">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      MindBloom does not diagnose. It detects repeated engagement and wellness patterns so a trained
                      adult can decide the next step.
                    </p>
                  </CardContent>
                </Card>

                {/* Success Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Success Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="rounded-lg bg-muted p-4">
                        <p className="text-sm text-muted-foreground">Daily Activity Rate</p>
                        <p className="text-2xl font-bold text-foreground">82%</p>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <p className="text-sm text-muted-foreground">Weekly Quiz Completion</p>
                        <p className="text-2xl font-bold text-foreground">78%</p>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <p className="text-sm text-muted-foreground">Team Challenge</p>
                        <p className="text-2xl font-bold text-foreground">76%</p>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <p className="text-sm text-muted-foreground">Counselor Reviews</p>
                        <p className="text-2xl font-bold text-foreground">2</p>
                      </div>
                      <div className="rounded-lg bg-muted p-4 sm:col-span-2 lg:col-span-2">
                        <p className="text-sm text-muted-foreground">Participation Improvement</p>
                        <p className="text-2xl font-bold text-foreground">55% → 82%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* How MindBloom Works */}
            <Card>
              <CardHeader>
                <CardTitle>How MindBloom Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {[
                    { step: 1, text: 'Student participates in short activities' },
                    { step: 2, text: 'Student earns points and helps their team' },
                    { step: 3, text: 'MindBloom tracks engagement patterns' },
                    { step: 4, text: 'Teachers see aggregate trends' },
                    { step: 5, text: 'Counselors see support alerts when patterns appear' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {item.step}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Privacy First */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Privacy First MVP
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    No social media tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    No location tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    No private message scanning
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    No medical records
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    No diagnosis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Teachers see aggregate data
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Counselors review support alerts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Rankings based on participation
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
