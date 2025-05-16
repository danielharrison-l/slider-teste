export type TimelinePoint = {
  id: number;
  data: string;
  rotulo: string;
  imagemUrl: string;
};

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchTimeline(): Promise<TimelinePoint[]> {
  const res = await fetch(`${API_URL}/timeline`);
  if (!res.ok) throw new Error('Erro ao buscar timeline');
  const data = await res.json();
  return data.timeline;
}

export async function fetchImagem(id: number): Promise<TimelinePoint> {
  const res = await fetch(`${API_URL}/imagem/${id}`);
  if (!res.ok) throw new Error('Imagem não encontrada');
  return res.json();
}