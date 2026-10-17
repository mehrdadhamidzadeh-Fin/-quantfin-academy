import { useState } from "react";
import { AppProvider } from "./context/AppContext";
import { Header } from "./components/Header";
import { BottomNav, type Tab } from "./components/BottomNav";
import { UpgradeModal } from "./components/UpgradeModal";
import { Dashboard } from "./tabs/Dashboard";
import { Courses } from "./tabs/Courses";
import { Exam } from "./tabs/Exam";
import { Calculator } from "./tabs/Calculator";
import { Formulas } from "./tabs/Formulas";

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [pendingLessonId, setPendingLessonId] = useState<string | null>(null);

  const handleLessonClick = (lessonId: string) => {
    setPendingLessonId(lessonId);
    setActiveTab("courses");
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab !== "courses") setPendingLessonId(null);
  };

  return (
    <div className="min-h-screen bg-bg-base text-gray-200">
      <Header onUpgradeClick={() => setUpgradeOpen(true)} />

      <main className="mx-auto max-w-2xl pb-24 min-h-[calc(100vh-57px)]">
        {activeTab === "dashboard" && (
          <Dashboard
            onNavigate={handleTabChange}
            onLessonClick={handleLessonClick}
            onUpgradeClick={() => setUpgradeOpen(true)}
          />
        )}
        {activeTab === "courses" && (
          <Courses
            onUpgradeClick={() => setUpgradeOpen(true)}
            initialLessonId={pendingLessonId}
          />
        )}
        {activeTab === "exam" && <Exam onUpgradeClick={() => setUpgradeOpen(true)} />}
        {activeTab === "calculator" && <Calculator />}
        {activeTab === "formulas" && <Formulas />}
      </main>

      <BottomNav active={activeTab} onChange={handleTabChange} />

      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
