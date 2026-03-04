import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import HomePage from "./pages/home";
import TechnologiesPage from "./pages/technologies";
import Footer from "./components/footer";
import ResourcesPage from "./pages/resources";
import NotFound from "./pages/not-found";
import ArticlesPage from "./pages/articles";
import TechnologyMdxPage from "./pages/technology-mdx";

function App() {

  return (
    <>
      <Header />
      <main className="h-auto bg-gradient-to-b from-slate-50 to-slate-100 py-10">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tecnologias" element={<TechnologiesPage />} />
            <Route path="/tecnologias/:nome" element={<TechnologyMdxPage />} />
            <Route path="/recursos" element={<ResourcesPage />} />
            <Route path="/artigos" element={<ArticlesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </main>
    </>

  )
}

export default App;
