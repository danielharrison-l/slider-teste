import { useState } from 'react';

const datas = [
  '28/03/2025',
  '29/03/2025',
  '30/03/2025',
  '01/04/2025',
  '02/04/2025',
  '03/04/2025',
];

const rotulos = [
  'Válvula Geral da ETE\nLinha A',
  'Válvula Geral da ETE\nLinha A',
  'Válvula Geral da ETE\nLinha A',
  'Válvula Geral da ETE\nLinha A',
  'Válvula Geral da ETE\nLinha A',
  'Válvula G\nLinha A',
];

type TimelineProps = {
  onGenerateSlider: (datasSelecionadas: string[]) => void;
};

export default function Timeline({ onGenerateSlider }: TimelineProps) {
  const [selecionadas, setSelecionadas] = useState<string[]>([]);

  function toggleData(data: string) {
    if (selecionadas.includes(data)) {
      setSelecionadas(selecionadas.filter((d) => d !== data));
    } else if (selecionadas.length < 2) {
      setSelecionadas([...selecionadas, data]);
    }
  }

  function handleGenerateSlider() {
    onGenerateSlider(selecionadas);
  }

  return (
    <div className="w-full max-w-screen-2xl mx-auto bg-white rounded-xl shadow border border-gray-200 px-12 pt-6 pb-2 mb-8">
      <h2 className="text-base font-semibold text-gray-800 mb-2">Linha do Tempo | Vista Superior</h2>
      <div className="relative flex flex-col items-center w-full">
        {/* Linha horizontal */}
        <div className="absolute top-16 left-0 right-0 h-1 bg-gray-200 z-0" style={{marginLeft: '56px', marginRight: '56px'}} />
        <div className="flex flex-row items-end justify-between w-full z-10 px-14">
          {datas.map((data, idx) => (
            <div key={data} className="flex flex-col items-center min-w-[100px]">
              {/* Rótulo acima */}
              <span className="text-[13px] text-gray-700 font-medium mb-2 text-center leading-tight whitespace-pre-line">
                {rotulos[idx]}
              </span>
              {/* Linha vertical */}
              <div className="w-0.5 h-6 bg-gray-200 mb-1" />
              {/* Ponto amarelo com ícone */}
              <button
                className={`w-12 h-12 flex items-center justify-center mb-2 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-colors duration-200
                  ${selecionadas.includes(data)
                    ? 'bg-yellow-400 border-yellow-400'
                    : 'bg-white border-yellow-300'}
                `}
                onClick={() => toggleData(data)}
                disabled={selecionadas.length === 2 && !selecionadas.includes(data)}
                style={{ boxShadow: selecionadas.includes(data) ? '0 0 0 4px #fde68a' : undefined }}
              >
                {/* Ícone de imagem  */}
                {selecionadas.includes(data) ? (
                  <svg viewBox="0 0 24 24" fill="none" width="22" height="22" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                    <path d="M21 17L16 12L8 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" width="22" height="22" xmlns="http://www.w3.org/2000/svg" className="text-yellow-400">
                    <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                    <path d="M21 17L16 12L8 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
              {/* Data */}
              <span className="text-xs text-gray-600 font-medium mt-1 text-center whitespace-nowrap">{data}</span>
            </div>
          ))}
        </div>
      </div>
      {selecionadas.length === 2 && (
        <div className="flex justify-center mt-6 mb-2">
          <button
            className="px-8 py-2 bg-yellow-400 text-black font-semibold rounded shadow hover:bg-yellow-500 transition-colors border border-yellow-500"
            onClick={handleGenerateSlider}
          >
            Gerar Slider
          </button>
        </div>
      )}
    </div>
  );
} 