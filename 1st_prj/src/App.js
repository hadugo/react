
import './App.css'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Header from './component/HeaderComponent.js'
import Footer from  './component/FooterComponent.js'
import Wellcome from  './component/WellcomeComponent.js'
import ShowHide from  './component/ShowHideComponent.js'
import UseEffect from './component/UseEffectComponent.js'
import Fetch from './component/FetchComponent.js'
import Grid from './component/GridComponent.js'
import NotFound from './component/NotFoundComponent.js'
function App() {

  const links = [
    { path : '/', component : <Wellcome/>, text : 'Wellcome' },
    { path : '/showHide', component : <ShowHide/>, text : 'showHide' },
    { path : '/useEffect', component : <UseEffect/>, text : 'useEffect'}, 
    { path : '/fetch', component : <Fetch/>, text : 'fetch'}, 
    { path : '/grid', component : <Grid/>, text : 'grid'}, 
  ]
  return (
    <div>
      <Header/>
      <BrowserRouter>
        {
          links.map(
            (ele) => {
              return (
                <span key={ele.path}>
                  <Link key={ele.path} to={ele.path}>{ele.text}</Link> | 
                </span>
              )
            }
          )
        }
        <p></p>
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
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <p></p>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
