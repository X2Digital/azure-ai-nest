import { AIProjectsClient } from '@azure/ai-projects';
import { DefaultAzureCredential } from '@azure/identity';
import type { AzureAiModuleOptions } from './azure-ai.interfaces';

export function buildClient(opts: AzureAiModuleOptions): AIProjectsClient {
  const cred = new DefaultAzureCredential();

  if ('connectionString' in opts) {
    return AIProjectsClient.fromConnectionString(opts.connectionString, cred);
  }

  if (!opts.endpoint) {
    throw new Error('Endpoint is required');
  }

  return new AIProjectsClient(
    opts.endpoint,
    opts.subscriptionId,
    opts.resourceGroupName,
    opts.projectName,
    cred,
  );
}
