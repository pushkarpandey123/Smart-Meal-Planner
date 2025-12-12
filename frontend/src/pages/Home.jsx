import PublicHomepage from "./PublicHomepage";
import UserDashboard from "./UserDashboard";

function Home({ isLoggedIn }) {
  return isLoggedIn ? <UserDashboard /> : <PublicHomepage />;
}

export default Home;
