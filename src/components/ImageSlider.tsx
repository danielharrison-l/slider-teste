import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

interface ImageSliderProps {
  datasSelecionadas: string[];
  onClose: () => void;
}

const imagensMock = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
];

export default function ImageSlider({ datasSelecionadas, onClose }: ImageSliderProps) {
  if (datasSelecionadas.length !== 2) return null;

  const idx1 = [
    '28/03/2025',
    '29/03/2025',
    '30/03/2025',
    '01/04/2025',
    '02/04/2025',
    '03/04/2025',
  ].indexOf(datasSelecionadas[0]);
  const idx2 = [
    '28/03/2025',
    '29/03/2025',
    '30/03/2025',
    '01/04/2025',
    '02/04/2025',
    '03/04/2025',
  ].indexOf(datasSelecionadas[1]);

  return (
    <div className="w-full max-w-screen-2xl mx-auto bg-white rounded-xl shadow p-0 mb-8">
      <div className="flex items-center justify-between px-12 pt-6 pb-2">
        <h2 className="text-base font-semibold text-gray-800">Slider</h2>
        <button onClick={onClose} className="text-red-500 hover:underline text-sm font-medium">Fechar</button>
      </div>
      <div className="flex flex-col items-center px-8 pb-6">
        <div className="w-full aspect-[2.5/1] bg-black rounded-lg overflow-hidden flex items-center justify-center">
          <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={imagensMock[idx1]} alt={datasSelecionadas[0]} style={{objectFit: 'cover', width: '100%', height: '100%'}} />}
            itemTwo={<ReactCompareSliderImage src={imagensMock[idx2]} alt={datasSelecionadas[1]} style={{objectFit: 'cover', width: '100%', height: '100%'}} />}
            style={{ width: '100%', height: '100%' }}
            handle={
              <div style={{ position: 'relative', width: '32px', height: '100%' }}>
                {/* Linha branca */}
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
                    // pointerEvents: 'none',
                  }}
                />
                {/* Handle branco */}
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