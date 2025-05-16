import { useEffect, useState } from 'react';
import { fetchImagem, type TimelinePoint } from '../services/TimeLineApi.tsx';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

interface ImageSliderProps {
  datasSelecionadas: number[];
  onClose: () => void;
}

export default function ImageSlider({ datasSelecionadas }: ImageSliderProps) {
  const [imagens, setImagens] = useState<TimelinePoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (datasSelecionadas.length === 2) {
      setLoading(true);
      Promise.all(datasSelecionadas.map(id => fetchImagem(id)))
        .then(setImagens)
        .finally(() => setLoading(false));
    }
  }, [datasSelecionadas]);

  if (loading) return <div className="p-8 text-center">Carregando imagens...</div>;
  if (imagens.length !== 2) return null;

  return (
    <div className="w-full max-w-screen-2xl mx-auto bg-white rounded-xl shadow p-0 mb-8 max-h-[calc(100vh-48px)] flex flex-col">
      <div className="flex flex-col items-center px-8 pb-6 flex-1 w-full">
        <div className="w-full aspect-[2.5/1] max-h-[80vh] min-h-[300px] rounded-lg overflow-hidden flex items-center justify-center">
          <ReactCompareSlider
            className="w-full h-full flex items-center justify-center"
            itemOne={<ReactCompareSliderImage src={imagens[0].imagemUrl} alt={imagens[0].rotulo} style={{objectFit: 'cover', width: '100%', height: '100%'}} />}
            itemTwo={<ReactCompareSliderImage src={imagens[1].imagemUrl} alt={imagens[1].rotulo} style={{objectFit: 'cover', width: '100%', height: '100%'}} />}
            handle={
              <div style={{ position: 'relative', width: '32px', height: '100%' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '50%',
                    width: '5px',
                    background: 'rgba(255,255,255,0.85)',
                    borderRadius: '9999px',
                    transform: 'translateX(-50%)',
                    cursor: 'ew-resize',
                    zIndex: 10,
                  }}
                />
                <div
                  className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'ew-resize',
                    zIndex: 20,
                  }}
                />
              </div>
            }
            onlyHandleDraggable={true}
          />
        </div>
      </div>
    </div>
  );
}