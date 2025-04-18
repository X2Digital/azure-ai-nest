import { AIProjectsClient } from '@azure/ai-projects';
import { Global, Module } from '@nestjs/common';
import type {
  AzureAiModuleOptions,
  AzureAiModuleOptionsFactory,
  AzureAiModuleAsyncOptions,
} from './azure-ai.interfaces';
import type { ClassProvider, DynamicModule, Provider } from '@nestjs/common';
import { AZURE_AI_CLIENT } from './azure-ai.constants';
import { buildClient } from './azure-ai.utils';

@Global()
@Module({})
export class AzureAiModule {
  /** ========== SYNC ========== */
  static forRoot(options: AzureAiModuleOptions): DynamicModule {
    const provider: Provider<AIProjectsClient> = {
      provide: AZURE_AI_CLIENT,
      useValue: buildClient(options),
    };

    return {
      exports: [provider],
      module: AzureAiModule,
      providers: [provider],
    };
  }

  /** ========== ASYNC ========== */
  static forRootAsync(asyncOptions: AzureAiModuleAsyncOptions): DynamicModule {
    const azureAiProvider: Provider = {
      inject: asyncOptions.inject ?? [],
      provide: AZURE_AI_CLIENT,
      useFactory: (options: AzureAiModuleOptions) => buildClient(options),
    };
    const asyncProviders = AzureAiModule.createAsyncProviders(asyncOptions);

    return {
      module: AzureAiModule,
      imports: [...(asyncOptions.imports || [])],
      providers: [...asyncProviders, azureAiProvider],
      exports: [azureAiProvider],
    };
  }

  private static createAsyncProviders(options: AzureAiModuleAsyncOptions): Provider[] {
    if (options.useFactory || options.useExisting) {
      return [AzureAiModule.createAsyncOptionsProvider(options)];
    }

    return [
      AzureAiModule.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
        inject: options.inject,
      } as ClassProvider,
    ];
  }

  private static createAsyncOptionsProvider(options: AzureAiModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: AZURE_AI_CLIENT,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: AZURE_AI_CLIENT,
      useFactory: async (
        optionsFactory: AzureAiModuleOptionsFactory,
      ): Promise<AzureAiModuleOptions> => await optionsFactory.createFirebaseModuleOptions(),
      inject: options.useClass ? [options.useClass] : [],
    };
  }
}