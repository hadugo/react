
import './App.css'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Header from './component/HeaderComponent.js'
import Footer from  './component/FooterComponent.js'
import Wellcome from  './component/WellcomeComponent.js'
import Hellow from  './component/HellowComponent.js'
import NotFound from './component/NotFoundComponent.js'
function App() {

  return (
    <div>
      <Header/>
      <BrowserRouter>
        <Link to="/wellcome">Wellcome</Link> | <Link to="/hellow">Hellow</Link>
        <Routes>
          <Route path="/" element={<Wellcome/>}/>
          <Route path="/wellcome" element={<Wellcome/>}/>
          <Route path="/hellow" element={<Hellow/>}/>
          <Route path="" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
