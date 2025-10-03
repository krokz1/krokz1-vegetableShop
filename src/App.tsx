import { useState } from 'react'
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { CardList } from './components/CardList/CardList';
import { Header } from './components/Header/Header';
import { CartProvider } from './contexts/CartContext';
import './App.scss'

function App() {
  return (
    <CartProvider>
      <MantineProvider>
        <Notifications />
        <Header />
        <CardList />
      </MantineProvider>
    </CartProvider>
  );
}

export default App;