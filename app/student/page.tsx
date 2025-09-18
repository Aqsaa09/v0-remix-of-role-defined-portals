"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Leaf,
  Trophy,
  Gamepad2,
  Calendar,
  Monitor,
  Bell,
  Settings,
  ArrowLeft,
  Play,
  Target,
  Droplets,
  Utensils,
  CheckCircle,
  Clock,
  Star,
  X,
  RotateCcw,
  Gift,
  Zap,
  Award,
  TrendingUp,
  Users,
  Flame,
  Heart,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

const ecoGames = [
  {
    id: 1,
    title: "Water Conservation Challenge",
    description: "Learn traditional Indian water saving techniques from villages across India",
    points: 50,
    duration: "5 min",
    completed: false,
    icon: Droplets,
    lastScore: 0,
    bestScore: 0,
    timesPlayed: 0,
  },
  {
    id: 2,
    title: "Indian Meal Planner",
    description: "Plan sustainable Indian thali meals with regional specialties",
    points: 75,
    duration: "10 min",
    completed: true,
    icon: Utensils,
    lastScore: 85,
    bestScore: 95,
    timesPlayed: 3,
  },
  {
    id: 3,
    title: "Recycle Master",
    description: "Sort waste following Indian recycling practices and jugaad innovations",
    points: 60,
    duration: "7 min",
    completed: false,
    icon: Target,
    lastScore: 0,
    bestScore: 0,
    timesPlayed: 0,
  },
]

const achievements = [
  { id: 1, title: "First Steps", description: "Complete your first eco game", icon: Sparkles, unlocked: true },
  { id: 2, title: "Water Warrior", description: "Save 100L of water", icon: Droplets, unlocked: true },
  { id: 3, title: "Meal Master", description: "Plan 10 sustainable meals", icon: Utensils, unlocked: false },
  { id: 4, title: "Eco Champion", description: "Reach top 3 in leaderboard", icon: Trophy, unlocked: false },
]

const dailyStreak = {
  current: 7,
  best: 12,
  todayCompleted: true,
}

const weeklyChallenge = {
  title: "Reduce Food Waste Week",
  description:
    "Track and minimize your food waste for 7 days following Indian sustainable practices inspired by traditional Indian households",
  progress: 65,
  daysLeft: 3,
  participants: 2847,
  reward: 200,
}

const leaderboard = [
  { rank: 1, name: "Aryan Sharma", points: 1250, badge: "Eco Champion", college: "IIT Delhi" },
  { rank: 2, name: "Priya Patel", points: 1180, badge: "Green Warrior", college: "Delhi University" },
  { rank: 3, name: "Rahul Gupta", points: 1050, badge: "Sustainability Star", college: "JNU" },
  {
    rank: 4,
    name: "You (Raj Kumar)",
    points: 890,
    badge: "Eco Explorer",
    college: "Your College",
    isCurrentUser: true,
  },
  { rank: 5, name: "Anita Singh", points: 820, badge: "Green Beginner", college: "BHU Varanasi" },
]

const ecoReminders = [
  { id: 1, title: "Water Save Alarm", time: "08:00", active: true, type: "water" },
  { id: 2, title: "Meal Planning Reminder", time: "12:00", active: true, type: "meal" },
  { id: 3, title: "Eco Programs Alert", time: "18:00", active: false, type: "program" },
]

const waterQuizQuestions = [
  {
    id: 1,
    question: "Which traditional Indian water conservation technique involves building small earthen dams?",
    options: ["Johads", "Stepwells", "Tanks", "Canals"],
    correct: 0,
    explanation:
      "Johads are traditional rainwater harvesting structures built by communities in Rajasthan to collect and store rainwater.",
  },
  {
    id: 2,
    question: "What is the average water requirement per person per day according to WHO standards?",
    options: ["10 liters", "20 liters", "50 liters", "100 liters"],
    correct: 2,
    explanation: "WHO recommends 50 liters per person per day for drinking, cooking, and basic hygiene needs.",
  },
  {
    id: 3,
    question: "Which Indian state is famous for its stepwell (baoli) water conservation system?",
    options: ["Kerala", "Gujarat", "Punjab", "Assam"],
    correct: 1,
    explanation:
      "Gujarat is renowned for its intricate stepwells like Rani ki Vav, which were used for water storage and community gathering.",
  },
  {
    id: 4,
    question: "What percentage of water can be saved by fixing a dripping tap?",
    options: ["5%", "15%", "25%", "35%"],
    correct: 2,
    explanation: "A single dripping tap can waste up to 25% of household water consumption if left unfixed.",
  },
  {
    id: 5,
    question: "Which traditional practice helps in groundwater recharge?",
    options: ["Crop rotation", "Rainwater harvesting", "Drip irrigation", "All of the above"],
    correct: 3,
    explanation: "All these practices contribute to water conservation and groundwater recharge in different ways.",
  },
]

const teamMembers = [
  { id: 1, name: "Raj Kumar", avatar: "👨‍🎓", college: "Your College", isCurrentUser: true },
  { id: 2, name: "Priya Sharma", avatar: "👩‍🎓", college: "DU" },
  { id: 3, name: "Arjun Patel", avatar: "👨‍🎓", college: "IIT Delhi" },
  { id: 4, name: "Sneha Singh", avatar: "👩‍🎓", college: "JNU" },
]

export default function StudentPortal() {
  const [ecoMode, setEcoMode] = useState(false)
  const [screenFrozen, setScreenFrozen] = useState(false)
  const [freezeTimer, setFreezeTimer] = useState(0)
  const [animateStats, setAnimateStats] = useState(false)
  const [selectedGame, setSelectedGame] = useState<number | null>(null)
  const [gameInProgress, setGameInProgress] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [showAchievement, setShowAchievement] = useState(false)
  const [newAchievement, setNewAchievement] = useState<any>(null)

  const [quizMode, setQuizMode] = useState<"individual" | "team" | null>(null)
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [showAnswers, setShowAnswers] = useState(false)
  const [teamQuizTimer, setTeamQuizTimer] = useState(300) // 5 minutes
  const [teamAnswers, setTeamAnswers] = useState<{ [key: number]: number[] }>({})
  const [gameUnlocked, setGameUnlocked] = useState(false)
  const [waterGameStage, setWaterGameStage] = useState<"quiz" | "games" | null>(null)
  const [selectedWaterGame, setSelectedWaterGame] = useState<string | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (screenFrozen && freezeTimer > 0) {
      interval = setInterval(() => {
        setFreezeTimer((prev) => prev - 1)
      }, 1000)
    } else if (freezeTimer === 0) {
      setScreenFrozen(false)
    }
    return () => clearInterval(interval)
  }, [screenFrozen, freezeTimer])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (quizMode === "team" && quizStarted && teamQuizTimer > 0 && !quizCompleted) {
      interval = setInterval(() => {
        setTeamQuizTimer((prev) => {
          if (prev <= 1) {
            setQuizCompleted(true)
            calculateQuizScore()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [quizMode, quizStarted, teamQuizTimer, quizCompleted])

  useEffect(() => {
    setAnimateStats(true)
  }, [])

  const startScreenFreeze = (minutes: number) => {
    setFreezeTimer(minutes * 60)
    setScreenFrozen(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const startQuiz = (mode: "individual" | "team") => {
    setQuizMode(mode)
    setQuizStarted(true)
    setCurrentQuestion(0)
    setUserAnswers([])
    setQuizCompleted(false)
    setQuizScore(0)
    setShowAnswers(false)
    if (mode === "team") {
      setTeamQuizTimer(300)
      // Simulate team members' answers
      const simulatedAnswers: { [key: number]: number[] } = {}
      teamMembers.forEach((member) => {
        if (!member.isCurrentUser) {
          simulatedAnswers[member.id] = waterQuizQuestions.map(() => Math.floor(Math.random() * 4))
        }
      })
      setTeamAnswers(simulatedAnswers)
    }
  }

  const answerQuestion = (answerIndex: number) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = answerIndex
    setUserAnswers(newAnswers)

    if (currentQuestion < waterQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
      calculateQuizScore()
    }
  }

  const calculateQuizScore = () => {
    const correct = userAnswers.reduce((acc, answer, index) => {
      return acc + (answer === waterQuizQuestions[index]?.correct ? 1 : 0)
    }, 0)
    const percentage = Math.round((correct / waterQuizQuestions.length) * 100)
    setQuizScore(percentage)

    if (percentage >= 80) {
      setGameUnlocked(true)
    }
  }

  const resetQuiz = () => {
    setQuizMode(null)
    setQuizStarted(false)
    setCurrentQuestion(0)
    setUserAnswers([])
    setQuizCompleted(false)
    setQuizScore(0)
    setShowAnswers(false)
    setTeamQuizTimer(300)
    setGameUnlocked(false)
  }

  const formatQuizTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleOpenGame = (gameId: number) => {
    setSelectedGame(gameId)
    if (gameId === 1) {
      // Water Conservation Challenge
      setWaterGameStage("quiz")
    } else if (gameId === 2) {
      window.location.href = "/meal-planner"
    }
  }

  const handleCloseGame = () => {
    setSelectedGame(null)
    setGameInProgress(false)
    setGameScore(0)
    setWaterGameStage(null)
    setSelectedWaterGame(null)
    resetQuiz()
  }

  const startWaterGames = () => {
    setWaterGameStage("games")
  }

  const playWaterGame = (gameType: string) => {
    setSelectedWaterGame(gameType)
    setGameInProgress(true)
    setGameScore(0)

    // Simulate game progress
    const interval = setInterval(() => {
      setGameScore((prev) => {
        const newScore = prev + Math.floor(Math.random() * 15) + 5
        if (newScore >= 100) {
          clearInterval(interval)
          setGameInProgress(false)
          return 100
        }
        return newScore
      })
    }, 300)
  }

  const startGame = () => {
    setGameInProgress(true)
    setGameScore(0)
    // Simulate game progress
    const interval = setInterval(() => {
      setGameScore((prev) => {
        const newScore = prev + Math.floor(Math.random() * 10) + 5
        if (newScore >= 100) {
          clearInterval(interval)
          setGameInProgress(false)
          // Show achievement if first time completing
          const game = ecoGames.find((g) => g.id === selectedGame)
          if (game && !game.completed) {
            setNewAchievement(achievements[0])
            setShowAchievement(true)
            setTimeout(() => setShowAchievement(false), 3000)
          }
          return 100
        }
        return newScore
      })
    }, 200)
  }

  const replayGame = () => {
    startGame()
  }

  if (screenFrozen) {
    return (
      <div className="min-h-screen bg-green-50 dark:bg-green-950 flex items-center justify-center">
        <div className="text-center space-y-6 animate-pulse">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <Leaf className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-200">Screen Freeze Active</h1>
          <p className="text-green-600 dark:text-green-400">
            Take a break and help the environment! Your screen is saving energy.
          </p>
          <div className="text-4xl font-mono font-bold text-green-700 dark:text-green-300 animate-pulse">
            {formatTime(freezeTimer)}
          </div>
          <Button
            onClick={() => {
              setScreenFrozen(false)
              setFreezeTimer(0)
            }}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900 transition-all duration-300 hover:scale-105"
          >
            End Freeze Early
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {showAchievement && newAchievement && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-2xl">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold">Achievement Unlocked!</p>
                <p className="text-sm opacity-90">{newAchievement.title}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedGame && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {(() => {
                    const game = ecoGames.find((g) => g.id === selectedGame)
                    const Icon = game?.icon || Gamepad2
                    return (
                      <>
                        <Icon className="h-5 w-5" />
                        {game?.title}
                      </>
                    )
                  })()}
                </CardTitle>
                <CardDescription>{ecoGames.find((g) => g.id === selectedGame)?.description}</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCloseGame}
                className="hover:scale-110 transition-transform"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedGame === 1 && waterGameStage === "quiz" && (
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg">
                    <Droplets className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-xl font-bold mb-2">Water Conservation Quiz</h3>
                    <p className="text-muted-foreground mb-4">
                      Test your knowledge about traditional Indian water conservation techniques. Score 80% or higher to
                      unlock the fun water games!
                    </p>

                    {!quizStarted && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Button
                            onClick={() => startQuiz("individual")}
                            className="h-20 flex flex-col gap-2 hover:scale-105 transition-transform"
                          >
                            <Users className="h-6 w-6" />
                            <span>Individual Mode</span>
                            <span className="text-xs opacity-80">Take your time</span>
                          </Button>
                          <Button
                            onClick={() => startQuiz("team")}
                            variant="outline"
                            className="h-20 flex flex-col gap-2 hover:scale-105 transition-transform"
                          >
                            <Clock className="h-6 w-6" />
                            <span>Team Mode</span>
                            <span className="text-xs opacity-80">5 min time limit</span>
                          </Button>
                        </div>
                      </div>
                    )}

                    {quizStarted && !quizCompleted && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <Badge variant="outline">
                            Question {currentQuestion + 1} of {waterQuizQuestions.length}
                          </Badge>
                          {quizMode === "team" && (
                            <Badge variant="destructive" className="animate-pulse">
                              Time: {formatQuizTime(teamQuizTimer)}
                            </Badge>
                          )}
                        </div>

                        <Progress value={(currentQuestion / waterQuizQuestions.length) * 100} className="h-2" />

                        <div className="text-left space-y-4">
                          <h4 className="text-lg font-semibold">{waterQuizQuestions[currentQuestion]?.question}</h4>
                          <div className="grid grid-cols-1 gap-3">
                            {waterQuizQuestions[currentQuestion]?.options.map((option, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                className="justify-start h-auto p-4 hover:scale-102 transition-transform bg-transparent"
                                onClick={() => answerQuestion(index)}
                              >
                                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                                  {String.fromCharCode(65 + index)}
                                </span>
                                {option}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {quizCompleted && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <div
                            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                              quizScore >= 80 ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                            }`}
                          >
                            {quizScore >= 80 ? (
                              <Trophy className="h-10 w-10 text-green-600 dark:text-green-400 animate-bounce" />
                            ) : (
                              <X className="h-10 w-10 text-red-600 dark:text-red-400" />
                            )}
                          </div>
                          <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
                          <p className="text-3xl font-bold text-primary mb-2">{quizScore}%</p>
                          <p className="text-muted-foreground mb-4">
                            {quizScore >= 80
                              ? "Excellent! You've unlocked the water games!"
                              : "Good try! You need 80% to unlock the games. Try again!"}
                          </p>
                        </div>

                        {quizMode === "team" && (
                          <div className="space-y-4">
                            <h4 className="font-semibold">Team Leaderboard</h4>
                            <div className="space-y-2">
                              {teamMembers.map((member, index) => {
                                const memberScore = member.isCurrentUser
                                  ? quizScore
                                  : Math.floor(Math.random() * 40) + 60
                                return (
                                  <div
                                    key={member.id}
                                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className="text-2xl">{member.avatar}</span>
                                      <div>
                                        <p className="font-medium">{member.name}</p>
                                        <p className="text-xs text-muted-foreground">{member.college}</p>
                                      </div>
                                    </div>
                                    <Badge variant={memberScore >= 80 ? "default" : "secondary"}>{memberScore}%</Badge>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3 justify-center">
                          <Button
                            variant="outline"
                            onClick={() => setShowAnswers(!showAnswers)}
                            className="hover:scale-105 transition-transform"
                          >
                            {showAnswers ? "Hide" : "Show"} Answers
                          </Button>
                          <Button
                            variant="outline"
                            onClick={resetQuiz}
                            className="hover:scale-105 transition-transform bg-transparent"
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Retry Quiz
                          </Button>
                          {gameUnlocked && (
                            <Button
                              onClick={startWaterGames}
                              className="hover:scale-105 transition-transform animate-pulse"
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Play Water Games
                            </Button>
                          )}
                        </div>

                        {showAnswers && (
                          <div className="space-y-4 text-left">
                            <h4 className="font-semibold">Answer Review</h4>
                            {waterQuizQuestions.map((question, index) => (
                              <div key={index} className="p-4 border rounded-lg space-y-2">
                                <p className="font-medium">
                                  Q{index + 1}: {question.question}
                                </p>
                                <div className="grid grid-cols-1 gap-2">
                                  {question.options.map((option, optIndex) => (
                                    <div
                                      key={optIndex}
                                      className={`p-2 rounded text-sm flex items-center gap-2 ${
                                        optIndex === question.correct
                                          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                          : userAnswers[index] === optIndex && optIndex !== question.correct
                                            ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                                            : "bg-muted"
                                      }`}
                                    >
                                      {optIndex === question.correct && <CheckCircle className="h-4 w-4" />}
                                      {userAnswers[index] === optIndex && optIndex !== question.correct && (
                                        <X className="h-4 w-4" />
                                      )}
                                      <span>
                                        {String.fromCharCode(65 + optIndex)}. {option}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                <p className="text-sm text-muted-foreground italic">💡 {question.explanation}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedGame === 1 && waterGameStage === "games" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">Water Conservation Games</h3>
                    <p className="text-muted-foreground">Choose a fun water-themed game to play!</p>
                  </div>

                  {!selectedWaterGame && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card
                        className="cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => playWaterGame("droplet-catch")}
                      >
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Droplets className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h4 className="font-semibold mb-2">Droplet Catch</h4>
                          <p className="text-sm text-muted-foreground">
                            Catch falling raindrops to fill traditional water pots
                          </p>
                          <Badge className="mt-2">50 points</Badge>
                        </CardContent>
                      </Card>

                      <Card
                        className="cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => playWaterGame("pipe-puzzle")}
                      >
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Target className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <h4 className="font-semibold mb-2">Pipe Puzzle</h4>
                          <p className="text-sm text-muted-foreground">
                            Connect pipes to create efficient water distribution systems
                          </p>
                          <Badge className="mt-2">75 points</Badge>
                        </CardContent>
                      </Card>

                      <Card
                        className="cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => playWaterGame("stepwell-builder")}
                      >
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Award className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                          </div>
                          <h4 className="font-semibold mb-2">Stepwell Builder</h4>
                          <p className="text-sm text-muted-foreground">Design and build traditional Indian stepwells</p>
                          <Badge className="mt-2">100 points</Badge>
                        </CardContent>
                      </Card>

                      <Card
                        className="cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => playWaterGame("monsoon-manager")}
                      >
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Zap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <h4 className="font-semibold mb-2">Monsoon Manager</h4>
                          <p className="text-sm text-muted-foreground">Manage water resources during monsoon season</p>
                          <Badge className="mt-2">125 points</Badge>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {selectedWaterGame && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h4 className="text-lg font-semibold capitalize mb-2">{selectedWaterGame.replace("-", " ")}</h4>
                        <Button variant="outline" onClick={() => setSelectedWaterGame(null)} className="mb-4">
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Back to Games
                        </Button>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
                        {!gameInProgress && gameScore === 0 && (
                          <div className="space-y-4">
                            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                              <Play className="h-10 w-10 text-white" />
                            </div>
                            <p className="text-lg font-semibold">
                              Ready to play {selectedWaterGame.replace("-", " ")}?
                            </p>
                            <p className="text-muted-foreground">Test your water conservation skills!</p>
                          </div>
                        )}

                        {gameInProgress && (
                          <div className="space-y-4 w-full">
                            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto animate-spin">
                              <Droplets className="h-10 w-10 text-white" />
                            </div>
                            <p className="text-xl font-semibold">Playing {selectedWaterGame.replace("-", " ")}...</p>
                            <Progress value={gameScore} className="h-6" />
                            <p className="text-3xl font-bold text-blue-600">{gameScore}%</p>
                            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                              <span>💧 Water Saved: {Math.floor(gameScore * 0.5)}L</span>
                              <span>🏆 Points: {Math.floor(gameScore * 1.2)}</span>
                            </div>
                          </div>
                        )}

                        {!gameInProgress && gameScore === 100 && (
                          <div className="space-y-4">
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                              <Trophy className="h-10 w-10 text-white" />
                            </div>
                            <p className="text-2xl font-bold text-green-600">Fantastic!</p>
                            <p className="text-muted-foreground">
                              You mastered the {selectedWaterGame.replace("-", " ")} game!
                            </p>
                            <div className="flex items-center justify-center gap-4">
                              <div className="text-center">
                                <p className="text-2xl font-bold text-blue-600">50L</p>
                                <p className="text-xs text-muted-foreground">Water Saved</p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-yellow-600">120</p>
                                <p className="text-xs text-muted-foreground">Points Earned</p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-green-600">A+</p>
                                <p className="text-xs text-muted-foreground">Grade</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3 justify-center">
                        {!gameInProgress && gameScore === 0 && (
                          <Button
                            onClick={() => playWaterGame(selectedWaterGame)}
                            className="hover:scale-105 transition-transform"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Start Game
                          </Button>
                        )}

                        {!gameInProgress && gameScore === 100 && (
                          <Button
                            onClick={() => playWaterGame(selectedWaterGame)}
                            variant="outline"
                            className="hover:scale-105 transition-transform"
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Play Again
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedGame !== 1 && (
                <>
                  {/* Game Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-primary">
                        {ecoGames.find((g) => g.id === selectedGame)?.lastScore || 0}
                      </p>
                      <p className="text-xs text-muted-foreground">Last Score</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {ecoGames.find((g) => g.id === selectedGame)?.bestScore || 0}
                      </p>
                      <p className="text-xs text-muted-foreground">Best Score</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold">
                        {ecoGames.find((g) => g.id === selectedGame)?.timesPlayed || 0}
                      </p>
                      <p className="text-xs text-muted-foreground">Times Played</p>
                    </div>
                  </div>

                  {/* Game Area */}
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-lg p-8 text-center min-h-[200px] flex flex-col items-center justify-center">
                    {!gameInProgress && gameScore === 0 && (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                          <Play className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-muted-foreground">Ready to start your eco adventure?</p>
                      </div>
                    )}

                    {gameInProgress && (
                      <div className="space-y-4 w-full">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto animate-spin">
                          <Zap className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-lg font-semibold">Game in Progress...</p>
                        <Progress value={gameScore} className="h-4" />
                        <p className="text-2xl font-bold text-primary">{gameScore}%</p>
                      </div>
                    )}

                    {!gameInProgress && gameScore === 100 && (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                          <Trophy className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-xl font-bold text-green-600">Congratulations!</p>
                        <p className="text-muted-foreground">You completed the challenge!</p>
                        <div className="flex items-center justify-center gap-2">
                          <Gift className="h-5 w-5 text-yellow-500" />
                          <span className="font-semibold">
                            +{ecoGames.find((g) => g.id === selectedGame)?.points} points earned!
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Game Controls */}
                  <div className="flex gap-3 justify-center">
                    {!gameInProgress && gameScore === 0 && (
                      <Button onClick={startGame} className="hover:scale-105 transition-transform">
                        <Play className="h-4 w-4 mr-2" />
                        Start Game
                      </Button>
                    )}

                    {!gameInProgress && gameScore === 100 && (
                      <Button
                        onClick={replayGame}
                        variant="outline"
                        className="hover:scale-105 transition-transform bg-transparent"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Play Again
                      </Button>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <Image
              src="/images/recyclerun-logo.png"
              alt="RecycleRun Logo"
              width={32}
              height={32}
              className="rounded-lg transition-transform duration-300 hover:scale-110"
            />
            <div>
              <h1 className="text-lg font-bold text-primary">Student Portal</h1>
              <p className="text-xs text-muted-foreground">Welcome, Raj Kumar</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900 rounded-full">
              <Flame className="h-3 w-3 text-orange-500" />
              <span className="text-xs font-semibold text-orange-700 dark:text-orange-300">{dailyStreak.current}</span>
            </div>
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300 relative">
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-6">
          <Card
            className={`transition-all duration-500 ${ecoMode ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800 shadow-lg scale-105" : "hover:shadow-md hover:scale-102"}`}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center transition-all duration-300 ${ecoMode ? "animate-pulse scale-110" : ""}`}
                  >
                    <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Eco Mode</CardTitle>
                    <CardDescription>Activate eco-friendly features and sustainability tracking</CardDescription>
                  </div>
                </div>
                <Button
                  onClick={() => setEcoMode(!ecoMode)}
                  variant={ecoMode ? "default" : "outline"}
                  className={`transition-all duration-300 hover:scale-105 ${ecoMode ? "bg-green-600 hover:bg-green-700 animate-pulse shadow-lg" : ""}`}
                >
                  {ecoMode ? "Active" : "Activate"}
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  Daily Streak
                </CardTitle>
                <CardDescription>Keep your eco-habits going strong!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-orange-600">{dailyStreak.current}</p>
                      <p className="text-xs text-muted-foreground">Current</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-muted-foreground">{dailyStreak.best}</p>
                      <p className="text-xs text-muted-foreground">Best</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          i < dailyStreak.current ? "bg-orange-500 animate-pulse" : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Screen Freeze */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Screen Freeze
                </CardTitle>
                <CardDescription>Take breaks to reduce energy consumption and improve focus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    onClick={() => startScreenFreeze(5)}
                    variant="outline"
                    size="sm"
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    5 min
                  </Button>
                  <Button
                    onClick={() => startScreenFreeze(15)}
                    variant="outline"
                    size="sm"
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    15 min
                  </Button>
                  <Button
                    onClick={() => startScreenFreeze(30)}
                    variant="outline"
                    size="sm"
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    30 min
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5" />
                  Eco Games
                </CardTitle>
                <CardDescription>
                  Learn sustainability through interactive games inspired by Indian traditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ecoGames.map((game, index) => {
                    const Icon = game.icon
                    return (
                      <div
                        key={game.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-all duration-300 hover:scale-102 hover:shadow-md cursor-pointer"
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => handleOpenGame(game.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:rotate-12 transition-transform duration-300">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{game.title}</h4>
                            <p className="text-sm text-muted-foreground">{game.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs animate-pulse">
                                {game.points} pts
                              </Badge>
                              <span className="text-xs text-muted-foreground">{game.duration}</span>
                              {game.lastScore > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  Last: {game.lastScore}%
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {game.completed && <CheckCircle className="h-4 w-4 text-green-500 animate-bounce" />}
                          <Button
                            size="sm"
                            variant={game.completed ? "outline" : "default"}
                            className="hover:scale-105 transition-transform duration-300"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenGame(game.id)
                            }}
                          >
                            {game.completed ? "Replay" : "Play"}
                            <Play className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Challenge */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Weekly Eco Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">{weeklyChallenge.title}</h4>
                    <p className="text-sm text-muted-foreground">{weeklyChallenge.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{weeklyChallenge.progress}%</span>
                    </div>
                    <Progress value={weeklyChallenge.progress} className="h-3 transition-all duration-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {weeklyChallenge.daysLeft} days left
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {weeklyChallenge.participants.toLocaleString("en-IN")} participants
                      </span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 animate-pulse">
                      {weeklyChallenge.reward} pts reward
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
                <CardDescription>Your eco milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon
                    return (
                      <div
                        key={achievement.id}
                        className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                          achievement.unlocked
                            ? "bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800"
                            : "opacity-50"
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            achievement.unlocked ? "bg-yellow-100 dark:bg-yellow-900" : "bg-gray-100 dark:bg-gray-800"
                          }`}
                        >
                          <Icon
                            className={`h-4 w-4 ${
                              achievement.unlocked ? "text-yellow-600 dark:text-yellow-400" : "text-gray-400"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{achievement.title}</p>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                        {achievement.unlocked && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Eco Leaderboard */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Eco Leaderboard
                </CardTitle>
                <CardDescription>Top sustainability champions from Indian colleges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user, index) => (
                    <div
                      key={user.rank}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:scale-102 ${
                        user.isCurrentUser
                          ? "bg-primary/10 border border-primary/20 animate-pulse"
                          : "hover:bg-muted/50"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-transform duration-300 hover:scale-110 ${
                          user.rank === 1
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : user.rank === 2
                              ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                              : user.rank === 3
                                ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {user.rank === 1 && <Star className="h-4 w-4" />}
                        {user.rank !== 1 && user.rank}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-medium ${user.isCurrentUser ? "text-primary-foreground dark:text-primary" : ""}`}
                        >
                          {user.name}
                        </p>
                        <p
                          className={`text-xs ${user.isCurrentUser ? "text-primary-foreground/80 dark:text-primary/80" : "text-muted-foreground"}`}
                        >
                          {user.badge}
                        </p>
                        <p
                          className={`text-xs ${user.isCurrentUser ? "text-primary-foreground/80 dark:text-primary/80" : "text-muted-foreground"}`}
                        >
                          {user.college}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-medium ${user.isCurrentUser ? "text-primary-foreground dark:text-primary" : ""}`}
                        >
                          {user.points.toLocaleString("en-IN")}
                        </p>
                        <p
                          className={`text-xs ${user.isCurrentUser ? "text-primary-foreground/80 dark:text-primary/80" : "text-muted-foreground"}`}
                        >
                          points
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Eco Reminders */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Eco Reminders
                </CardTitle>
                <CardDescription>Set gentle alerts for eco-friendly habits and sustainable practices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ecoReminders.map((reminder, index) => (
                    <div
                      key={reminder.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-all duration-300 hover:scale-102"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            reminder.active ? "bg-green-500 animate-pulse" : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        />
                        <div>
                          <p className="font-medium text-sm">{reminder.title}</p>
                          <p className="text-xs text-muted-foreground">{reminder.time}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform duration-300">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Your Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    className={`flex justify-between items-center transition-all duration-500 ${animateStats ? "animate-fade-in" : ""}`}
                  >
                    <span className="text-sm flex items-center gap-2">
                      <Star className="h-3 w-3 text-yellow-500" />
                      Total Points
                    </span>
                    <span className="font-bold text-primary">890</span>
                  </div>
                  <div
                    className={`flex justify-between items-center transition-all duration-500 ${animateStats ? "animate-fade-in" : ""}`}
                    style={{ animationDelay: "100ms" }}
                  >
                    <span className="text-sm flex items-center gap-2">
                      <Gamepad2 className="h-3 w-3 text-blue-500" />
                      Games Completed
                    </span>
                    <span className="font-bold">12</span>
                  </div>
                  <div
                    className={`flex justify-between items-center transition-all duration-500 ${animateStats ? "animate-fade-in" : ""}`}
                    style={{ animationDelay: "200ms" }}
                  >
                    <span className="text-sm flex items-center gap-2">
                      <Trophy className="h-3 w-3 text-orange-500" />
                      Challenges Won
                    </span>
                    <span className="font-bold">3</span>
                  </div>
                  <div
                    className={`flex justify-between items-center transition-all duration-500 ${animateStats ? "animate-fade-in" : ""}`}
                    style={{ animationDelay: "300ms" }}
                  >
                    <span className="text-sm flex items-center gap-2">
                      <Leaf className="h-3 w-3 text-green-500" />
                      CO₂ Saved
                    </span>
                    <span className="font-bold text-green-600">24.5 kg</span>
                  </div>
                  <div
                    className={`flex justify-between items-center transition-all duration-500 ${animateStats ? "animate-fade-in" : ""}`}
                    style={{ animationDelay: "400ms" }}
                  >
                    <span className="text-sm flex items-center gap-2">
                      <Heart className="h-3 w-3 text-red-500" />
                      Lives Impacted
                    </span>
                    <span className="font-bold text-red-600">156</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
