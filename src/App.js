import { useContext, useEffect, useState } from 'react'
import { DebounceInput } from 'react-debounce-input';
import { AppContext } from './context/appContext';
import { HighlightOff } from '@mui/icons-material';
import loadingIcon from './loadingicon.gif';

function App() {
  const { weather, isLoading, filterText, setFilterText, notFind, isNight } = useContext(AppContext);
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className={`min-h-screen bg-gradient-to-r ${isNight ? 'from-slate-900 to-stone-900' : 'from-cyan-500 to-blue-500'} hover:bg-gradient-to-l flex justify-center items-center flex-col p-5`}>
      <div className='relative'>
        <DebounceInput minLength={2}
          debounceTimeout={1000}
          onChange={event => setFilterText(event.target.value)}
          value={filterText}
          onBlur={() => setIsInputFocused(false)}
          onFocus={() => setIsInputFocused(true)}
          className={`rounded-md px-12 py-1 text-center ${isInputFocused ? 'opacity-50' : 'opacity-25'} outline-none font-semibold`}
          placeholder="Search..."
        />
        {filterText.length > 0 && <HighlightOff color='action' className='absolute top-2/4 right-1 -translate-y-2/4 cursor-pointer z-10' onClick={() => setFilterText('')} />}
      </div>
      <div className="grow flex flex-col justify-center items-center">
        {isLoading === false ? (
          <>
            {
              notFind ? (<div className={`${isNight === true && 'text-white'} text-center font-semibold`}>Not Find</div>) : (
                <div className="text-white flex flex-col items-center justify-center">
                  <div className='text-4xl mb-2'>{weather?.name}</div>
                  <div className='text-6xl mb-2'>{weather?.main.temp.toFixed(0)}°</div>
                  <div className='text-xl'>{weather?.weather[0].description}</div>
                  <div className='text-xl'>Min:{weather?.main.temp_min.toFixed(0)}° Max:{weather?.main.temp_max.toFixed(0)}°</div>
                  <div><img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`} alt="" /></div>
                </div>
              )
            }
          </>
        ) : (<div><img className='w-32' src={loadingIcon} alt="" /></div>)}
      </div>
    </div>
  );
}

export default App;
