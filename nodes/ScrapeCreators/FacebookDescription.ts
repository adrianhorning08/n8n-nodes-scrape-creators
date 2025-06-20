import type { INodeProperties } from 'n8n-workflow';
import { getCursorPaginator } from './functions';

export const facebookOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['facebook'],
			},
		},
		options: [
			{
				name: 'Get Facebook Profile',
				value: 'getFacebookProfile',
				action: 'Get a facebook profile',
				description: 'Get a Facebook profile',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/facebook/profile',
						qs: {
							url: '={{$parameter.url}}',
						},
					},
				},
			},
			{
				name: 'Get Facebook Profile Posts',
				value: 'getFacebookProfilePosts',
				action: 'Get a facebook profile posts',
				description: 'Get a Facebook profile posts',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/facebook/profile/posts',
						qs: {
							url: '={{$parameter.url}}',
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('posts', 'cursor'),
					},
				},
			},
			{
				name: 'Get Facebook Group Posts',
				value: 'getFacebookGroupPosts',
				action: 'Get a facebook group posts',
				description: 'Get a Facebook group posts',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/facebook/group/posts',
						qs: {
							url: '={{$parameter.url}}',
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('posts', 'cursor'),
					},
				},
			},
			{
				name: 'Get Reel',
				value: 'getReel',
				action: 'Get a facebook reel',
				description: 'Get a Facebook reel',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/facebook/user/reel',
						qs: {
							url: '={{$parameter.url}}',
						},
					},
				},
			},
			{
				name: 'Get Facebook Post',
				value: 'getFacebookPost',
				action: 'Get a facebook post',
				description: 'Get a Facebook post',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/facebook/user/post',
						qs: {
							url: '={{$parameter.url}}',
						},
					},
				},
			},
			{
				name: 'Get Transcript',
				value: 'getTranscript',
				action: 'Get a facebook transcript',
				description: 'Get the transcript of a post or reel',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/facebook/post/transcript',
						qs: {
							url: '={{$parameter.url}}',
						},
					},
				},
			},
		],
		default: 'getFacebookProfile',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		description: 'The URL of the Facebook profile',
		default: '',
		displayOptions: {
			show: {
				operation: [
					'getFacebookProfile',
					'getFacebookProfilePosts',
					'getFacebookGroupPosts',
					'getReel',
					'getFacebookPost',
					'getTranscript',
				],
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
		default: 50,
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				operation: ['getFacebookProfilePosts', 'getFacebookGroupPosts'],
			},
		},
	},
];
