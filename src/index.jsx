import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { MessageSquare, Dumbbell, User, Home, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { Progress } from "@/components/ui/progress"

export default function FitnessApp() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('home')
  const [communityPosts, setCommunityPosts] = useState([
    { id: 1, user: "Alex", text: "วันนี้วิ่งไป 5 กิโล รู้สึกดีมาก!" },
    { id: 2, user: "Nina", text: "อยากได้เพื่อนออกกำลังด้วยกันแถวลาดพร้าวค่ะ" }
  ])
  const [newPost, setNewPost] = useState("")

  const [exerciseList, setExerciseList] = useState([
    { id: 1, name: "วิดพื้น", reps: 15, done: false },
    { id: 2, name: "ซิทอัพ", reps: 20, done: false },
    { id: 3, name: "แพลงก์", reps: 60, done: false }
  ])

  const toggleExerciseDone = (id) => {
    setExerciseList(exerciseList.map(ex => ex.id === id ? { ...ex, done: !ex.done } : ex))
  }

  const handlePost = () => {
    if (newPost.trim() !== "") {
      setCommunityPosts([...communityPosts, { id: Date.now(), user: user?.name || "Me", text: newPost }])
      setNewPost("")
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-400 to-cyan-600">
        <Card className="w-[380px] shadow-2xl rounded-2xl p-6 bg-white/90 backdrop-blur-md">
          <h1 className="text-2xl font-bold text-center mb-6">🏋️‍♀️ Fitness Connect</h1>
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
                <Input placeholder="ชื่อผู้ใช้" />
                <Input placeholder="อีเมล" />
                <Input placeholder="รหัสผ่าน" type="password" />
                <Button className="w-full">สมัครสมาชิก</Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-60 bg-sky-600 text-white flex flex-col justify-between py-6 px-4">
        <div>
          <h2 className="text-xl font-semibold mb-6 text-center">🏋️ Fitness Connect</h2>
          <nav className="space-y-3">
            <Button variant="ghost" className={`w-full justify-start text-white ${page==='home' && 'bg-sky-700'}`} onClick={() => setPage('home')}><Home className="mr-2"/>หน้าแรก</Button>
            <Button variant="ghost" className={`w-full justify-start text-white ${page==='exercise' && 'bg-sky-700'}`} onClick={() => setPage('exercise')}><Dumbbell className="mr-2"/>ออกกำลังกาย</Button>
            <Button variant="ghost" className={`w-full justify-start text-white ${page==='community' && 'bg-sky-700'}`} onClick={() => setPage('community')}><MessageSquare className="mr-2"/>คอมมู</Button>
            <Button variant="ghost" className={`w-full justify-start text-white ${page==='profile' && 'bg-sky-700'}`} onClick={() => setPage('profile')}><User className="mr-2"/>โปรไฟล์</Button>
          </nav>
        </div>
        <Button variant="ghost" className="justify-start text-white hover:bg-red-600" onClick={() => setUser(null)}>
          <LogOut className="mr-2"/> ออกจากระบบ
        </Button>
      </div>

      <div className="flex-1 p-8 space-y-6 overflow-y-auto">
        {page === 'home' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-2xl font-bold text-sky-700 mb-4">🏠 หน้าหลัก</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="shadow-md hover:shadow-lg transition p-4 text-center bg-gradient-to-br from-sky-200 to-cyan-200">
                <h3 className="text-lg font-semibold mb-2">สถิติวันนี้</h3>
                <p className="text-4xl font-bold text-sky-800">45 นาที</p>
                <p className="text-gray-600">เวลาออกกำลังกายทั้งหมด</p>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition p-4 text-center bg-gradient-to-br from-green-200 to-emerald-200">
                <h3 className="text-lg font-semibold mb-2">แคลอรี่ที่เผาผลาญ</h3>
                <p className="text-4xl font-bold text-green-800">320 kcal</p>
                <p className="text-gray-600">เป้าหมายประจำวัน</p>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition p-4 text-center bg-gradient-to-br from-yellow-200 to-amber-200">
                <h3 className="text-lg font-semibold mb-2">อันดับในคอมมู</h3>
                <p className="text-4xl font-bold text-amber-700">#12</p>
                <p className="text-gray-600">แรงจูงใจดีเยี่ยม!</p>
              </Card>
            </div>
          </motion.div>
        )}

        {page === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-2xl font-bold text-sky-700 mb-6">👤 โปรไฟล์ของฉัน</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex flex-col items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="avatar" className="w-32 h-32 rounded-full border-4 border-sky-400 shadow-md" />
                <Button className="mt-3 bg-sky-600 hover:bg-sky-700 text-white">เปลี่ยนรูป</Button>
              </div>
              <div className="flex-1 space-y-3">
                <p><strong>ชื่อผู้ใช้:</strong> {user.name}</p>
                <p><strong>อายุ:</strong> {user.age} ปี</p>
                <p><strong>เพศ:</strong> {user.gender}</p>
                <Card className="p-4 bg-gradient-to-br from-sky-100 to-cyan-100">
                  <h3 className="text-lg font-semibold mb-2 text-sky-800">สถิติสุขภาพ</h3>
                  <p>ออกกำลังต่อเนื่อง: <strong>5 วัน</strong></p>
                  <p>เวลารวมสัปดาห์นี้: <strong>180 นาที</strong></p>
                  <p>แคลอรี่ที่เผาผลาญรวม: <strong>1,450 kcal</strong></p>
                  <div className="mt-4">
                    <p className="mb-1">ความก้าวหน้าเป้าหมายรายสัปดาห์:</p>
                    <Progress value={70} className="w-full" />
                    <p className="text-sm text-gray-600 mt-1">70% ของเป้าหมาย</p>
                  </div>
                </Card>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
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
            <h2 className="text-2xl font-bold text-sky-700 mb-4">💬 คอมมูนิตี้ออกกำลังกาย</h2>
            <div className="bg-white rounded-2xl shadow-md p-4">
              <Input placeholder="แชร์ประสบการณ์หรือแรงบันดาลใจของคุณ..." value={newPost} onChange={e => setNewPost(e.target.value)} />
              <Button className="mt-2" onClick={handlePost}>โพสต์</Button>
            </div>
            <div className="mt-6 space-y-3">
              {communityPosts.map(post => (
                <Card key={post.id} className="bg-white shadow-sm">
                  <CardContent className="p-4">
                    <p className="font-semibold text-sky-800">{post.user}</p>
                    <p>{post.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {page === 'exercise' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h2 className="text-2xl font-bold text-sky-700 mb-4">💪 แผนการออกกำลังกายวันนี้</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exerciseList.map(ex => (
                <Card key={ex.id} className={`shadow-sm cursor-pointer ${ex.done ? 'bg-green-100 border-green-400' : 'bg-white'}`} onClick={() => toggleExerciseDone(ex.id)}>
                  <CardContent className="p-4 flex flex-col items-center">
                    <p className="text-lg font-semibold">{ex.name}</p>
                    <p className="text-gray-600">{ex.reps} ครั้ง</p>
                    <p className={`mt-2 text-sm ${ex.done ? 'text-green-700' : 'text-gray-400'}`}>{ex.done ? '✅ เสร็จแล้ว' : 'ยังไม่ทำ'}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6">
              <Button className="bg-sky-600 hover:bg-sky-700">เพิ่มท่าออกกำลังกาย</Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
