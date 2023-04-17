import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import HomeScreen from "./screens/HomeScreen";
import ProjectInfoScreen from "./screens/ProjectInfoScreen";
// import Members from "./components/Members";
// import AddMember from "./components/AddMember";
// import Projects from "./components/Projects";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <div className=" p-5 bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3] h-screen">
            <Header />
            {/* <AddMember />
            <Members />
            <Projects /> */}
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/projects/:id" element={<ProjectInfoScreen />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
