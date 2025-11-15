import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { MessageSquare, Dumbbell, User, Home, LogOut, Plus, X, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { Progress } from "@/components/ui/progress"

export default function FitnessApp() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('home')
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    healthProblems: []
  })
  
  const [communityPosts, setCommunityPosts] = useState([
    { 
      id: 1, 
      user: "Alex", 
      avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      text: "วันนี้วิ่งไป 5 กิโล รู้สึกดีมาก! 💪",
      likes: 12,
      comments: [
        { user: "Nina", text: "เก่งมาก! สู้ๆนะคะ" },
        { user: "John", text: "ไปด้วยกันได้ไหม" }
      ],
      timestamp: "2 ชั่วโมงที่แล้ว"
    },
    { 
      id: 2, 
      user: "Nina", 
      avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png",
      text: "อยากได้เพื่อนออกกำลังด้วยกันแถวลาดพร้าวค่ะ 🏃‍♀️",
      likes: 8,
      comments: [
        { user: "Mike", text: "ผมอยู่แถวนั้นเหมือนกัน!" }
      ],
      timestamp: "5 ชั่วโมงที่แล้ว"
    }
  ])
  const [newPost, setNewPost] = useState("")
  const [showComments, setShowComments] = useState({})
  const [commentInput, setCommentInput] = useState({})

  const [exerciseList, setExerciseList] = useState([
    { id: 1, name: "เดินเบาๆ", reps: "10 นาที", done: false, calories: 55, icon: "🏃" },
    { id: 2, name: "ปั่นจักรยาน", reps: "30 นาที", done: false, calories: 150, icon: "🚲" },
    { id: 3, name: "โยคะ", reps: "15 นาที", done: false, calories: 75, icon: "🤸‍♀️" },
  ])
  
  const [showAddExercise, setShowAddExercise] = useState(false)
  const [newExercise, setNewExercise] = useState({ name: '', reps: '', calories: '', icon: '🏋️' })

  const toggleExerciseDone = (id) => {
    setExerciseList(exerciseList.map(ex => ex.id === id ? { ...ex, done: !ex.done } : ex))
  }

  const addExercise = () => {
    if (newExercise.name && newExercise.reps) {
      setExerciseList([...exerciseList, {
        id: Date.now(),
        name: newExercise.name,
        reps: newExercise.reps,
        calories: parseInt(newExercise.calories) || 0,
        icon: newExercise.icon,
        done: false
      }])
      setNewExercise({ name: '', reps: '', calories: '', icon: '🏋️' })
      setShowAddExercise(false)
    }
  }

  const deleteExercise = (id) => {
    setExerciseList(exerciseList.filter(ex => ex.id !== id))
  }

  const handlePost = () => {
    if (newPost.trim() !== "") {
      setCommunityPosts([{
        id: Date.now(),
        user: user?.name || "Me",
        avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        text: newPost,
        likes: 0,
        comments: [],
        timestamp: "เมื่อสักครู่"
      }, ...communityPosts])
      setNewPost("")
    }
  }

  const likePost = (postId) => {
    setCommunityPosts(communityPosts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  const toggleComments = (postId) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }))
  }

  const addComment = (postId) => {
    const comment = commentInput[postId]
    if (comment && comment.trim() !== "") {
      setCommunityPosts(communityPosts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, { user: user?.name || "Me", text: comment }] }
          : post
      ))
      setCommentInput({ ...commentInput, [postId]: "" })
    }
  }

  const totalCaloriesBurned = exerciseList.filter(ex => ex.done).reduce((sum, ex) => sum + ex.calories, 0)
  const exerciseProgress = exerciseList.length > 0 ? (exerciseList.filter(ex => ex.done).length / exerciseList.length) * 100 : 0

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-400 to-cyan-600 p-4">
        <Card className="w-full max-w-md shadow-2xl rounded-2xl p-6 bg-white/90 backdrop-blur-md">
          <img src="src\assets\image.png"></img>
          <h1 className="text-2xl font-bold text-center mb-6">CharaFit</h1>
          <Tabs defaultValue="login">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">เข้าสู่ระบบ</TabsTrigger>
              <TabsTrigger value="register">สมัครสมาชิก</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <div className="space-y-3 mt-4">
                <Input placeholder="อีเมล" />
                <Input placeholder="รหัสผ่าน" type="password" />
                <Button onClick={() => setUser({ name: "ผู้ใช้ใหม่", age: 25, gender: 'ชาย' })} className="w-full">เข้าสู่ระบบ</Button>
              </div>
            </TabsContent>
            <TabsContent value="register">
              <div className="space-y-3 mt-4">
                <Input 
                  placeholder="ชื่อผู้ใช้" 
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                />
                <Input 
                  placeholder="อีเมล" 
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                />
                <Input 
                  placeholder="รหัสผ่าน" 
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                />
                <Input 
                  placeholder="อายุ" 
                  type="number"
                  value={registerForm.age}
                  onChange={(e) => setRegisterForm({...registerForm, age: e.target.value})}
                />
                
                <div>
                  <p className="text-sm font-semibold mb-2 text-gray-700">เลือกเพศ</p>
                  <div className="flex gap-3">
                    <Button 
                      variant={registerForm.gender === 'ชาย' ? 'default' : 'outline'}
                      onClick={() => setRegisterForm({...registerForm, gender: 'ชาย'})}
                      className="flex-1"
                    >
                      ชาย
                    </Button>
                    <Button 
                      variant={registerForm.gender === 'หญิง' ? 'default' : 'outline'}
                      onClick={() => setRegisterForm({...registerForm, gender: 'หญิง'})}
                      className="flex-1"
                    >
                      หญิง
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2 text-gray-700">ปัญหาสุขภาพ</p>
                  <div className="space-y-2">
                    {['โรคเกาส์', 'โรคความดัน', 'โรคเบาหวาน'].map(problem => (
                      <label key={problem} className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input 
                          type="checkbox"
                          checked={registerForm.healthProblems.includes(problem)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setRegisterForm({...registerForm, healthProblems: [...registerForm.healthProblems, problem]})
                            } else {
                              setRegisterForm({...registerForm, healthProblems: registerForm.healthProblems.filter(h => h !== problem)})
                            }
                          }}
                        />
                        <span>{problem}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    if (registerForm.name && registerForm.email && registerForm.password && registerForm.age && registerForm.gender) {
                      setUser({ 
                        name: registerForm.name, 
                        age: parseInt(registerForm.age), 
                        gender: registerForm.gender,
                        healthProblems: registerForm.healthProblems
                      })
                      setRegisterForm({ name: '', email: '', password: '', age: '', gender: '', healthProblems: [] })
                    } else {
                      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
                    }
                  }}
                  className="w-full"
                >
                  สมัครสมาชิก
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-60 bg-sky-600 text-white flex-col justify-between py-6 px-4">
        <div>
          <h2 className="text-xl font-semibold mb-6 text-center">🏋️ CharaFit</h2>
          <nav className="space-y-3">
            <Button variant="ghost" className={`w-full justify-start text-white ${page==='home' && 'bg-sky-700'}`} onClick={() => setPage('home')}><Home className="mr-2"/>หน้าแรก</Button>
            <Button variant="ghost" className={`w-full justify-start text-white ${page==='exercise' && 'bg-sky-700'}`} onClick={() => setPage('exercise')}><Dumbbell className="mr-2"/>ออกกำลังกาย</Button>
            <Button variant="ghost" className={`w-full justify-start text-white ${page==='community' && 'bg-sky-700'}`} onClick={() => setPage('community')}><MessageSquare className="mr-2"/>คอมมูนิตี้</Button>
            <Button variant="ghost" className={`w-full justify-start text-white ${page==='profile' && 'bg-sky-700'}`} onClick={() => setPage('profile')}><User className="mr-2"/>โปรไฟล์</Button>
          </nav>
        </div>
        <Button variant="ghost" className="justify-start text-white hover:bg-red-600" onClick={() => setUser(null)}>
          <LogOut className="mr-2"/> ออกจากระบบ
        </Button>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-sky-600 text-white flex justify-around items-center py-3 px-2 z-50 shadow-lg">
        <Button variant="ghost" className={`flex-col h-auto py-2 px-3 ${page==='home' && 'bg-sky-700'}`} onClick={() => setPage('home')}>
          <Home className="h-5 w-5"/>
          <span className="text-xs mt-1">หน้าแรก</span>
        </Button>
        <Button variant="ghost" className={`flex-col h-auto py-2 px-3 ${page==='exercise' && 'bg-sky-700'}`} onClick={() => setPage('exercise')}>
          <Dumbbell className="h-5 w-5"/>
          <span className="text-xs mt-1">ออกกำลัง</span>
        </Button>
        <Button variant="ghost" className={`flex-col h-auto py-2 px-3 ${page==='community' && 'bg-sky-700'}`} onClick={() => setPage('community')}>
          <MessageSquare className="h-5 w-5"/>
          <span className="text-xs mt-1">คอมมู</span>
        </Button>
        <Button variant="ghost" className={`flex-col h-auto py-2 px-3 ${page==='profile' && 'bg-sky-700'}`} onClick={() => setPage('profile')}>
          <User className="h-5 w-5"/>
          <span className="text-xs mt-1">โปรไฟล์</span>
        </Button>
        <Button variant="ghost" className="flex-col h-auto py-2 px-3" onClick={() => setUser(null)}>
          <LogOut className="h-5 w-5"/>
          <span className="text-xs mt-1">ออก</span>
        </Button>
      </div>

      <div className="flex-1 p-4 md:p-8 space-y-6 overflow-y-auto pb-24 md:pb-8">
        {page === 'home' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-xl md:text-2xl font-bold text-sky-700 mb-4">🏠 หน้าหลัก</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <Card className="shadow-md hover:shadow-lg transition p-4 text-center bg-gradient-to-br from-sky-200 to-cyan-200">
                <h3 className="text-lg font-semibold mb-2">สถิติวันนี้</h3>
                <p className="text-4xl font-bold text-sky-800">{Math.round(exerciseProgress)} %</p>
                <p className="text-gray-600">ความสำเร็จในการออกกำลังกาย</p>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition p-4 text-center bg-gradient-to-br from-green-200 to-emerald-200">
                <h3 className="text-lg font-semibold mb-2">แคลอรี่ที่เผาผลาญ</h3>
                <p className="text-4xl font-bold text-green-800">{totalCaloriesBurned} kcal</p>
                <p className="text-gray-600">เป้าหมายประจำวัน</p>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition p-4 text-center bg-gradient-to-br from-yellow-200 to-amber-200">
                <h3 className="text-lg font-semibold mb-2">อันดับในคอมมู</h3>
                <p className="text-4xl font-bold text-amber-700">#12</p>
                <p className="text-gray-600">แรงจูงใจดีเยี่ยม!</p>
              </Card>
            </div>
            
            <Card className="mt-6 p-4 md:p-6 bg-gradient-to-br from-purple-100 to-pink-100">
              <h3 className="text-lg font-semibold mb-3 text-purple-800">ความคืบหน้าประจำสัปดาห์</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>การออกกำลังกาย</span>
                    <span>{exerciseList.filter(ex => ex.done).length}/{exerciseList.length} ท่า</span>
                  </div>
                  <Progress value={exerciseProgress} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>เป้าหมายแคลอรี่</span>
                    <span>{totalCaloriesBurned}/500 kcal</span>
                  </div>
                  <Progress value={(totalCaloriesBurned/500)*100} className="h-3" />
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {page === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-xl md:text-2xl font-bold text-sky-700 mb-6">โปรไฟล์ของฉัน</h2>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              <div className="flex flex-col items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="avatar" className="w-32 h-32 rounded-full border-4 border-sky-400 shadow-md" />
                <Button className="mt-3 bg-sky-600 hover:bg-sky-700 text-white">เปลี่ยนรูป</Button>
              </div>
              <div className="flex-1 space-y-3 w-full">
                <p><strong>ชื่อผู้ใช้:</strong> {user.name}</p>
                <p><strong>อายุ:</strong> {user.age} ปี</p>
                <p><strong>เพศ:</strong> {user.gender}</p>
                <p><strong>ปัญหาสุขภาพ:</strong> {user.healthProblems && user.healthProblems.length > 0 ? user.healthProblems.join(', ') : 'ไม่มี'}</p>
                <Card className="p-4 bg-gradient-to-br from-sky-100 to-cyan-100">
                  <h3 className="text-lg font-semibold mb-2 text-sky-800">สถิติสุขภาพ</h3>
                  <p>ออกกำลังต่อเนื่อง: <strong>5 วัน</strong></p>
                  <p>เวลารวมสัปดาห์นี้: <strong>180 นาที</strong></p>
                  <p>แคลอรี่ที่เผาผลาญรวม: <strong>{totalCaloriesBurned} kcal</strong></p>
                  <div className="mt-4">
                    <p className="mb-1">ความก้าวหน้าเป้าหมายรายสัปดาห์:</p>
                    <Progress value={70} className="w-full" />
                    <p className="text-sm text-gray-600 mt-1">70% ของเป้าหมาย</p>
                  </div>
                </Card>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 text-center shadow-sm">
                <p className="text-3xl">🥇</p>
                <p className="font-semibold text-sky-700 mt-2">มือใหม่ไฟแรง</p>
              </Card>
              <Card className="p-4 text-center shadow-sm">
                <p className="text-3xl">💪</p>
                <p className="font-semibold text-sky-700 mt-2">ออกครบ 7 วันติด</p>
              </Card>
              <Card className="p-4 text-center shadow-sm">
                <p className="text-3xl">🔥</p>
                <p className="font-semibold text-sky-700 mt-2">เบิร์น 1000 kcal!</p>
              </Card>
            </div>
          </motion.div>
        )}

        {page === 'community' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-xl md:text-2xl font-bold text-sky-700 mb-4">คอมมูนิตี้ออกกำลังกาย</h2>
            
            {/* Post Creation */}
            <Card className="bg-white rounded-2xl shadow-md p-4 mb-6">
              <div className="flex gap-3">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" className="w-10 h-10 rounded-full" alt="avatar" />
                <div className="flex-1">
                  <Input 
                    placeholder="แชร์ประสบการณ์หรือแรงบันดาลใจของคุณ..." 
                    value={newPost} 
                    onChange={e => setNewPost(e.target.value)}
                    className="mb-2"
                  />
                  <Button className="w-full md:w-auto" onClick={handlePost}>
                    <Send className="mr-2 h-4 w-4" /> โพสต์
                  </Button>
                </div>
              </div>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4">
              {communityPosts.map(post => (
                <Card key={post.id} className="bg-white shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex gap-3 mb-3">
                      <img src={post.avatar} className="w-12 h-12 rounded-full" alt="avatar" />
                      <div className="flex-1">
                        <p className="font-semibold text-sky-800">{post.user}</p>
                        <p className="text-xs text-gray-500">{post.timestamp}</p>
                      </div>
                    </div>
                    <p className="mb-3 text-gray-800">{post.text}</p>
                    
                    {/* Like and Comment Buttons */}
                    <div className="flex gap-4 pb-3 border-b">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => likePost(post.id)}
                        className="text-gray-600 hover:text-sky-600"
                      >
                        ❤️ ถูกใจ ({post.likes})
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleComments(post.id)}
                        className="text-gray-600 hover:text-sky-600"
                      >
                        💬 ความคิดเห็น ({post.comments.length})
                      </Button>
                    </div>

                    {/* Comments Section */}
                    {showComments[post.id] && (
                      <div className="mt-3 space-y-2">
                        {post.comments.map((comment, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-2">
                            <p className="font-semibold text-sm text-sky-700">{comment.user}</p>
                            <p className="text-sm text-gray-700">{comment.text}</p>
                          </div>
                        ))}
                        <div className="flex gap-2 mt-2">
                          <Input 
                            placeholder="เขียนความคิดเห็น..."
                            value={commentInput[post.id] || ""}
                            onChange={(e) => setCommentInput({...commentInput, [post.id]: e.target.value})}
                            size="sm"
                          />
                          <Button size="sm" onClick={() => addComment(post.id)}>
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {page === 'exercise' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-sky-700">แผนการออกกำลังกายวันนี้</h2>
              <Button 
                className="bg-sky-600 hover:bg-sky-700"
                onClick={() => setShowAddExercise(!showAddExercise)}
              >
                <Plus className="mr-2 h-4 w-4" /> เพิ่มท่า
              </Button>
            </div>

            {/* Add Exercise Form */}
            {showAddExercise && (
              <Card className="p-4 mb-6 bg-sky-50">
                <h3 className="font-semibold mb-3">เพิ่มท่าออกกำลังกายใหม่</h3>
                <div className="space-y-3">
                  <Input 
                    placeholder="ชื่อท่า (เช่น วิ่ง, ว่ายน้ำ)" 
                    value={newExercise.name}
                    onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                  />
                  <Input 
                    placeholder="จำนวน/เวลา (เช่น 20 ครั้ง, 30 นาที)" 
                    value={newExercise.reps}
                    onChange={(e) => setNewExercise({...newExercise, reps: e.target.value})}
                  />
                  <Input 
                    placeholder="แคลอรี่ที่เผาผลาญ (kcal)" 
                    type="number"
                    value={newExercise.calories}
                    onChange={(e) => setNewExercise({...newExercise, calories: e.target.value})}
                  />
                  <div className="flex gap-2">
                    <Input 
                      placeholder="ไอคอน (เช่น 🏃)" 
                      value={newExercise.icon}
                      onChange={(e) => setNewExercise({...newExercise, icon: e.target.value})}
                      className="w-24"
                    />
                    <Button onClick={addExercise} className="flex-1">บันทึก</Button>
                    <Button variant="outline" onClick={() => setShowAddExercise(false)}>ยกเลิก</Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Exercise Progress */}
            <Card className="p-4 mb-6 bg-gradient-to-br from-green-100 to-emerald-100">
              <h3 className="font-semibold mb-2">ความคืบหน้าวันนี้</h3>
              <Progress value={exerciseProgress} className="mb-2" />
              <p className="text-sm text-gray-700">
                เสร็จแล้ว {exerciseList.filter(ex => ex.done).length} จาก {exerciseList.length} ท่า 
                ({Math.round(exerciseProgress)}%) | เผาผลาญ {totalCaloriesBurned} kcal
              </p>
            </Card>

            {/* Exercise List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exerciseList.map(ex => (
                <Card 
                  key={ex.id} 
                  className={`shadow-sm transition-all ${ex.done ? 'bg-green-100 border-2 border-green-400' : 'bg-white hover:shadow-md'}`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div 
                        className="flex-1 cursor-pointer" 
                        onClick={() => toggleExerciseDone(ex.id)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{ex.icon}</span>
                          <p className="text-lg font-semibold">{ex.name}</p>
                        </div>
                        <p className="text-gray-600 text-sm">{ex.reps}</p>
                        <p className="text-sky-600 text-sm font-medium">{ex.calories} kcal</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteExercise(ex.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div 
                      className={`mt-3 text-center py-2 rounded-lg cursor-pointer transition-colors ${
                        ex.done 
                          ? 'bg-green-200 text-green-800 font-semibold' 
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                      onClick={() => toggleExerciseDone(ex.id)}
                    >
                      {ex.done ? '✅ เสร็จแล้ว' : '⭕ ยังไม่ทำ'}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {exerciseList.length === 0 && (
              <Card className="p-8 text-center bg-gray-50">
                <p className="text-gray-500 mb-4">ยังไม่มีท่าออกกำลังกาย</p>
                <Button onClick={() => setShowAddExercise(true)} className="bg-sky-600">
                  <Plus className="mr-2 h-4 w-4" /> เพิ่มท่าแรก
                </Button>
              </Card>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}