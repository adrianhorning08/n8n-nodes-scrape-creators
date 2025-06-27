import type { INodeProperties } from 'n8n-workflow';
import { getCursorPaginator, simplifyIGTranscriptResponse } from './functions';

export const instagramOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['instagram'],
			},
		},
		options: [
			{
				name: 'Get Profile',
				value: 'getInstagramProfile',
				action: 'Get instagram profile',
				description: 'Get an Instagram profile',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/instagram/profile',
						qs: {
							handle: '={{$parameter.handle}}',
							trim: true,
						},
					},
				},
			},
			{
				name: "Get User's Posts",
				value: 'getInstagramUserPosts',
				action: 'Get an instagram user s posts',
				description: "Get an Instagram user's posts",
				routing: {
					request: {
						method: 'GET',
						url: 'v2/instagram/user/posts',
						qs: {
							handle: '={{$parameter.handle}}',
							trim: true,
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('items', 'next_max_id'),
					},
				},
			},
			{
				name: 'Get Post',
				value: 'getInstagramPost',
				action: 'Get an instagram post',
				description: 'Get an Instagram post or reel',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/instagram/post',
						qs: {
							url: '={{$parameter.url}}',
							trim: true,
						},
					},
				},
			},
			{
				name: 'Get Post Transcript',
				value: 'getInstagramPostTranscript',
				action: 'Get an instagram post transcript',
				description: 'Get an Instagram post transcript',
				routing: {
					request: {
						method: 'GET',
						url: 'v2/instagram/media/transcript',
						qs: {
							url: '={{$parameter.url}}',
						},
					},
					output: {
						postReceive: [simplifyIGTranscriptResponse],
					},
				},
			},
			{
				name: "Get User's Reels",
				value: 'getInstagramUserReels',
				action: 'Get an instagram user s reels',
				description: "Get an Instagram user's reels",
				routing: {
					request: {
						method: 'GET',
						url: 'v1/instagram/user/reels',
						qs: {
							handle: '={{$parameter.handle}}',
							trim: true,
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('items', 'paging_info.max_id'),
					},
				},
			},
			{
				name: "Get User's Story Highlights",
				value: 'getInstagramUserStoryHighlights',
				action: 'Get an instagram user s story highlights',
				description: "Get an Instagram user's story highlights",
				routing: {
					request: {
						method: 'GET',
						url: 'v1/instagram/user/highlights',
						qs: {
							handle: '={{$parameter.handle}}',
						},
					},
				},
			},
		],
		default: 'getInstagramProfile',
	},
	{
		displayName: 'Handle',
		name: 'handle',
		type: 'string',
		required: true,
		description: 'The handle (or username) of the user (without the @)',
		default: 'adrianhorning',
		displayOptions: {
			show: {
				operation: [
					'getInstagramProfile',
					'getInstagramUserPosts',
					'getInstagramUserReels',
					'getInstagramUserStoryHighlights',
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
			minValue: 1,
		},
		// typeOptions: {
		// 	minValue: 1,
		// 	maxValue: 60,
		// },
		default: 20,
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				operation: ['getInstagramUserReels', 'getInstagramUserPosts'],
			},
		},
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		description: 'The URL of the post or reel',
		default: 'https://www.instagram.com/reel/C306aQhvZh6/',
		displayOptions: {
			show: {
				operation: ['getInstagramPost', 'getInstagramPostTranscript'],
			},
		},
	},
];
