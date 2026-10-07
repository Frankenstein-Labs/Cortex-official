# Intégration AI Manus

AI Manus est intégré dans `ai-manus/` comme application complète : frontend Vue/Vite, backend FastAPI, sandbox et orchestration Docker.

## Deuxième page

La page officielle est disponible à `/ai-manus`. Elle embarque l’interface AI Manus depuis l’URL définie par `NEXT_PUBLIC_AI_MANUS_APP_URL`.

- En développement local, la valeur par défaut est `http://localhost:5173`.
- En production, cette variable doit pointer vers le frontend AI Manus déployé.
- Le lien « Ouvrir séparément » permet de tester l’application hors de l’iframe.
- Une session PearAI authentifiée reçoit un handoff SSO signé de courte durée et ouvre directement le menu AI Manus.

## Services requis

Le fonctionnement complet nécessite les services déjà fournis par AI Manus :

- frontend Vue/Vite ;
- backend FastAPI sur le port 8000 ;
- MongoDB ;
- Redis ;
- sandbox Docker avec accès au socket Docker ;
- un fournisseur LLM configuré via `ai-manus/.env`.

Le démarrage local de référence reste :

```bash
cd ai-manus
cp .env.example .env
# renseigner API_KEY, API_BASE et les secrets d’authentification
./dev.sh up
```

Le frontend AI Manus est ensuite accessible sur `http://localhost:5173` et la page officielle sur `/ai-manus`.

## SSO

`AI_MANUS_SSO_SECRET` doit avoir exactement la même valeur dans l’environnement Next et dans `ai-manus/.env`. Cette valeur ne doit jamais être publiée ni ajoutée au dépôt. Le backend AI Manus vérifie la signature et l’expiration du handoff avant de créer une session Redis.

## Sécurité

Les secrets AI Manus restent dans un fichier `.env` non versionné. Le site de présentation conserve son authentification Supabase et ses protections existantes. Les deux sessions sont actuellement séparées ; le rebranding et l’unification de l’expérience utilisateur feront l’objet de l’étape suivante.
