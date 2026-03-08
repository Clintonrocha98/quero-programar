import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import { AppLayout } from "./components/layout";
import { SidebarProvider } from "./contexts/sidebar-provider";
import HomePage from "./pages/home";
import TechnologiesPage from "./pages/technologies-list";
import ResourcesPage from "./pages/resources";
import NotFound from "./pages/not-found";
import ArticlesPage from "./pages/articles";
import StudyPlanPage from "./pages/study-plan";
import TechnologyDetailsPage from "./pages/technology-details";
import DebugGuidePage from "./pages/debug-guide";
import FourNoobsPage from "./pages/4noobs/4noobs-list";
import FourNoobsCategoryPage from "./pages/4noobs/4noobs-details";

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <Header />
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tecnologias" element={<TechnologiesPage />} />
            <Route path="/plano-de-estudos" element={<StudyPlanPage />} />
            <Route path="/tecnologias/:nome" element={<TechnologyDetailsPage />} />
            <Route path="/recursos" element={<ResourcesPage />} />
            <Route path="/artigos" element={<ArticlesPage />} />
            <Route path="/como-debugar" element={<DebugGuidePage />} />
            <Route path="/he4rt/4noobs" element={<FourNoobsPage />} />
            <Route path="/he4rt/4noobs/:categoryId" element={<FourNoobsCategoryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </SidebarProvider>
    </BrowserRouter>
  )
}

export default App;
