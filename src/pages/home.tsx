import { Link } from "react-router-dom"
import { ArrowRight, Terminal, Code2, Github, Linkedin, MessageSquare } from "lucide-react"
import he4rtLogo from "@/assets/he4rt-logo.png"

export default function HomePage() {
  return (
    <div className="container min-h-screen mx-auto px-4 py-12">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mb-24 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-metal-800 border border-metal-700 text-sm text-steel-blue-light mb-4">
          <Terminal className="w-4 h-4" />
          <span>Aprenda de graça</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-metal-100 max-w-4xl">
         Aprenda com o melhor que existe na <span className="text-transparent bg-clip-text bg-gradient-to-r from-steel-blue-light to-cyan-accent">web</span>.
        </h1>

        <p className="text-lg md:text-xl text-metal-300 max-w-2xl leading-relaxed">
          Uma coleção de conteúdos gratuitos e bem selecionados para guiar seu aprendizado em programação, do básico até a construção de aplicações. Recursos que realmente ajudam quem está aprendendo de forma autodidata.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link 
            to="/plano-de-estudos" 
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all bg-steel-blue rounded-lg hover:bg-steel-blue-light hover:text-white hover:shadow-lg hover:shadow-steel-blue/20 group hover:no-underline"
          >
            Plano de Estudos
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link 
            to="/tecnologias" 
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-metal-200 transition-all bg-metal-800 border border-metal-700 rounded-lg hover:bg-metal-700 hover:border-metal-600 hover:no-underline"
          >
            Explorar Tecnologias
          </Link>
        </div>
      </section>

      {/* About & Community Grid */}
      <section className="grid md:grid-cols-2 gap-8 mb-24">
        {/* About Card */}
        <div className="p-8 rounded-2xl bg-metal-900 border border-metal-800 hover:border-metal-700 transition-colors flex flex-col h-full">
          <div className="w-12 h-12 bg-metal-800 rounded-lg flex items-center justify-center mb-6">
            <Code2 className="w-6 h-6 text-emerald-accent" />
          </div>
          <h2 className="text-2xl font-bold text-metal-100 mb-4">Quem sou eu</h2>
          <p className="text-metal-400 leading-relaxed mb-6 flex-grow">
            Sou o Clinton Rocha, Desenvolvedor Web desde 2023. Experiência principalmente com PHP e Laravel, mas também JavaScript, TypeScript e Node.js, além de outras tecnologias utilizadas no mercado. Membro ativo da He4rt Developers.
          </p>
          
          <div className="flex items-center gap-4 mt-auto pt-6 border-t border-metal-800">
            <a href="https://github.com/clintonrocha98" target="_blank" rel="noopener noreferrer" className="text-metal-400 hover:text-white transition-colors">
              <Github className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/clintonrocha" target="_blank" rel="noopener noreferrer" className="text-metal-400 hover:text-white transition-colors">
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Community Card */}
        <div className="p-8 rounded-2xl bg-metal-900 border border-metal-800 hover:border-metal-700 transition-colors flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
             <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
              <img src={he4rtLogo} alt="He4rt Developers Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded bg-rose-accent/10 text-rose-accent border border-rose-accent/20">
              He4rt Developers
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-metal-100 mb-4">A Comunidade</h2>
          <p className="text-metal-400 leading-relaxed mb-6 flex-grow">
            A He4rt Developers é uma comunidade de desenvolvedores com o intuito de promover aulões, mentorias e debates sobre tecnologias em geral! 👨🏻‍💻
          </p>
          
          <div className="flex items-center gap-4 mt-auto pt-6 border-t border-metal-800">
            <a href="https://github.com/he4rt/" target="_blank" rel="noopener noreferrer" className="text-metal-400 hover:text-white transition-colors">
              <Github className="w-6 h-6" />
              <span className="sr-only">GitHub He4rt</span>
            </a>
            <a href="https://discord.gg/xJNRcM4h" target="_blank" rel="noopener noreferrer" className="text-metal-400 hover:text-white transition-colors">
              <MessageSquare className="w-6 h-6" />
              <span className="sr-only">Discord He4rt</span>
            </a>
             <a href="https://www.instagram.com/heartdevs/" target="_blank" rel="noopener noreferrer" className="text-metal-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span className="sr-only">Instagram He4rt</span>
            </a>
             <a href="https://x.com/He4rtDevs/" target="_blank" rel="noopener noreferrer" className="text-metal-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              <span className="sr-only">Twitter He4rt</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
