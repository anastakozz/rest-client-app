import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';
import './App.css';

startTransition(() => {
  hydrateRoot(
    document.getElementById('root')!,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>
  );
});
