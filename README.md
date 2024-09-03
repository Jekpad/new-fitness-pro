## Запуск приложения

1. Установите все необходимые зависимости

```bash
npm i
```

2. Копировать файл `.env` и переименовать копию в `.env.local`, заполнив конфиг данными.

3. Запустите сервер:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

---

По умолчанию сервер будет расположен на [http://localhost:5173/](http://localhost:5173/).

---

Проект использует:

- [React + TypeScript + Vite](https://vitejs.dev/)
- [Tailwindcss](https://tailwindcss.com/docs/) для управлениями стилями.
