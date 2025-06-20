import type { INodeProperties } from 'n8n-workflow';

export const linkedinOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['linkedin'],
			},
		},
		options: [
			{
				name: 'Get LinkedIn Profile',
				value: 'getLinkedinProfile',
				action: 'Get a linked in profile',
				description: 'Get a LinkedIn profile',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/linkedin/profile',
						qs: {
							url: '={{$parameter.url}}',
						},
					},
				},
			},
			{
				name: 'Get LinkedIn Company Page',
				value: 'getLinkedinCompanyPage',
				action: 'Get a linked in company page',
				description: 'Get a LinkedIn company page',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/linkedin/company',
						qs: {
							url: '={{$parameter.url}}',
						},
					},
				},
			},
			{
				name: 'Get LinkedIn Post',
				value: 'getLinkedinPost',
				action: 'Get a linked in post',
				description: 'Get a LinkedIn post',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/linkedin/post',
						qs: {
							url: '={{$parameter.url}}',
						},
					},
				},
			},
		],
		default: 'getLinkedinProfile',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		description: 'The URL of the LinkedIn profile',
		default: '',
		displayOptions: {
			show: {
				operation: ['getLinkedinProfile', 'getLinkedinCompanyPage', 'getLinkedinPost'],
			},
		},
	},
];
