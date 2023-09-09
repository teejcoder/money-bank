import GoogleAuth from './components/GoogleAuth';
import { supabase } from './supabaseClient';

const App = () => {

return (
  <div className='flex justify-center items-center h-screen bg-slate-800 text-white font-montserrat'>
    <p className='text-3xl'>
      hi there, this is <b>Money Bank</b> welcome to your financial future!
    </p>

    <GoogleAuth />
  </div>
)

}

export default App