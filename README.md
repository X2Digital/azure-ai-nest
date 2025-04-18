# @x2d/azure-ai-nest

> Global NestJS module that wraps **[@azure/ai-projects]** so you can inject an `AIProjectsClient` anywhere in your app with one line of code.

[![npm](https://img.shields.io/npm/v/@x2d/azure-ai-nest)](https://www.npmjs.com/package/@x2d/azure-ai-nest)
[![CI](https://github.com/x2digital/azure-ai-nest/actions/workflows/ci.yml/badge.svg)](https://github.com/x2digital/azure-ai-nest)
![node-current](https://img.shields.io/node/v/@x2d/azure-ai-nest)
[![Downloads](https://img.shields.io/npm/dm/@x2d/azure-ai-nest.svg)](https://www.npmjs.com/package/@your-scope/azure-ai-nest)
[![License](https://img.shields.io/npm/l/@x2d/azure-ai-nest.svg)](LICENSE)
[![Coverage](https://img.shields.io/codecov/c/github/x2digital/azure-ai-nest)](https://codecov.io/gh/x2digital/azure-ai-nest)


---

## ✨ Why use it?

* **One‑liner** registration (`forRoot` / `forRootAsync`).
* Works with **connection string _or_ endpoint + credential**.
* Exposes a single, typed **injection token** (`AZURE_AI_CLIENT`).
* Fully compatible with **Nest 10 (CJS)** **and** **Nest 11+ (ESM)**.
* Auto‑disposes the SDK on app shutdown to free sockets (handy in tests).

---

## 🚀 Installation

```bash
# choose your package manager
npm i @x2d/azure-ai-nest
```

> `@nestjs/common` ≥ 10 is listed as a *peer* dependency – it’s already in every Nest project.

---

## ⚡️ Quick start

### 1 – Register the module

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { AzureAiModule } from '@x2d/azure-ai-nest';

@Module({
  imports: [
    // ✅ Sync factory (hard‑coded)
    AzureAiModule.forRoot({ connectionString: process.env.AZURE_AI_PROJECTS_CONNECTION_STRING! }),

    // ✅ or Async factory (config service, secrets, etc.)
    /*
    AzureAiModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        endpoint: cfg.get<string>('AZURE_AI_PROJECTS_CONNECTION_STRING'),
        credential: undefined, // fallback to DefaultAzureCredential chain
      }),
    }),
    */
  ],
})
export class AppModule {}
```

### 2 – Inject the client anywhere

```ts
@Injectable()
export class MyService {
  constructor(@Inject(AZURE_AI_CLIENT) private readonly ai: AIProjectsClient) {}

  async listProjects() {
    return this.ai.listProjects();
  }
}
```

---

## 🛠 API

| Option                 | Type                         | Default | Notes |
|------------------------|------------------------------|---------|-------|
| `connectionString`     | `string`                     | –       | Typical **Key + Endpoint** string. |
| `endpoint`             | `string`                     | –       | HTTPS endpoint, e.g. `https://my-ai-projects.eastus.azure.com`. |
| `credential`           | `TokenCredential`            | `new DefaultAzureCredential()` | Pass a custom cred (Managed Identity, ClientSecret, etc.). |

*If both `connectionString` **and** `endpoint` are omitted the SDK will follow its normal env‑var / managed‑identity discovery.*

---

## 🧪 Development

```bash
# lint & type‑check (optional)
npm run lint

# unit tests
npm test

# build ESM + CJS + d.ts (dist/)
npm build
```

The project uses **[tsup]** for a zero‑config bundle and **Jest** for tests. Feel free to swap for your favourites.

---

## 📦 Publishing

```bash
npm version patch  # or minor / major
npm publish --access public
```

The `prepublishOnly` hook runs `build` and `test` to guarantee a clean artifact.

---

## 💡 Extending

Need retries, logging, custom policies?  Fork or simply duplicate `buildClient()` in *src/azure-ai.module.ts* and add decorators from the Azure SDK core.

---

## 📝 License

MIT © X2D

