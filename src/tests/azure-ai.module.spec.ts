import { Test } from '@nestjs/testing';
import { AzureAiModule } from './azure-ai.module';
import { AZURE_AI_CLIENT } from './azure-ai.constants';

describe('AzureAiModule', () => {
  it('should register forRoot with provider', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AzureAiModule.forRoot({ connectionString: 'test-connection-string' })],
    }).compile();

    const client = moduleRef.get(AZURE_AI_CLIENT);
    expect(client).toBeDefined();
  });

  it('should register forRootAsync with provider', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AzureAiModule.forRootAsync({
          useFactory: async () => ({
            connectionString: 'test-connection-string',
          }),
        }),
      ],
    }).compile();

    const client = moduleRef.get(AZURE_AI_CLIENT);
    expect(client).toBeDefined();
  });
});
