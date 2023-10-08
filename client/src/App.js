import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import AllRoutes from './AllRoutes';
import { fetchAllQuestions } from './actions/Question';
import { fetchAllUsers } from './actions/users';





function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])

  const [currentLanguage, setCurrentLanguage] = useState('en'); // Default language is English

  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
  };



  return (
    <div className="App">
      <div className={`app-${currentLanguage}`}>
        <Router >

          <Navbar changeLanguage={changeLanguage} />

          <AllRoutes />

        </Router>

      </div>
    </div>
  );
}

export default App;