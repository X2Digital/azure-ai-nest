import type { FactoryProvider, ModuleMetadata } from '@nestjs/common/interfaces';
import type { TokenCredential } from '@azure/identity';
import type { Type } from '@nestjs/common';

export type AzureAiModuleOptions =
  | AzureAiModuleOptionsConnectionString
  | AzureAiModuleOptionsDefault;

export interface AzureAiModuleOptionsDefault {
  endpoint: string;
  subscriptionId: string;
  resourceGroupName: string;
  projectName: string;
  credential: TokenCredential;
}

export interface AzureAiModuleOptionsConnectionString {
  connectionString: string;
}

export interface AzureAiModuleOptionsFactory {
  createFirebaseModuleOptions(): Promise<AzureAiModuleOptions> | AzureAiModuleOptions;
}

export type AzureAiModuleAsyncOptions = {
  useClass?: Type<AzureAiModuleOptionsFactory>;
  useFactory?: (...args: unknown[]) => Promise<AzureAiModuleOptions> | AzureAiModuleOptions;
  inject?: FactoryProvider<AzureAiModuleOptions>['inject'];
  useExisting?: Type<AzureAiModuleOptionsFactory>;
} & Pick<ModuleMetadata, 'imports'>;
