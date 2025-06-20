import type { INodeProperties } from 'n8n-workflow';

export const googleSearchOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'searchGoogle',
		displayOptions: {
			show: {
				resource: ['googleSearch'],
			},
		},
		options: [
			{
				name: 'Search Google',
				value: 'searchGoogle',
				action: 'Search google',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/google/search',
						qs: {
							query: '={{$parameter.query}}',
						},
					},
				},
			},
		],
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		description: 'The query to search for',
		default: 'dogs',
		displayOptions: {
			show: {
				operation: ['searchGoogle'],
			},
		},
	},
];
