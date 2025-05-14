'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/page/LandingPageNavbar"
import { motion } from "framer-motion"

export default function Home() {
  const router = useRouter()
  
  const handleNavigateSignIn = () => {
    router.push("/auth/signin")
  }
  
  const handleNavigateSignUp = () => {
    router.push("/auth/signup")
  }
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }
  
  return (
    <div className="flex flex-col min-h-screen justify-between bg-white dark:bg-black items-center">
      <Navbar />
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="flex flex-col items-center justify-center space-y-4 text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-900"
                variants={itemVariants}
              >
                <span className="mr-1">New!</span>
                <span className="font-medium">Put an announcement here 🎉</span>
              </motion.div>
              
              <motion.div 
                className="space-y-2"
                variants={itemVariants}
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your revolutionary<br />Next.js SaaS
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  This is a demo application built with Achromatic. It will save you time and effort building your next SaaS.
                </p>
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap items-center justify-center gap-4"
                variants={itemVariants}
              >
                <Button onClick={handleNavigateSignUp} size="lg" className="hover:cursor-pointer">
                  Start for free
                </Button>
                <Button variant="outline" size="lg" className="hover:cursor-pointer">
                  Talk to sales
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}