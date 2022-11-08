import {useContext} from 'react'
import { AppContext } from './context/appContext';

function App() {
  const {weather} = useContext(AppContext);

  return (
    <div className='bg-cyan-100 min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-l'>
      {weather?.base}
    </div>
  );
}

export default App;
