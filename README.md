<h1 align="center">📍 Campus Connect - Hub Geocêntrico e Gamificação Universitária 🎮</h1>

<div align="center">
<!--
<img width="600" height="350" src="./screenshot_campus_connect.png" alt="Visão do mapa 2D com polígonos e ranking de facções"/>
--!>

</div>

<h2 align="center"><a href="https://www.google.com/search?q=https://campusconnect.netlify.app/" >Acessar o Geo-Hub (Em Breve)</a></h2>

Sumário

<a href="#status-do-projeto">Status do Projeto</a>

<a href="#funcionalidades-core">Funcionalidades Core</a>

<a href="#arquitetura-e-escalabilidade">Arquitetura e Escalabilidade</a>

<a href="#como-rodar">Como Rodar o Projeto Localmente</a>

<a href="#tecnologias-utilizadas">Tecnologias Utilizadas</a>

<a href="#pessoas-autoras">Desenvolvedor</a>

<h2 id="status-do-projeto">Status do Projeto</h2>

🚧 Em Transição 🚧

O projeto está atualmente migrando de um ambiente de protótipo (Mock Data) para a Arquitetura Real (Firebase/Firestore). O foco atual é a componentização, a limpeza de código e a implementação do ciclo completo de Gamificação e Governança no contexto da UFRR (MVP Brasil).

<h2 id="funcionalidades-core">Funcionalidades Core</h2>

O Campus Connect transforma o campus em um jogo de estratégia social com base na geolocalização. As funcionalidades principais incluem:

🗺️ Geo-Hub (Geolocalização e Mapas)

✅ Transição 3D/2D: Visualização Global (Globo 3D) com transição fluida para a vista Institucional (Leaflet 2D).

✅ HUDs (Hubs de Desenvolvimento): Polígonos mapeados que representam locais temáticos (Acadêmico, Lazer, Serviço).

⚙️ Geofencing Dinâmico: Algoritmo que detecta se o usuário está em modo PRESENCIAL (dentro do raio da UNI ou de um HUD) ou VIRTUAL (navegando remotamente).

🏆 Gamificação e Alianças

✅ Sistema de XP Ponderado: Algoritmo de equidade que nivela a competição, premiando a média de engajamento dos alunos do curso, e não apenas o volume total de pontos.

⚙️ Alianças: Cursos e Institutos competem por influência e liderança nos HUDs (Rankings).

🤝 Comunidade e Governança

✅ Mapeamento Colaborativo: Usuários podem desenhar novos polígonos no mapa e submetê-los.

⚙️ Ciclo de Proposta e Votação: Propostas de novos HUDs passam por um sistema de votação comunitária antes de serem oficializadas.

✅ Home Centralizada: Nova página inicial (Hub Institucional) que atua como gate para Estudantes (Ação/Ranking) e Aventureiros (Cadastro/Landing Page).

<h2 id="arquitetura-e-escalabilidade">Arquitetura e Escalabilidade</h2>

Componentização

✅ Componentes Globais: Elementos reutilizáveis (ActionButton, CardContainer) extraídos para a pasta src/global/components, garantindo consistência visual e manutenibilidade.

✅ Estrutura de Domínio: Organização das pastas types e services por áreas de interesse (Identity, Geo, Social), preparando o projeto para expansão.

Autenticação e Persistência

🔄 Migração para Real: Transição de dados simulados para Firebase Authentication e Firestore, centralizados no AppContext para gerenciar o estado real do usuário e as permissões.

<h2 id="como-rodar">Como Rodar o Projeto Localmente</h2>

Para configurar e rodar o Campus Connect em seu ambiente de desenvolvimento local:

1.  Clone este repositório:
    bash     $ git clone [URL_DO_REPOSITORIO]     $ cd campus-connect-app     

2.  Instale as dependências:
    bash     $ npm install     

3.  Configuração do Firebase:
    *   Crie um projeto no Firebase Console.
    *   Habilite o Firestore Database e o Firebase Authentication.
    *   O projeto utiliza credenciais injetadas (__firebase_config, __initial_auth_token), simulando um ambiente de produção seguro.

4.  Executando o Projeto:
    bash     $ npm run dev     
    O aplicativo será iniciado localmente (geralmente em http://localhost:5173).

<h2 id="tecnologias-utilizadas">Tecnologias Utilizadas</h2>

Este projeto foi desenvolvido utilizando uma stack moderna e robusta:

1.  React & TypeScript - Para desenvolvimento front-end tipado.
2.  Tailwind CSS - Para estilização atômica e responsiva.
3.  Firebase / Firestore - Para Backend as a Service (BaaS), Autenticação e Persistência de dados em tempo real.
4.  Leaflet & react-globe.gl - Para renderização dos mapas 2D e 3D.

<h2 id="pessoas-autoras">Authors</h2> 
<img width="200" height="200" align="center" alt="my profile picture" src="https://github.com/welderbm.png"/>
welder barroso
