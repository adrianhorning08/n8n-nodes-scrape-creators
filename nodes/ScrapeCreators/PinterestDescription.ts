import type { INodeProperties } from 'n8n-workflow';
import { getCursorPaginator } from './functions';

export const pinterestOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'searchPinterest',
		displayOptions: {
			show: {
				resource: ['pinterest'],
			},
		},
		options: [
			{
				name: 'Search Pinterest',
				value: 'searchPinterest',
				action: 'Search pinterest',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/pinterest/search',
						qs: {
							query: '={{$parameter.query}}',
							trim: true,
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('pins', 'cursor'),
					},
				},
			},
			{
				name: 'Get Pinterest Pin',
				value: 'getPinterestPin',
				action: 'Get pinterest pin',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/pinterest/pin',
						qs: {
							url: '={{$parameter.url}}',
							trim: true,
						},
					},
				},
			},
			{
				name: 'Get Pinterest User Boards',
				value: 'getPinterestUserBoards',
				action: 'Get a user s boards',
				description: "Get a user's boards",
				routing: {
					request: {
						method: 'GET',
						url: 'v1/pinterest/user/boards',
						qs: {
							handle: '={{$parameter.handle}}',
							trim: true,
						},
					},
				},
			},
			{
				name: 'Get Pinterest Board Pins',
				value: 'getPinterestBoardPins',
				action: 'Get a board s pins',
				description: "Get a board's pins",
				routing: {
					request: {
						method: 'GET',
						url: 'v1/pinterest/board',
						qs: {
							url: '={{$parameter.url}}',
							trim: true,
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('pins', 'cursor'),
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
				operation: ['searchPinterest'],
			},
		},
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		description: 'The URL of the pinterest pin',
		default: 'https://www.pinterest.com/pin/202239839512438362/',
		displayOptions: {
			show: {
				operation: ['getPinterestPin'],
			},
		},
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		description: 'The URL of the pinterest board',
		default: 'https://www.pinterest.com/florenceescup/animal/',
		displayOptions: {
			show: {
				operation: ['getPinterestBoardPins'],
			},
		},
	},
	{
		displayName: 'Handle',
		name: 'handle',
		type: 'string',
		required: true,
		description:
			'The handle of the pinterest user (e.g. broadstbullycom from https://www.pinterest.com/broadstbullycom/)',
		default: 'broadstbullycom',
		displayOptions: {
			show: {
				operation: ['getPinterestUserBoards'],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		required: true,
		type: 'number',
		typeOptions: {
			// minValue: 1,
			// maxValue: 60,
		},
		default: 20,
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				operation: ['searchPinterest', 'getPinterestBoardPins', 'getPinterestUserBoards'],
			},
		},
	},
];
