import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header";
import { AppLayout } from "./components/layout";
import { SidebarProvider } from "./contexts/sidebar-provider";
import { Skeleton } from "./components/ui/skeleton";
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
import GuiaHubPage from "./pages/guia/guia-hub";

const CurriculoPage = lazy(() => import("./pages/guia/curriculo"));

function RoteamentoComLayout() {
  const { pathname } = useLocation()

  return (
    <AppLayout wide={pathname === '/guia/curriculo'}>
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
        <Route path="/guia" element={<GuiaHubPage />} />
        <Route
          path="/guia/curriculo"
          element={
            <Suspense
              fallback={
                <div className="mx-auto w-full max-w-[800px] space-y-4 py-10">
                  <Skeleton variant="text" width="40%" height={32} />
                  <Skeleton variant="rectangular" height={600} />
                </div>
              }
            >
              <CurriculoPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <Header />
        <RoteamentoComLayout />
      </SidebarProvider>
    </BrowserRouter>
  )
}

export default App;
