# Déploiement Cortex sur Vercel

## État et portée

Le dépôt est préparé pour un déploiement monorepo avec **Vercel Services** : le site Next.js, le frontend Vue/Vite et l’API FastAPI partagent le même déploiement et le même domaine. `vercel.json` décrit le routage entre ces trois services.

Cette configuration est un manifeste de code, pas un déploiement : elle ne crée pas le projet Vercel, ne connecte pas le dépôt au compte, n’ajoute aucune variable secrète et ne provisionne aucune base de données. Le connecteur Vercel n’est pas activé dans cette session; le déploiement devra être déclenché depuis le compte Vercel après revue de cette branche.

> **Blocage avant mise en production :** l’API utilise encore `DockerSandbox` et `docker.from_env()` pour créer une sandbox isolée par tâche. Une Function Vercel n’a pas le socket Docker du compose local. Vercel fournit un SDK Python (`uv add vercel`) pour créer des microVM Sandbox, exécuter des processus et gérer des fichiers; toutefois, aucun adaptateur Cortex n’est encore implémenté. Il faut porter le contrat `Sandbox` vers ce SDK, utiliser un environnement isolé par utilisateur/session et vérifier que l’image personnalisée reproduit les fonctions actuelles (shell interactif, navigateur/CDP, VNC, fichiers et ports) avant d’activer l’exécution d’agent. Une sandbox partagée via `SANDBOX_ADDRESS` ne convient pas à plusieurs utilisateurs.

Le backend web actuel est distinct du runtime de l’extension Cortex.dev. La configuration Vercel n’effectue pas le portage de cette extension dans le serveur web.

> **Autre blocage d’exécution :** le backend utilise des tâches longues et peut s’appuyer sur un worker Celery (`TASK_BACKEND=celery`). Vercel Functions ne remplacent pas un worker résident. Il faudra un worker persistant externe, ou porter cette file vers un mécanisme géré compatible et vérifier la reprise des tâches après déconnexion.

> **Blocage juridique avant publication :** `/privacy`, `/privacy-app`, `/terms-of-service` et `/disclaimer` contiennent encore des textes hérités de PearAI. Je les ai laissés inchangés pour ne pas réécrire des engagements légaux sans les informations officielles de Cortex. Ne pas ouvrir le service au public avant leur revue/remplacement par le propriétaire ou son conseil juridique.

Les chaînes `manus-*` encore présentes dans quelques composables Vue sont uniquement des clés de lecture de paramètres locaux historiques, conservées pour migrer les préférences des utilisateurs vers les clés `cortex-*`; elles ne sont pas affichées dans l’interface. Le courriel hérité dans le pied de page juridique reste également à remplacer lors de la revue légale.

## Routage prévu

| Service | Racine | Entrée/build | Chemins publics |
| --- | --- | --- | --- |
| `site` | `.` | Next.js | `/`, `/workspace`, auth, pages du site |
| `workspace` | `cortex-platform/frontend` | `npm ci` puis `npm run build`, sortie `dist` | `/studio/*` |
| `agent_api` | `cortex-platform/backend` | FastAPI, `app.main:app` | `/api/v1/*`, y compris `/api/v1/ws/*` |

Le frontend Vite utilise la base `/studio/`; les appels API utilisent `/api/v1/*` et les WebSockets `/api/v1/ws/*`. Cette règle ciblée préserve les routes Next.js existantes sous `/api/*` (notamment paiement et authentification). Les WebSockets construisent une URL `wss://` absolue à partir de l’origine et de cette base API. Vercel Services conserve le chemin public visible par le code du service; le routage des fichiers statiques du frontend retire le préfixe `/studio` pour sélectionner les assets.

## Variables à configurer dans Vercel

Créer les variables séparément pour **Development**, **Preview** et **Production** selon l’environnement. Les noms ci-dessous ne sont pas des valeurs; ne jamais coller de secret dans Git ou dans ce document.

| Variable | Service | Requise | Rôle |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `site` | Oui | URL Supabase utilisée par le site |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `site` | Oui | Clé publique Supabase |
| `NEXT_PUBLIC_SITE_URL` | `site` | Recommandée | URL canonique du site Cortex |
| `NEXT_PUBLIC_CORTEX_STUDIO_URL` | `site` | Non | Laisser vide en production pour utiliser `/studio`; valeur locale type `http://localhost:5173` |
| `CORTEX_SSO_SECRET` | `site`, `agent_api` | Oui | Secret de signature/validation SSO identique des deux côtés |
| `CORS_ALLOWED_ORIGINS` | `agent_api` | Oui en production | Liste séparée par des virgules d’origines exactes autorisées; ex. `https://votre-domaine.example`, jamais `*` avec cookies |
| `CORTEX_BILLING_API_URL` | `site` | Si facturation activée | API compatible existante pour les routes Checkout/top-up/abonnement; ce service n’est pas encore inclus dans le backend FastAPI Cortex |
| `X_FRONTEND_KEY` | `site` | Si l’inscription legacy l’exige | Clé envoyée par la route d’inscription au service de facturation compatible |
| `NEXT_PUBLIC_TEST_MODE_ENABLED` | `site` | Recommandée | Définir `false` en Production afin d’éviter les chemins de paiement de test |
| `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` | `site` | Facultatives | Analytics PostHog si utilisé |
| `API_KEY` | `agent_api` | Oui | Clé d’accès au fournisseur de modèle |
| `API_BASE` | `agent_api` | Selon fournisseur | Endpoint compatible OpenAI, si applicable |
| `MODEL_PROVIDER` | `agent_api` | Recommandée | Fournisseur de modèle utilisé par le backend |
| `MODEL_NAME` | `agent_api` | Recommandée | Modèle choisi pour l’agent |
| `MONGODB_URI` | `agent_api` | Oui | URI MongoDB gérée, TLS activé en production |
| `MONGODB_DATABASE` | `agent_api` | Recommandée | Base Cortex (par défaut `cortex`) |
| `REDIS_HOST`, `REDIS_PORT` | `agent_api` | Oui | Endpoint Redis avec accès TCP compatible avec le client actuel |
| `REDIS_PASSWORD` | `agent_api` | Selon fournisseur | Secret Redis, si requis |
| `TASK_BACKEND`, `CELERY_BROKER_URL` | `agent_api` / worker externe | Après migration | Utiliser une file durable et un worker persistant; ne pas lancer un worker de fond dans une Function |
| `JWT_SECRET_KEY` | `agent_api` | Oui | Secret long et aléatoire pour les jetons de session |
| `SESSION_COOKIE_SECURE` | `agent_api` | Recommandée | Définir `true` en production HTTPS |
| `SANDBOX_IMAGE` / `SANDBOX_ADDRESS` | `agent_api` | Après migration | Configuration du fournisseur de sandbox; le mode Docker local ne fonctionne pas tel quel sur Vercel |

Le frontend Vue laisse `VITE_API_URL` vide en production pour appeler le même domaine. Les fournisseurs, identifiants de base, tokens et secrets de recherche facultatifs se configurent uniquement dans les variables d’environnement Vercel.

**Facturation :** les routes Next `/api/create-checkout-session`, `/api/create-topup-session`, `/api/cancel-subscription` et `/api/upgrade-subscription` appellent encore un service séparé via `CORTEX_BILLING_API_URL`. Le backend FastAPI Cortex n’expose pas actuellement ces endpoints Stripe. Il faut donc soit conserver une API compatible contrôlée et configurée, soit porter la facturation vers le code Cortex avant de prétendre que tout le backend est déployé ensemble. Les clés Stripe sont gérées par ce service distinct et ne doivent pas être ajoutées au frontend public.

Le backend courant parle à Redis via son client TCP. Avant de choisir un produit Marketplace, vérifier qu’il fournit TCP; un fournisseur REST-only demande une adaptation du client.

## Étapes Vercel

1. Créer ou sélectionner un projet Vercel, relier `Frankenstein-Labs/Cortex-official` et vérifier que la racine est le dépôt.
2. Activer/valider **Services (Beta)** pour le projet. Vérifier dans le tableau de bord que les trois services apparaissent après un déploiement Preview.
3. Provisionner MongoDB et Redis comme services managés et renseigner leurs URI/endpoints dans le service `agent_api`.
4. Ajouter les variables par environnement; ne pas recopier les secrets de développement en production.
5. Vercel WebSockets est en bêta (y compris Python ASGI) et requiert Fluid Compute. Confirmer l’activation et les limites de durée du projet; le client sait se reconnecter, tandis que l’état durable doit rester dans Redis/MongoDB.
6. **Ne pas ouvrir le chat aux utilisateurs** avant l’adaptateur de sandbox, le worker durable, la vérification des limites de durée/taille du bundle FastAPI, le CORS restreint et les tests d’isolation multi-utilisateur.
7. Après déploiement Preview, valider `/`, `/workspace`, `/studio/login`, `/api/v1/health`, l’authentification SSO et les WebSockets avec des comptes de test.

## Mises à jour après déploiement

Relier le dépôt Git à Vercel avec la branche de production appropriée : les commits et Pull Requests produisent des déploiements Preview; la fusion vers la branche de production publie une nouvelle version. Comme les trois services font partie du même déploiement Vercel Services, une modification du code déclenche un nouveau build/déploiement de l’ensemble concerné; elle ne modifie pas rétroactivement une session déjà ouverte dans le navigateur. Les nouvelles variables d’environnement prennent effet au prochain déploiement. Garder les changements dans Git plutôt que modifier les fichiers de sortie (`dist`, `.next`) à la main.

## Scripts/builds

Chaque service a son propre build, piloté par `vercel.json` :

- `site`: dépendances Yarn du dépôt, build Next.js (`yarn build`).
- `workspace`: `npm ci`, puis `npm run build` depuis `cortex-platform/frontend`.
- `agent_api`: build FastAPI depuis `cortex-platform/backend`, point d’entrée `app.main:app`; les dépendances Python sont déclarées dans `pyproject.toml`.

Docker Compose reste le démarrage local et n’est pas un script de déploiement Vercel. Vercel ne traduit pas automatiquement `docker-compose.yml`, les volumes, `depends_on` ou le montage de `/var/run/docker.sock`.

## Références officielles

- [Vercel Services](https://vercel.com/docs/services)
- [Routage entre services](https://vercel.com/docs/services/routing)
- [Configuration des services](https://vercel.com/docs/services/config-reference)
- [FastAPI sur Vercel](https://vercel.com/docs/frameworks/backend/fastapi)
- [WebSockets sur Vercel Functions](https://vercel.com/docs/functions/websockets)
- [Vercel Sandbox](https://vercel.com/docs/sandbox)
- [Référence du SDK Python Vercel Sandbox](https://vercel.com/docs/sandbox/python-sdk-reference)
- [Correspondance Docker Compose → Vercel](https://vercel.com/kb/guide/docker-compose-concepts-on-vercel)
