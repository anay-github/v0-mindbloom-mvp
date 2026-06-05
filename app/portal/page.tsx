'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
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
import {
  ArrowLeft,
  LayoutDashboard,
  GraduationCap,
  Heart,
  Brain,
  Shield,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  ChevronRight,
  Wind,
  Play,
  Target,
  BarChart3
} from 'lucide-react'

// Mock Data
const classMetrics = {
  className: '9th Grade Wellness Group',
  totalStudents: 30,
  todayParticipation: 82,
  weeklyParticipation: 76,
  weeklyCheckInCompletion: 78,
  teamChallengeCompletion: 76,
  studentsForReview: 2,
  checkInsPlanned: 1,
  topTeam: 'Team Blue',
  suggestedActivity: 'Box Breathing',
  classroomRoutinesLaunched: 4,
  studentsCompletingThreeOrMore: 18
}

const teams = [
  { name: 'Team Blue', participation: 82, activities: 41, goalProgress: 82 },
  { name: 'Team Green', participation: 74, activities: 37, goalProgress: 74 },
  { name: 'Team Orange', participation: 68, activities: 34, goalProgress: 68 },
  { name: 'Team Purple', participation: 61, activities: 31, goalProgress: 61 }
]

const initialStudentAlerts = [
  {
    id: 'student-a',
    name: 'Student A',
    engagementPattern: 'Participation dropped',
    wellnessPattern: 'High stress check-ins',
    supportLevel: 'elevated' as const,
    suggestedAction: 'Supportive check-in',
    details: {
      lastWeekActivities: 5,
      thisWeekActivities: 1,
      streakEnded: true,
      weeklyCheckIn: {
        stress: 'high',
        sleep: 'poor'
      },
      requestedCheckIn: true
    },
    checkInPlanned: false,
    flagReason: 'Student A was flagged because participation dropped from 5 activities last week to 1 this week, their streak ended, and their weekly check-in showed high stress and poor sleep. MindBloom recommends a supportive counselor check-in.'
  },
  {
    id: 'student-b',
    name: 'Student B',
    engagementPattern: 'Missed weekly check-in',
    wellnessPattern: 'Low energy',
    supportLevel: 'watch' as const,
    suggestedAction: 'Monitor',
    details: {
      lastWeekActivities: 4,
      thisWeekActivities: 3,
      streakEnded: false,
      weeklyCheckIn: null,
      requestedCheckIn: false
    },
    checkInPlanned: false,
    flagReason: 'Student B missed their weekly check-in and showed low energy in recent activities. Continue monitoring for changes.'
  },
  {
    id: 'student-c',
    name: 'Student C',
    engagementPattern: 'Stable participation',
    wellnessPattern: 'Stable check-ins',
    supportLevel: 'stable' as const,
    suggestedAction: 'No action',
    details: {
      lastWeekActivities: 5,
      thisWeekActivities: 4,
      streakEnded: false,
      weeklyCheckIn: {
        stress: 'low',
        sleep: 'good'
      },
      requestedCheckIn: false
    },
    checkInPlanned: false,
    flagReason: ''
  },
  {
    id: 'student-d',
    name: 'Student D',
    engagementPattern: 'Streak ended',
    wellnessPattern: 'Low connection',
    supportLevel: 'elevated' as const,
    suggestedAction: 'Supportive check-in',
    details: {
      lastWeekActivities: 5,
      thisWeekActivities: 2,
      streakEnded: true,
      weeklyCheckIn: {
        stress: 'medium',
        sleep: 'okay',
        connection: 'not connected'
      },
      requestedCheckIn: false
    },
    checkInPlanned: false,
    flagReason: 'Student D was flagged because their streak ended, participation dropped, and their weekly check-in indicated they feel not connected to others. MindBloom recommends a supportive counselor check-in.'
  }
]

const patternRules = [
  { trigger: 'One missed day', result: 'No alert' },
  { trigger: 'Three missed activities', result: 'Supportive reminder' },
  { trigger: 'Three missed activities plus high stress', result: 'Counselor review' },
  { trigger: 'Sudden streak drop plus poor sleep', result: 'Counselor review' },
  { trigger: 'Student requests check-in', result: 'Counselor review' },
  { trigger: 'Stable participation', result: 'No action' }
]

const classroomRoutines = [
  { id: 'morning', name: 'Morning Reset', activity: 'Body Scan', description: 'Help students settle in at the start of class' },
  { id: 'pretest', name: 'Pre-Test Calm', activity: 'Box Breathing', description: 'Help students manage stress before assessments' },
  { id: 'afterlunch', name: 'After-Lunch Refocus', activity: 'Look for Green', description: 'Help students refocus after lunch break' },
  { id: 'endofday', name: 'End-of-Day Wind Down', activity: 'Sensory Countdown', description: 'Help students transition out of school mode' }
]

const classroomChallenges = [
  { id: '100activities', name: 'Complete 100 wellness activities this week', progress: 76 },
  { id: '80participation', name: 'Reach 80% class participation', progress: 82 },
  { id: '3skills', name: 'Try 3 different skills this week', progress: 100 },
  { id: '5daystreak', name: 'Complete a 5-day classroom streak', progress: 80 }
]

const privacyCommitments = [
  { icon: '🚫', title: 'No diagnosis', text: 'MindBloom does not diagnose students' },
  { icon: '🔒', title: 'No invasive data', text: 'No social media tracking' },
  { icon: '📍', title: 'No location', text: 'No location tracking' },
  { icon: '💬', title: 'No messages', text: 'No private message scanning' },
  { icon: '📷', title: 'No camera', text: 'No camera or microphone monitoring' },
  { icon: '🏥', title: 'No medical records', text: 'No medical record access' },
  { icon: '👩‍🏫', title: 'Teachers: Aggregate only', text: 'Teachers see class-level trends' },
  { icon: '👨‍⚕️', title: 'Counselors: Individual alerts', text: 'Counselors review support alerts' },
  { icon: '🏆', title: 'Rankings: Participation only', text: 'Based on engagement, not wellness scores' },
  { icon: '👥', title: 'Human decisions', text: 'Adults make all support decisions' }
]

export default function TeacherCounselorPortal() {
  const [activeTab, setActiveTab] = useState('overview')
  const [studentAlerts, setStudentAlerts] = useState(initialStudentAlerts)
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [classResetActive, setClassResetActive] = useState<string | null>(null)
  const [activeChallenge, setActiveChallenge] = useState<string | null>('100activities')

  const handleLaunchClassRoutine = (routineId: string, activityName: string) => {
    setClassResetActive(routineId)
    toast.success(`Class routine started: ${activityName}`, {
      description: 'Students will be guided through the activity.'
    })
  }

  const handleSelectChallenge = (challengeId: string) => {
    setActiveChallenge(challengeId)
    toast.success('Challenge selected!', {
      description: 'This is now your active class challenge.'
    })
  }

  const handleMarkCheckInPlanned = (studentId: string) => {
    setStudentAlerts(alerts =>
      alerts.map(alert =>
        alert.id === studentId ? { ...alert, checkInPlanned: true } : alert
      )
    )
    toast.success('Support step recorded', {
      description: 'A trusted adult will follow up.'
    })
  }

  const getSupportLevelColor = (level: 'stable' | 'watch' | 'elevated') => {
    switch (level) {
      case 'stable':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'watch':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'elevated':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    }
  }

  const selectedStudentData = studentAlerts.find(s => s.id === selectedStudent)
  const elevatedStudents = studentAlerts.filter(s => s.supportLevel === 'elevated')

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
                <p className="text-xs text-muted-foreground">Teacher &amp; Counselor Portal</p>
              </div>
            </div>
            <Badge variant="outline" className="text-muted-foreground">
              {classMetrics.className}
            </Badge>
          </div>
        </div>
      </header>

      {/* Safety Message Banner */}
      <div className="bg-primary/5 border-b border-primary/10 py-2 px-4">
        <p className="text-center text-sm text-primary italic">
          MindBloom gamifies participation, not mental health.
        </p>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="gap-1.5">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="teacher" className="gap-1.5">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Teacher</span>
            </TabsTrigger>
            <TabsTrigger value="counselor" className="gap-1.5">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Counselor</span>
            </TabsTrigger>
            <TabsTrigger value="patterns" className="gap-1.5">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">AI Patterns</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-1.5">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            <h2 className="text-2xl font-semibold">Portal Overview</h2>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Daily Participation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{classMetrics.todayParticipation}%</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Weekly Practice Goal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{classMetrics.weeklyParticipation}%</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Classroom Routines Launched
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{classMetrics.classroomRoutinesLaunched}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Team Challenge Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{classMetrics.teamChallengeCompletion}%</div>
                </CardContent>
              </Card>
            </div>

            {/* Success Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Success Metrics
                </CardTitle>
                <CardDescription>Skill practice and early support metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Skill Practice</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Daily participation</span>
                        <span className="font-medium">{classMetrics.todayParticipation}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Weekly practice goal</span>
                        <span className="font-medium">{classMetrics.weeklyParticipation}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Classroom routines launched</span>
                        <span className="font-medium">{classMetrics.classroomRoutinesLaunched}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Team challenge progress</span>
                        <span className="font-medium">{classMetrics.teamChallengeCompletion}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Students completing 3+ activities</span>
                        <span className="font-medium">{classMetrics.studentsCompletingThreeOrMore} of {classMetrics.totalStudents}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Early Support</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Students recommended for review</span>
                        <span className="font-medium text-amber-600">{classMetrics.studentsForReview}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Supportive check-ins planned</span>
                        <span className="font-medium text-primary">{classMetrics.checkInsPlanned}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Weekly check-ins completed</span>
                        <span className="font-medium">{classMetrics.weeklyCheckInCompletion}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-amber-200 dark:border-amber-800/50">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Students for Review
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600">{classMetrics.studentsForReview}</div>
                  <p className="text-sm text-muted-foreground">Recommended for supportive check-in</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5 text-blue-500" />
                    Top Team
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{classMetrics.topTeam}</div>
                  <p className="text-sm text-muted-foreground">Highest participation</p>
                </CardContent>
              </Card>

              <Card className="border-primary/30 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Wind className="h-5 w-5 text-primary" />
                    Suggested Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">{classMetrics.suggestedActivity}</div>
                  <p className="text-sm text-muted-foreground">For today&apos;s class reset</p>
                </CardContent>
              </Card>
            </div>

            {/* Teacher Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Teacher Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    Class participation is strong today.
                  </p>
                  <p className="text-sm p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    Class stress check-ins are slightly elevated.
                  </p>
                  <p className="text-sm p-2 bg-primary/10 rounded-lg">
                    Recommended class activity: Box Breathing.
                  </p>
                  <p className="text-sm p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    Team Blue is leading participation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TEACHER TAB */}
          <TabsContent value="teacher" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Teacher View</h2>
              <p className="text-muted-foreground">Aggregate class data and classroom tools</p>
            </div>

            {/* Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {[
                { label: "Today's Activity", value: `${classMetrics.todayParticipation}%` },
                { label: 'Weekly Activity', value: `${classMetrics.weeklyParticipation}%` },
                { label: 'Weekly Check-In', value: `${classMetrics.weeklyCheckInCompletion}%` },
                { label: 'Avg Team Participation', value: '74%' },
                { label: 'Challenge Progress', value: `${classMetrics.teamChallengeCompletion}%` }
              ].map((metric, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {metric.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Launch Class Routine */}
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-primary" />
                  Launch Class Routine
                </CardTitle>
                <CardDescription>Start a guided wellness activity for your class</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {classroomRoutines.map(routine => (
                    <div 
                      key={routine.id}
                      className={`p-4 rounded-lg border transition-all ${
                        classResetActive === routine.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{routine.name}</h4>
                          <p className="text-sm text-muted-foreground">{routine.description}</p>
                          <p className="text-xs text-primary mt-1">Activity: {routine.activity}</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant={classResetActive === routine.id ? 'secondary' : 'default'}
                          onClick={() => handleLaunchClassRoutine(routine.id, routine.activity)}
                          disabled={classResetActive === routine.id}
                        >
                          {classResetActive === routine.id ? 'Active' : 'Launch'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {classResetActive && (
                  <div className="mt-4 p-4 bg-card rounded-lg border border-primary/30">
                    <p className="text-sm text-primary font-medium">
                      Class routine active: {classroomRoutines.find(r => r.id === classResetActive)?.activity}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Students are being guided through the activity.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Classroom Challenge Builder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Classroom Challenge Builder
                </CardTitle>
                <CardDescription>Select a challenge to motivate your class</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {classroomChallenges.map(challenge => (
                  <div 
                    key={challenge.id}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      activeChallenge === challenge.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border bg-muted/30 hover:border-primary/50'
                    }`}
                    onClick={() => handleSelectChallenge(challenge.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{challenge.name}</h4>
                      {activeChallenge === challenge.id && (
                        <Badge variant="secondary">Active</Badge>
                      )}
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">{challenge.progress}% complete</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Team Table */}
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Participation and activity metrics by team</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team</TableHead>
                      <TableHead>Participation</TableHead>
                      <TableHead>Activities Completed</TableHead>
                      <TableHead>Weekly Goal Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teams.map(team => (
                      <TableRow key={team.name}>
                        <TableCell className="font-medium">{team.name}</TableCell>
                        <TableCell>{team.participation}%</TableCell>
                        <TableCell>{team.activities} activities</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={team.goalProgress} className="h-2 w-20" />
                            <span className="text-sm">{team.goalProgress}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Family Practice Extension */}
            <Card className="border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  🏠 Family Practice Extension
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Students can optionally continue short activities at home. Future versions can send 
                  parents simple encouragement summaries, such as: &quot;Ask your student to show you one 
                  calming skill they practiced this week.&quot;
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* COUNSELOR TAB */}
          <TabsContent value="counselor" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Counselor View</h2>
              <p className="text-muted-foreground">Individual support alerts and prioritization</p>
            </div>

            {/* Counselor Insights */}
            <Card className="border-amber-200 dark:border-amber-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-amber-500" />
                  Counselor Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    {elevatedStudents.length} students may need review.
                  </p>
                  {elevatedStudents.map(student => (
                    <p key={student.id} className="text-sm p-2 bg-muted/50 rounded-lg">
                      {student.name} shows {student.engagementPattern.toLowerCase()} plus {student.wellnessPattern.toLowerCase()}.
                    </p>
                  ))}
                  <p className="text-sm p-2 bg-primary/10 rounded-lg">
                    Suggested next step: supportive check-in.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Early Support Prioritization */}
            <Card>
              <CardHeader>
                <CardTitle>Early Support Prioritization</CardTitle>
                <CardDescription>Students who may benefit from a supportive check-in</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Engagement Pattern</TableHead>
                      <TableHead>Wellness Pattern</TableHead>
                      <TableHead>Support Level</TableHead>
                      <TableHead>Suggested Next Step</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentAlerts.map(student => (
                      <TableRow 
                        key={student.id}
                        className={`cursor-pointer ${selectedStudent === student.id ? 'bg-muted/50' : ''}`}
                        onClick={() => setSelectedStudent(student.id === selectedStudent ? null : student.id)}
                      >
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.engagementPattern}</TableCell>
                        <TableCell>{student.wellnessPattern}</TableCell>
                        <TableCell>
                          <Badge className={getSupportLevelColor(student.supportLevel)}>
                            {student.supportLevel === 'elevated' ? 'Elevated' : 
                             student.supportLevel === 'watch' ? 'Watch' : 'Stable'}
                          </Badge>
                        </TableCell>
                        <TableCell>{student.suggestedAction}</TableCell>
                        <TableCell>
                          <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${selectedStudent === student.id ? 'rotate-90' : ''}`} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Selected Student Panel */}
            {selectedStudentData && selectedStudentData.supportLevel !== 'stable' && (
              <Card className="border-amber-200 dark:border-amber-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Why {selectedStudentData.name} was flagged
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {selectedStudentData.flagReason}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-lg font-bold">{selectedStudentData.details.lastWeekActivities}</p>
                      <p className="text-xs text-muted-foreground">Last week activities</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-lg font-bold">{selectedStudentData.details.thisWeekActivities}</p>
                      <p className="text-xs text-muted-foreground">This week activities</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-lg font-bold">{selectedStudentData.details.streakEnded ? 'Yes' : 'No'}</p>
                      <p className="text-xs text-muted-foreground">Streak ended</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-lg font-bold">{selectedStudentData.details.requestedCheckIn ? 'Yes' : 'No'}</p>
                      <p className="text-xs text-muted-foreground">Requested check-in</p>
                    </div>
                  </div>
                  
                  {selectedStudentData.checkInPlanned ? (
                    <div className="p-4 bg-primary/10 rounded-lg flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="text-sm text-primary font-medium">Check-in planned</span>
                    </div>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={() => handleMarkCheckInPlanned(selectedStudentData.id)}
                    >
                      Mark Check-In Planned
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Action Pathway */}
            <Card>
              <CardHeader>
                <CardTitle>Action Pathway</CardTitle>
                <CardDescription>How MindBloom supports early intervention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  {[
                    { step: '1', label: 'Pattern detected' },
                    { step: '2', label: 'Counselor reviews alert' },
                    { step: '3', label: 'Supportive check-in planned' },
                    { step: '4', label: 'Student receives support' },
                    { step: '5', label: 'Pattern monitored over time' }
                  ].map((item, i) => (
                    <div key={item.step} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                        {item.step}
                      </div>
                      <span className="text-sm">{item.label}</span>
                      {i < 4 && <ChevronRight className="h-4 w-4 text-muted-foreground hidden md:block" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI PATTERNS TAB */}
          <TabsContent value="patterns" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Clear AI Pattern Analysis</h2>
              <p className="text-muted-foreground">Understanding how MindBloom identifies support needs</p>
            </div>

            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="py-6">
                <p className="text-center text-foreground">
                  MindBloom does not diagnose students. It looks for repeated changes in engagement 
                  and wellness patterns, then explains why a student may need support.
                </p>
              </CardContent>
            </Card>

            {/* Pattern Rules */}
            <Card>
              <CardHeader>
                <CardTitle>Pattern Rules</CardTitle>
                <CardDescription>How different signals trigger different responses</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>When this happens...</TableHead>
                      <TableHead>MindBloom responds with...</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patternRules.map((rule, i) => (
                      <TableRow key={i}>
                        <TableCell>{rule.trigger}</TableCell>
                        <TableCell>
                          <Badge variant={
                            rule.result === 'No alert' || rule.result === 'No action' ? 'secondary' :
                            rule.result === 'Supportive reminder' ? 'outline' : 'default'
                          }>
                            {rule.result}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Sample AI Explanation */}
            <Card>
              <CardHeader>
                <CardTitle>Sample AI Explanation</CardTitle>
                <CardDescription>How MindBloom explains why a student was flagged</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm italic">
                    &quot;Because Student A&apos;s participation dropped, streak ended, and weekly check-in showed 
                    high stress and poor sleep, MindBloom recommends a supportive check-in.&quot;
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* What MindBloom Looks At */}
            <Card>
              <CardHeader>
                <CardTitle>What MindBloom Analyzes</CardTitle>
                <CardDescription>Signals combined to identify wellness patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Daily activity completion',
                    'Check-in mood responses',
                    'Check-in stress levels',
                    'Check-in energy levels',
                    'Streak changes',
                    'Weekly wellness quiz answers',
                    'Support request button',
                    'Post-activity reflection',
                    'Team contribution',
                    'BloomBird growth'
                  ].map((signal, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="text-sm">{signal}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Clear Insights Promise */}
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle>Clear Insights, Not Just Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  MindBloom does not just show raw data. It provides clear, helpful insights and 
                  recommends a next step, such as a supportive counselor check-in, class reset 
                  activity, or continued monitoring.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PRIVACY TAB */}
          <TabsContent value="privacy" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Privacy, Fairness, Usability, Actionability</h2>
              <p className="text-muted-foreground">How MindBloom protects students while providing support</p>
            </div>

            {/* Four Pillars */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-2">
                    🔒
                  </div>
                  <CardTitle>Privacy &amp; Trust</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    MindBloom avoids social media tracking, location tracking, private message scanning, 
                    camera monitoring, microphone monitoring, and medical record access.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-2">
                    ⚖️
                  </div>
                  <CardTitle>Fairness</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    MindBloom uses simple participation and check-in patterns that can work across 
                    different student groups. Support alerts are reviewed by humans, not decided automatically.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-2">
                    ✨
                  </div>
                  <CardTitle>Usability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Students use short activities, simple check-ins, points, streaks, teams, and 
                    BloomBird progress to make daily wellness practice easy and engaging.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-2">
                    🎯
                  </div>
                  <CardTitle>Actionability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    MindBloom does not just show data. It recommends a next step, such as a supportive 
                    counselor check-in, class reset activity, or continued monitoring.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Privacy Commitments */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy Commitments</CardTitle>
                <CardDescription>What MindBloom does and does not do</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {privacyCommitments.map((commitment, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <span className="text-xl">{commitment.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{commitment.title}</p>
                        <p className="text-xs text-muted-foreground">{commitment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Safety Message */}
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="py-6">
                <p className="text-center text-lg font-medium text-foreground">
                  MindBloom gamifies participation, not mental health.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
