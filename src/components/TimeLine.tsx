import React, { useState, useEffect, useRef } from 'react';

const datas = [
  '28/03/2025',
  '29/03/2025',
  '30/03/2025',
  '31/03/2025',
  '01/04/2025',
  '02/04/2025',
  '03/04/2025',
  '04/04/2025',
  '05/04/2025',
  '06/04/2025',
  '07/04/2025',
  '08/04/2025',
  '09/04/2025',
  '10/04/2025',
];

const rotulos = [
  'Válvula Geral da ETE\nLinha A',
  'Válvula Geral da ETE\nLinha A',
  'Válvula Geral da ETE\nLinha A',
  'Válvula Geral da ETE\nLinha A',
  'Válvula Geral da ETE\nLinha A',
  'Válvula Geral da ETE\nLinha A',
  'Válvula Geral da ETE\nLinha A',
  'Válvula Geral da ETE\nLinha A',
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
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selecionadas.length === 2) {
      onGenerateSlider(selecionadas);
    }
  }, [selecionadas, onGenerateSlider]);

  function toggleData(data: string) {
    if (selecionadas.includes(data)) {
      setSelecionadas(selecionadas.filter((d) => d !== data));
    } else if (selecionadas.length < 2) {
      setSelecionadas([...selecionadas, data]);
    }
  }

  function scrollLeft() {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }
  function scrollRight() {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  return (
    <div className="w-full max-w-screen-2xl mx-auto bg-white rounded-xl shadow border border-gray-200 px-8 pt-4 pb-2 mb-8">
      <div className="flex items-center mb-4">
        <svg className="mr-2 text-gray-800" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/></svg>
        <h2 className="text-lg font-semibold text-gray-800">Linha do Tempo | Vista Superior</h2>
      </div>
      <div className="-mx-8 w-[calc(100%+4rem)] border-b border-gray-200 mb-2" />
      <div className="relative w-full flex items-center mt-2">
        {/* Seta esquerda */}
        <button
          className="absolute left-0 z-20 bg-white rounded-full shadow p-2 flex items-center justify-center"
          onClick={scrollLeft}
          aria-label="Scroll timeline left"
          type="button"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#213547" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        {/* Timeline rolável */}
        <div
          ref={timelineRef}
          className="overflow-x-auto w-full px-14 scrollbar-none"
          style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none' }}
        >
          <div className="relative flex flex-col items-center w-full min-w-max">
            {/* Linha horizontal */}
            <div className="absolute inset-x-14 top-[90px] h-1 bg-gray-200 z-0" />
            <div className="flex flex-row items-end justify-between w-full z-10 px-14">
              {datas.map((data, idx) => (
                <div key={data} className="flex flex-col items-center min-w-[220px]">
                  {/* Rótulo acima */}
                  <span className="text-[13px] text-gray-700 font-medium mb-2 text-center leading-tight whitespace-pre-line">
                    {rotulos[idx]}
                  </span>
                  {/* Linha vertical */}
                  <div className="relative flex flex-col items-center mb-1">
                  {/* circulo n topo */}
                  <div className="w-2 h-2 bg-gray-300 rounded-full absolute -top-1" />
                    {/* Linha vertical */}
                    <div className="w-0.5 h-6 bg-gray-200" />
                  </div>
                  <button
                    className={`w-9 h-9 flex items-center justify-center mb-2 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-colors duration-200 z-10
                      ${selecionadas.includes(data)
                        ? 'bg-yellow-400 border-yellow-400'
                        : 'bg-white border-yellow-300'}
                    `}
                    onClick={() => toggleData(data)}
                    disabled={selecionadas.length === 2 && !selecionadas.includes(data)}
                    style={{ boxShadow: selecionadas.includes(data) ? '0 0 0 4px #fde68a' : undefined }}
                  >
                    {selecionadas.includes(data) ? (
                      <svg viewBox="0 0 24 24" fill="none" width="16" height="16" xmlns="http://www.w3.org/2000/svg" className="text-white">
                        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                        <path d="M21 17L16 12L8 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" width="16" height="16" xmlns="http://www.w3.org/2000/svg" className="text-yellow-400">
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
        </div>
        {/* Seta direita */}
        <button
          className="absolute right-0 z-20 bg-white rounded-full shadow p-2 flex items-center justify-center"
          onClick={scrollRight}
          aria-label="Scroll timeline right"
          type="button"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#213547" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
} 