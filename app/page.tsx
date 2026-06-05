import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-2xl">
              🌱
            </div>
            <span className="text-xl font-semibold text-foreground">MindBloom</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo and Tagline */}
          <div className="space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-5xl animate-float">
              🌱
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              MindBloom
            </h1>
            <p className="text-xl text-primary font-medium">
              Grow your mind. Build your streak. Support your team.
            </p>
          </div>

          {/* Core Product Message */}
          <div className="bg-primary/10 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-lg text-foreground font-medium text-pretty">
              MindBloom helps schools notice earlier, respond with care, and build daily wellness habits.
            </p>
          </div>

          {/* Safety Message */}
          <p className="text-sm text-muted-foreground italic">
            MindBloom gamifies participation, not mental health.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/student">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-primary hover:bg-primary/90">
                Enter Student Experience
              </Button>
            </Link>
            <Link href="/portal">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-primary text-primary hover:bg-primary/10">
                Open Teacher &amp; Counselor Portal
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-3xl mb-2">
                🧘
              </div>
              <CardTitle className="text-foreground">Daily Wellness Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-muted-foreground">
                Interactive breathing exercises, grounding techniques, and mindfulness activities 
                designed for the classroom.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-accent/30 flex items-center justify-center text-3xl mb-2">
                🏆
              </div>
              <CardTitle className="text-foreground">Team Challenges &amp; Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-muted-foreground">
                Build streaks, earn points, and work together with your team to reach 
                wellness goals.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center text-3xl mb-2">
                💚
              </div>
              <CardTitle className="text-foreground">Early Support Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-muted-foreground">
                Gentle pattern detection helps trusted adults provide timely support 
                when students may need it.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* How MindBloom Supports Students Earlier */}
        <section className="mt-24 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            How MindBloom Supports Students Earlier
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Early pattern detection without invasive monitoring
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-2">
                  📊
                </div>
                <CardTitle className="text-foreground">Tracks Changes Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  MindBloom looks at changes in participation, check-ins, weekly wellness quizzes, 
                  streaks, and activity completion over time instead of reacting to one bad day.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-2">
                  🔗
                </div>
                <CardTitle className="text-foreground">Combines Multiple Signals</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  MindBloom combines self-reports, activity participation, missed routines, 
                  streak changes, and weekly check-ins to identify wellness patterns.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-2">
                  🤝
                </div>
                <CardTitle className="text-foreground">Connects to Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  When repeated concern patterns appear, MindBloom recommends a supportive 
                  counselor check-in instead of making a diagnosis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-2">
                  🔒
                </div>
                <CardTitle className="text-foreground">Keeps Privacy First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  MindBloom uses engagement patterns, not invasive surveillance. Teachers see 
                  class-level trends, while counselors review individual support alerts.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Built for Daily Practice */}
        <section className="mt-24 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Built for Daily Practice
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Making wellness skills a regular habit, not a crisis response
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center text-2xl mb-2">
                  🛡️
                </div>
                <CardTitle className="text-foreground">Practice Before Crisis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  MindBloom helps students practice breathing, mindfulness, grounding, and stress 
                  management regularly, not only when they are already overwhelmed.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center text-2xl mb-2">
                  🎮
                </div>
                <CardTitle className="text-foreground">Motivating for Teens</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Students earn Bloom Points, build streaks, grow BloomBird, unlock milestones, 
                  and contribute to team challenges.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center text-2xl mb-2">
                  🏫
                </div>
                <CardTitle className="text-foreground">Classroom-Ready for Teachers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Teachers can launch short activities during class routines, before tests, 
                  after transitions, or at the start of the day.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center text-2xl mb-2">
                  🌙
                </div>
                <CardTitle className="text-foreground">Works Beyond the School Day</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Students can continue activities individually outside class while still 
                  contributing to weekly goals and personal progress.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Regular Practice Matters */}
        <section className="mt-24 max-w-3xl mx-auto">
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground">Why Regular Practice Matters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground text-lg">
                MindBloom encourages students to practice skills before they are distressed, 
                because breathing, mindfulness, grounding, and relaxation are most useful 
                when they become familiar habits.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* School Day Use Cases */}
        <section className="mt-24 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            School Day Use Cases
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Practical moments when MindBloom fits naturally into the school day
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                    🌅
                  </div>
                  <CardTitle className="text-lg text-foreground">Start of Class</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Teacher launches a 2-minute Body Scan to help students settle in.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                    📝
                  </div>
                  <CardTitle className="text-lg text-foreground">Before a Test</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Teacher launches Box Breathing to help students manage stress.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                    🍽️
                  </div>
                  <CardTitle className="text-lg text-foreground">After Lunch</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Class completes Look for Green to refocus.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                    🏠
                  </div>
                  <CardTitle className="text-lg text-foreground">Student Solo Practice</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Student A completes Sensory Countdown outside class and keeps their streak.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                    💬
                  </div>
                  <CardTitle className="text-lg text-foreground">Counselor Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Counselor reviews repeated disengagement patterns and plans a supportive check-in.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer Note */}
        <div className="text-center mt-24 text-sm text-muted-foreground space-y-2">
          <p className="italic">MindBloom gamifies participation, not mental health.</p>
          <p>Built with privacy and student wellbeing in mind.</p>
        </div>
      </main>
    </div>
  )
}
