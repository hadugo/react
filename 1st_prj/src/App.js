
import './App.css'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Header from './component/HeaderComponent.js'
import Footer from  './component/FooterComponent.js'
import Wellcome from  './component/WellcomeComponent.js'
import Hellow from  './component/HellowComponent.js'
import NotFound from './component/NotFoundComponent.js'
function App() {

  const links = [
    { path : '/', component : <Wellcome/> },
    { path : '/hellow', component : <Hellow/> },
    { path : '/*', component : <NotFound/> },
  ]
  return (
    <div>
      <Header/>
      <BrowserRouter>
        <Link to="/">Wellcome</Link> | <Link to="/hellow">Hellow</Link>
        <Routes>
          {
            links.map(
              ele => {
                return (
                  <Route key={ele.path} path={ele.path} element={ele.component} />
                )
              }
            )
          }
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
