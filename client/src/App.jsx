import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import FeaturesPage from './pages/FeaturesPage';
import GuestRedirect from './features/auth/GuestRedirect';
import Dashboard from './features/dashboard/Dashboard';
import GroupList from './features/groups/GroupList';
import GroupDetail from './features/groups/GroupDetail';
import ExpenseTracker from './features/expenses/ExpenseTracker';
import Layout from './components/layout/Layout';

// Page components Good
const DashboardPage = () => (
  <Layout>
    <Dashboard />
  </Layout>
);

const GroupsPage = () => (
  <Layout useTopHeader={true}>
    <GroupList />
  </Layout>
);

const GroupDetailPage = () => (
  <Layout>
    <GroupDetail />
  </Layout>
);

const ExpensesPage = () => (
  <Layout>
    <ExpenseTracker />
  </Layout>
);

const FeaturesPageWrapper = () => (
  <Layout useTopHeader={true}>
    <FeaturesPage />
  </Layout>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/guest" element={<GuestRedirect />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/groups/:groupId" element={<GroupDetailPage />} />
        <Route path="/add-expense" element={<ExpensesPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/features" element={<FeaturesPageWrapper />} />
        <Route path="/reminders" element={<Navigate to="/dashboard" replace />} />
        <Route path="/profile" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
