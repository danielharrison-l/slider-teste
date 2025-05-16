import { useState, useEffect, useRef } from 'react';
import { fetchTimeline } from '../services/TimeLineApi.tsx';
import type { TimelinePoint } from '../services/TimeLineApi.tsx';
import TimelineArrow from './TimeLineArrow'; // ou { TimelineArrow } se for exportação nomeada

type TimelineProps = {
  onGenerateSlider: (idsSelecionados: number[]) => void;
};

function TimelinePointComponent({
  ponto,
  selecionado,
  onClick,
  disabled,
}: {
  ponto: TimelinePoint;
  selecionado: boolean;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <div className="flex flex-col items-center min-w-[220px]">
      <span className="text-[13px] text-gray-700 font-medium mb-2 text-center leading-tight whitespace-pre-line">
        {ponto.rotulo}
      </span>
      <div className="relative flex flex-col items-center mb-1">
        <div className="w-2 h-2 bg-gray-300 rounded-full absolute -top-1" />
        <div className="w-0.5 h-6 bg-gray-200" />
      </div>
      <button
        className={`w-9 h-9 flex items-center justify-center mb-2 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-colors duration-200 z-10
          ${selecionado ? 'bg-yellow-400 border-yellow-400' : 'bg-white border-yellow-300'}
        `}
        onClick={onClick}
        disabled={disabled}
        style={{ boxShadow: selecionado ? '0 0 0 4px #fde68a' : undefined }}
        aria-label={`Selecionar data ${ponto.data}`}
        aria-pressed={selecionado}
      >
        {selecionado ? (
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
      <span className="text-xs text-gray-600 font-medium mt-1 text-center whitespace-nowrap">{ponto.data}</span>
    </div>
  );
}

export default function Timeline({ onGenerateSlider }: TimelineProps) {
  const [pontos, setPontos] = useState<TimelinePoint[]>([]);
  const [selecionadas, setSelecionadas] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    fetchTimeline()
      .then(setPontos)
      .catch(() => setErro('Erro ao carregar timeline'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selecionadas.length === 2) {
      onGenerateSlider(selecionadas);
    }
  }, [selecionadas, onGenerateSlider]);

  function toggleData(id: number) {
    if (selecionadas.includes(id)) {
      setSelecionadas(selecionadas.filter((d) => d !== id));
    } else if (selecionadas.length < 2) {
      setSelecionadas([...selecionadas, id]);
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

  if (loading) return <div className="p-8 text-center">Carregando linha do tempo...</div>;
  if (erro) return <div className="p-8 text-center text-red-500">{erro}</div>;

  return (
    <div className="w-full max-w-screen-2xl mx-auto bg-white rounded-xl shadow border border-gray-200 px-8 pt-4 pb-2 mb-8">
      <div className="flex items-center mb-4">
        <svg className="mr-2 text-gray-800" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/></svg>
        <h2 className="text-lg font-semibold text-gray-800">Linha do Tempo | Vista Superior</h2>
      </div>
      <div className="-mx-8 w-[calc(100%+4rem)] border-b border-gray-200 mb-2" />
      <div className="relative w-full flex items-center mt-2" role="region" aria-label="Linha do tempo interativa">
        <TimelineArrow direction="left" onClick={scrollLeft} />
        <div
          ref={timelineRef}
          className="overflow-x-auto w-full px-14 scrollbar-none"
          style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none' }}
        >
          <div className="relative flex flex-col items-center w-full min-w-max">
            <div className="absolute inset-x-14 top-[90px] h-1 bg-gray-200 z-0" />
            <div className="flex flex-row items-end justify-between w-full z-10 px-14">
              {pontos.map((ponto) => (
                <TimelinePointComponent
                  key={ponto.id}
                  ponto={ponto}
                  selecionado={selecionadas.includes(ponto.id)}
                  onClick={() => toggleData(ponto.id)}
                  disabled={selecionadas.length === 2 && !selecionadas.includes(ponto.id)}
                />
              ))}
            </div>
          </div>
        </div>
        <TimelineArrow direction="right" onClick={scrollRight} />
      </div>
    </div>
  );
}