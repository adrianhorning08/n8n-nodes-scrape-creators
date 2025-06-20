import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class ScrapeCreatorsApi implements ICredentialType {
	name = 'scrapeCreatorsApi';
	displayName = 'Scrape Creators API';
	documentationUrl = 'https://docs.scrapecreators.com/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-KEY': '={{$credentials.apiKey}}',
			},
		},
	};
}
