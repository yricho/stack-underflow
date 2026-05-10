import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuestionDetail from "./components/question/QuestionDetail";
import QuestionList from "./components/question/QuestionList";
import RaportSekolahMingguDetail from "./components/raport/RaportSekolahMingguDetail";
import RaportSekolahMingguForm from "./components/raport/RaportSekolahMingguForm";
import RaportSekolahMingguList from "./components/raport/RaportSekolahMingguList";
import { AuthProvider } from "./context/AuthContext";
import { QuestionProvider } from "./context/QuestionContext";

const AppRoutes = () => {
  // const { user } = useAuth();

  // if (!user) return <LoginForm />;

  return (
    <Routes>
      <Route path="/" element={<RaportSekolahMingguList />} />
      <Route path="/createreport" element={<RaportSekolahMingguForm />} />
      <Route path="/report/:id" element={<RaportSekolahMingguDetail />} />
      <Route path="/report" element={<RaportSekolahMingguList />} />
      <Route path="/questions" element={<QuestionList />} />
      <Route path="/questions/:id" element={<QuestionDetail />} />
    </Routes>
  );
};

export default function App() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <AuthProvider>
        <QuestionProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </QuestionProvider>
      </AuthProvider>
    </div>
  );
}
