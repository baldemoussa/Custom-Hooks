import './App.css'
import DebounceSearchDemo from './components/DebounceSearchDemo'
import PaginationDemo from './components/PaginationDemo'

function App() { 

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <h1 className="text-center text-3xl font-bold text-slate-800">
        Custom Hooks Implementation
      </h1>
      <PaginationDemo />
      <DebounceSearchDemo />
    </div>
  )
}

export default App
