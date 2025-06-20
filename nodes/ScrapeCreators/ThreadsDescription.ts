import type { INodeProperties } from 'n8n-workflow';

export const threadsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getThreadsProfile',
		displayOptions: {
			show: {
				resource: ['threads'],
			},
		},
		options: [
			{
				name: 'Get Threads Profile',
				value: 'getThreadsProfile',
				action: 'Get threads profile',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/threads/profile',
						qs: {
							handle: '={{$parameter.handle}}',
						},
					},
				},
			},
			{
				name: 'Get Threads User Posts',
				value: 'getThreadsUserPosts',
				action: 'Get threads user posts',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/threads/user/posts',
						qs: {
							handle: '={{$parameter.handle}}',
							trim: true,
						},
					},
				},
			},
			{
				name: 'Get Threads Post',
				value: 'getThreadsPost',
				action: 'Get threads post',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/threads/post',
						qs: {
							url: '={{$parameter.url}}',
							trim: true,
						},
					},
				},
			},
			{
				name: 'Search Threads',
				value: 'searchThreads',
				action: 'Search threads',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/threads/search',
						qs: {
							query: '={{$parameter.query}}',
							trim: true,
						},
					},
				},
			},
		],
	},
	{
		displayName: 'Handle',
		name: 'handle',
		type: 'string',
		required: true,
		description: 'The handle of the threads profile',
		default: 'zuck',
		displayOptions: {
			show: {
				operation: ['getThreadsProfile', 'getThreadsUserPosts'],
			},
		},
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		description: 'The URL of the threads post',
		default: 'https://www.threads.com/@zuck/post/DKudiKcRO4i',
		displayOptions: {
			show: {
				operation: ['getThreadsPost'],
			},
		},
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
				operation: ['searchThreads'],
			},
		},
	},
];
