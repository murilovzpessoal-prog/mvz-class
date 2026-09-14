import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { Jornada } from './pages/Jornada';
import { Modulos } from './pages/Modulos';
import { Suporte } from './pages/Suporte';
import { Scanner } from './pages/Scanner';
import { Produtos } from './pages/Produtos';
import { AnalisadorProduto } from './pages/AnalisadorProduto';
import { AnalisadorFornecedor } from './pages/AnalisadorFornecedor';
import { Aula } from './pages/Aula';
import { Login } from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="jornada" element={<Jornada />} />
          <Route path="modulos" element={<Modulos />} />
          <Route path="suporte" element={<Suporte />} />
          <Route path="scanner" element={<Scanner />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="analisador-produto" element={<AnalisadorProduto />} />
          <Route path="analisador-fornecedor" element={<AnalisadorFornecedor />} />
        </Route>
        {/* Aulas page runs outside AppLayout to take full screen */}
        <Route path="/login" element={<Login />} />
        <Route path="/aula/:id" element={<Aula />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
