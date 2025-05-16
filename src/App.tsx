import { useState } from 'react'
import Timeline from './components/TimeLine';
import ImageSlider from './components/ImageSlider';
import './styles.css';

function App() {
  const [datasSelecionadas, setDatasSelecionadas] = useState<string[]>([]);
  const [mostrarSlider, setMostrarSlider] = useState(false);

  function handleGenerateSlider(datas: string[]) {
    setDatasSelecionadas(datas);
    setMostrarSlider(true);
  }

  function handleCloseSlider() {
    setMostrarSlider(false);
    setDatasSelecionadas([]);
  }

  return (
    <div className="min-h-screen min-w-full w-screen h-screen bg-gray-50 flex flex-col items-center justify-start">
      <div className="flex flex-col w-full h-full items-center justify-start pt-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">Timeline Interativa + Slider de Imagens</h1>
        <Timeline onGenerateSlider={handleGenerateSlider} />
        {mostrarSlider && (
          <ImageSlider datasSelecionadas={datasSelecionadas} onClose={handleCloseSlider} />
        )}
      </div>
    </div>
  )
}

export default App
