import Nav from '@/components/Nav'
import Hero from '@/components/sections/Hero'
import TextScroll from '@/components/TextScroll'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Certifications from '@/components/sections/Certifications'
import Education from '@/components/sections/Education'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <TextScroll />
      <About />
      <Experience />
      <Projects />
      <Certifications />
      <Education />
      <Contact />
    </main>
  )
}
