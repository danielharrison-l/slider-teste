# Timeline + Image Slider

Este projeto é uma aplicação React que exibe uma linha do tempo interativa com pontos selecionáveis e um slider comparativo de imagens.

## Tecnologias Utilizadas

- **React** + Vite
- TypeScript
- **TailwindCSS v4** 
- **react-compare-slider**
- Integração com API Rest

## Funcionalidades

- Exibe uma linha do tempo horizontal com múltiplos pontos (datas/imagens)
- Permite selecionar até dois pontos para comparação
- Destaca visualmente os pontos selecionados
- Exibe um slider comparativo de imagens ao selecionar dois pontos
- Navegação horizontal da timeline com setas
- Loading visual (spinner) durante carregamento dos dados
- Acessibilidade (aria-label, aria-pressed, role)
- Consome dados de uma API configurável

## Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone git@github.com:danielharrison-l/slider-teste.git
   cd slider-teste
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   pnpm install
   ```

3. **Configure a URL da API:**
   Crie um arquivo `.env` na raiz do projeto com o conteúdo:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
   (Altere a porta se necessário)

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   pnpm run dev
   ```

5. **Acesse no navegador:**
   Abra [http://localhost:5173](http://localhost:5173) (ou a porta indicada no terminal)

## Observações


- O projeto é responsivo e pode ser acessado em diferentes tamanhos de tela.
- Para customizar dados, altere a fonte da API.