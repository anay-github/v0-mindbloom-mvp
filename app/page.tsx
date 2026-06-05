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

          {/* Hero Statement */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            MindBloom helps students build daily wellness habits through interactive activities, 
            teamwork, and supportive progress tracking.
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

        {/* Footer Note */}
        <div className="text-center mt-16 text-sm text-muted-foreground">
          <p>Built with privacy and student wellbeing in mind.</p>
        </div>
      </main>
    </div>
  )
}
