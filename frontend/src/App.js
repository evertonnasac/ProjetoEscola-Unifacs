import { MenuLateral } from './components/MenuLateral';
import { Aluno } from './pages/aluno/Aluno';
import { ProfileAluno } from './pages/aluno/ProfileAluno';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Professor } from './pages/professor/Professor';
import { Disciplina } from './pages/disciplina/Disciplina';
import { Turma } from './pages/turma/Turma';

import './styles/App.sass';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <MenuLateral/>
          <main className='main_page'>
            <Routes>
              <Route path = {'/aluno'} element = {<Aluno/>}/>
              <Route path = {'/aluno/profile'} element = {<ProfileAluno/>}/>
              <Route path = {'/professor'} element = {<Professor/>}/>
              <Route path = {'/disciplinas'} element = {<Disciplina/>}/>
              <Route path = {'/turmas'} element = {<Turma/>}/>

            </Routes>   
            </main>
        </div>
    </BrowserRouter>
  );
}

export default App;
