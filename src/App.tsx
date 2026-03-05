import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import HomePage from "./pages/home";
import TechnologiesPage from "./pages/technologies-list";
import Footer from "./components/footer";
import ResourcesPage from "./pages/resources";
import NotFound from "./pages/not-found";
import ArticlesPage from "./pages/articles";
import StudyPlanPage from "./pages/study-plan";
import TechnologyDetailsPage from "./pages/technology-details";

function App() {

  return (
    <>
      <Header />
      <main className="h-auto py-10">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tecnologias" element={<TechnologiesPage />} />
            <Route path="/plano-de-estudos" element={<StudyPlanPage />} />
            <Route path="/tecnologias/:nome" element={<TechnologyDetailsPage />} />
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
