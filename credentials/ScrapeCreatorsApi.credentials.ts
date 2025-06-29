import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class ScrapeCreatorsApi implements ICredentialType {
	name = 'scrapeCreatorsApi';
	displayName = 'Scrape Creators API';
	documentationUrl = 'https://docs.scrapecreators.com/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
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

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.scrapecreators.com',
			url: '/v1/tiktok/profile',
			headers: {
				'X-API-KEY': '={{ $credentials.apiKey }}',
			},
			qs: {
				handle: 'therock',
			},
		},
	};
}
