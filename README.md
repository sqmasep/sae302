# Introduction

La SAE 302 en BUT MMI 2ème année à l'IUT de Lens a pour but de mixer la totalité des compétences acquises au fil de la première et deuxième année, et faire un projet par groupe de 6 qui réunit web, audiovisuel et communication. Elle s'étend entre mi-septembre et début janvier. La majorité de mon groupe étant orienté audiovisuel, on s'est penché sur un court-métrage mais il fallait ajouter la dimension du web, c'est pourquoi ce site a été développé et a pour but de suivre la "fin" du court-métrage, en étant intéractif. Le projet doit être rendu début janvier, et celui-ci sera exposé à la Nuit MMI le 5 janvier

# Technologies

Des choix technologiques ont dû être faits. Basé sur React côté frontend, Express en backend et fullstack (presque) typesafe

## Frontend

- React
- Typescript
- MUI5
- Framer Motion
- Formik + Zod
- Socket.io (client)

## Backend

- ExpressJS
- Typescript
- Socket.io
- Mongoose
- Redis
- Multer (temporaire)
- JWT (pour anti-cheat solo)

# Monorepo

Un monorepo est plus adéquat pour ce type de projet, étant donné que le côté serveur n'a pas d'informations importantes, le github est public et je suis le seul développeur

# Erreurs

Je ne connaissais pas tRPC ni Prisma, j'avais utilisé alors socket.io et Mongoose. Le développement a été un peu plus difficile suite à ce problème (notamment pour le fullstack pas 100% typesafe), mais ça a été un challenge intéressant. De même pour le array storage, avec des contraintes dans des types non primitifs, où superjson aurait été plus pratique et adéquat. Le composant Card aurait pû être plus idéal en terme de DX avec des props mieux gérées, mais ça fonctionne.

# Ce que j'ai appris / découvert

- Arbre de possibilité
- Créer des custom hooks est en réalité facile et même trop swag
- Organisation avec les Contexts
- Audio

# TODO

[ ] - refactoriser socket.io.ts
