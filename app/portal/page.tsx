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
  Wind
} from 'lucide-react'

// Mock Data
const classMetrics = {
  className: '9th Grade Wellness Group',
  todayParticipation: 82,
  weeklyParticipation: 76,
  weeklyCheckInCompletion: 78,
  teamChallengeCompletion: 76,
  studentsForReview: 2,
  topTeam: 'Team Blue',
  suggestedActivity: 'Box Breathing'
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
    pattern: 'Lower participation plus high stress check-ins',
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
    checkInPlanned: false
  },
  {
    id: 'student-b',
    name: 'Student B',
    pattern: 'Missed weekly check-in plus low energy',
    supportLevel: 'watch' as const,
    suggestedAction: 'Monitor',
    details: {
      lastWeekActivities: 4,
      thisWeekActivities: 3,
      streakEnded: false,
      weeklyCheckIn: null,
      requestedCheckIn: false
    },
    checkInPlanned: false
  },
  {
    id: 'student-c',
    name: 'Student C',
    pattern: 'Stable engagement pattern',
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
    checkInPlanned: false
  },
  {
    id: 'student-d',
    name: 'Student D',
    pattern: 'Sudden streak drop plus low connection',
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
    checkInPlanned: false
  }
]

const patternRules = [
  { trigger: 'One missed day', result: 'No alert' },
  { trigger: 'Three missed activities', result: 'Gentle reminder' },
  { trigger: 'Three missed activities plus high stress', result: 'Counselor review' },
  { trigger: 'Sudden streak drop plus low connection', result: 'Counselor review' },
  { trigger: 'Stable participation', result: 'No action' },
  { trigger: 'Student requests check-in', result: 'Counselor review' }
]

const privacyCommitments = [
  { icon: '🚫', text: 'No diagnosis' },
  { icon: '🔒', text: 'No invasive data collection' },
  { icon: '📱', text: 'No social media tracking' },
  { icon: '📍', text: 'No location tracking' },
  { icon: '💬', text: 'No private message scanning' },
  { icon: '📷', text: 'No camera or microphone monitoring' },
  { icon: '🏥', text: 'No medical records' },
  { icon: '👩‍🏫', text: 'Teachers see aggregate trends only' },
  { icon: '👨‍⚕️', text: 'Counselors review individual support alerts' },
  { icon: '🏆', text: 'Rankings based on participation only' },
  { icon: '👥', text: 'Human adults make support decisions' }
]

export default function TeacherCounselorPortal() {
  const [activeTab, setActiveTab] = useState('overview')
  const [studentAlerts, setStudentAlerts] = useState(initialStudentAlerts)
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [classResetStarted, setClassResetStarted] = useState(false)

  const handleLaunchClassReset = () => {
    setClassResetStarted(true)
    toast.success('Class reset started: Box Breathing', {
      description: 'Students will be guided through the activity.'
    })
  }

  const handleMarkCheckInPlanned = (studentId: string) => {
    setStudentAlerts(alerts =>
      alerts.map(alert =>
        alert.id === studentId ? { ...alert, checkInPlanned: true } : alert
      )
    )
    toast.success('Check-in planned', {
      description: `Support check-in scheduled for ${studentId.replace('-', ' ').toUpperCase()}.`
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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {"Today's Participation"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{classMetrics.todayParticipation}%</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Weekly Participation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{classMetrics.weeklyParticipation}%</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Weekly Check-In
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{classMetrics.weeklyCheckInCompletion}%</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Team Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{classMetrics.teamChallengeCompletion}%</div>
                </CardContent>
              </Card>
            </div>

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
                  <p className="text-sm text-muted-foreground">Recommended for support check-in</p>
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
          </TabsContent>

          {/* TEACHER TAB */}
          <TabsContent value="teacher" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Teacher View</h2>
              <p className="text-muted-foreground">Aggregate class and team data</p>
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

            {/* Suggested Class Activity */}
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-primary" />
                  Suggested Class Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xl font-semibold">{classMetrics.suggestedActivity}</p>
                  <p className="text-sm text-muted-foreground">
                    Class stress check-ins are slightly elevated.
                  </p>
                </div>
                <Button
                  onClick={handleLaunchClassReset}
                  disabled={classResetStarted}
                  className="w-full md:w-auto"
                >
                  {classResetStarted ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Class Reset Started
                    </>
                  ) : (
                    <>
                      Launch Class Reset
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Privacy Note */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
              <Eye className="h-4 w-4 flex-shrink-0" />
              <p>Teachers see class and team trends only.</p>
            </div>
          </TabsContent>

          {/* COUNSELOR TAB */}
          <TabsContent value="counselor" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Counselor View</h2>
              <p className="text-muted-foreground">Individual student support alerts</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Student Alerts Table */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Student Support Alerts</CardTitle>
                  <CardDescription>Click a student to view details</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Pattern</TableHead>
                        <TableHead>Support Level</TableHead>
                        <TableHead>Suggested Action</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentAlerts.map(alert => (
                        <TableRow
                          key={alert.id}
                          className={`cursor-pointer hover:bg-muted/50 ${selectedStudent === alert.id ? 'bg-muted' : ''}`}
                          onClick={() => setSelectedStudent(alert.id)}
                        >
                          <TableCell className="font-medium">{alert.name}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{alert.pattern}</TableCell>
                          <TableCell>
                            <Badge className={getSupportLevelColor(alert.supportLevel)}>
                              {alert.supportLevel.charAt(0).toUpperCase() + alert.supportLevel.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{alert.suggestedAction}</TableCell>
                          <TableCell>
                            {alert.checkInPlanned ? (
                              <Badge variant="outline" className="text-green-600 border-green-300">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Planned
                              </Badge>
                            ) : alert.supportLevel === 'elevated' ? (
                              <Badge variant="outline" className="text-amber-600 border-amber-300">
                                <Clock className="h-3 w-3 mr-1" />
                                Pending
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Student Detail Panel */}
              {selectedStudentData && (
                <Card className="lg:col-span-2 border-primary/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {selectedStudentData.name} Details
                        <Badge className={getSupportLevelColor(selectedStudentData.supportLevel)}>
                          {selectedStudentData.supportLevel}
                        </Badge>
                      </CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(null)}>
                        Close
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">Activity Changes</h4>
                        <p>
                          Participation dropped from{' '}
                          <span className="font-semibold">{selectedStudentData.details.lastWeekActivities} activities</span>{' '}
                          last week to{' '}
                          <span className="font-semibold">{selectedStudentData.details.thisWeekActivities} this week</span>
                        </p>
                        {selectedStudentData.details.streakEnded && (
                          <p className="text-amber-600">Streak ended</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">Weekly Check-In</h4>
                        {selectedStudentData.details.weeklyCheckIn ? (
                          <div className="space-y-1">
                            <p>Stress: <span className="font-semibold">{selectedStudentData.details.weeklyCheckIn.stress}</span></p>
                            <p>Sleep: <span className="font-semibold">{selectedStudentData.details.weeklyCheckIn.sleep}</span></p>
                            {selectedStudentData.details.weeklyCheckIn.connection && (
                              <p>Connection: <span className="font-semibold">{selectedStudentData.details.weeklyCheckIn.connection}</span></p>
                            )}
                          </div>
                        ) : (
                          <p className="text-amber-600">Weekly check-in not completed</p>
                        )}
                      </div>
                    </div>

                    {selectedStudentData.details.requestedCheckIn && (
                      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 text-amber-800 dark:text-amber-200">
                        <p className="font-medium">Student requested or may benefit from a supportive check-in</p>
                      </div>
                    )}

                    <div className="bg-primary/5 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Suggested Action</h4>
                      <p>{selectedStudentData.suggestedAction}</p>
                    </div>

                    {selectedStudentData.supportLevel === 'elevated' && !selectedStudentData.checkInPlanned && (
                      <Button onClick={() => handleMarkCheckInPlanned(selectedStudentData.id)}>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Mark Check-In Planned
                      </Button>
                    )}

                    {selectedStudentData.checkInPlanned && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-medium">Check-in planned</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* AI PATTERN REVIEW TAB */}
          <TabsContent value="patterns" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">How MindBloom Analyzes Patterns</h2>
              <p className="text-muted-foreground">Understanding engagement pattern detection</p>
            </div>

            {/* Flow Explanation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Pattern Analysis Flow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-5">
                  {[
                    { step: 1, title: 'Activity Tracking', desc: 'Student completes activities and check-ins' },
                    { step: 2, title: 'Engagement Analysis', desc: 'MindBloom tracks engagement changes' },
                    { step: 3, title: 'Context Addition', desc: 'Weekly check-in adds context' },
                    { step: 4, title: 'Pattern Flagging', desc: 'Repeated concern patterns are flagged' },
                    { step: 5, title: 'Human Review', desc: 'Counselor reviews the alert' }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mb-2">
                        {item.step}
                      </div>
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pattern Rules */}
            <Card>
              <CardHeader>
                <CardTitle>Pattern Rules</CardTitle>
                <CardDescription>How different engagement patterns are interpreted</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Engagement Pattern</TableHead>
                      <TableHead>System Response</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patternRules.map((rule, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{rule.trigger}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              rule.result === 'No alert' || rule.result === 'No action'
                                ? 'text-green-600 border-green-300'
                                : rule.result === 'Gentle reminder'
                                ? 'text-blue-600 border-blue-300'
                                : 'text-amber-600 border-amber-300'
                            }
                          >
                            {rule.result}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Example */}
            <Card className="border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-900/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Example: Student A Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Student A was flagged because participation dropped, their streak ended, and their weekly
                  check-in showed high stress and poor sleep. A supportive check-in is recommended.
                </p>
              </CardContent>
            </Card>

            {/* Terminology */}
            <Card>
              <CardHeader>
                <CardTitle>Our Approach to Language</CardTitle>
                <CardDescription>We use supportive, non-clinical terminology</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-green-600 mb-3">We Use</h4>
                    <ul className="space-y-2">
                      {['Support level', 'Engagement pattern', 'Wellness pattern', 'Supportive check-in', 'Counselor review'].map((term, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          {term}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-600 mb-3">We Never Use</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      {['Diagnosis', 'Risk score', 'Mental health score', 'Lazy', 'Disorder'].map((term, i) => (
                        <li key={i} className="flex items-center gap-2 line-through">
                          <span className="text-red-400">✕</span>
                          {term}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PRIVACY TAB */}
          <TabsContent value="privacy" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Privacy-First Design</h2>
              <p className="text-muted-foreground">Our commitments to student privacy and safety</p>
            </div>

            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-6">
                <p className="text-lg font-medium text-center">
                  &ldquo;MindBloom uses engagement patterns, not invasive surveillance.&rdquo;
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {privacyCommitments.map((commitment, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{commitment.icon}</span>
                      <p className="font-medium">{commitment.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Data Access Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Data Access</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Teachers</TableCell>
                      <TableCell>Aggregate class and team trends only</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Counselors</TableCell>
                      <TableCell>Individual student support alerts when patterns indicate need</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Students</TableCell>
                      <TableCell>Their own data, progress, and team participation</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="bg-muted rounded-lg p-6 text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Human-Centered Support</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                MindBloom identifies patterns and provides information to trusted adults.
                All support decisions are made by humans who know and care about students.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
