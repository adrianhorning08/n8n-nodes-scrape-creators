import type { INodeProperties } from 'n8n-workflow';
import { getCursorPaginator } from './functions';

export const tiktokOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tiktok'],
			},
		},
		options: [
			{
				name: 'Get Profile',
				value: 'getTikTokProfile',
				action: 'Get tik tok profile',
				description: 'Get a TikTok profile',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/tiktok/profile',
						qs: {
							handle: '={{$parameter.handle}}',
						},
					},
				},
			},
			{
				name: "Get Profile's Videos",
				value: 'getTikTokProfileVideos',
				action: 'Get a tik tok profile s videos',
				description: "Get a TikTok profile's videos",
				routing: {
					request: {
						method: 'GET',
						url: 'v3/tiktok/profile/videos',
						qs: {
							handle: '={{$parameter.handle}}',
							trim: true,
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('aweme_list', 'max_cursor'),
					},
				},
			},
			{
				name: 'Get TikTok Video',
				value: 'getTikTokVideo',
				action: 'Get a tik tok video',
				description: 'Get a TikTok video',
				routing: {
					request: {
						method: 'GET',
						url: 'v2/tiktok/video',
						qs: {
							url: '={{$parameter.url}}',
							trim: true,
						},
					},
				},
			},
			{
				name: 'Get TikTok Video Transcript',
				value: 'getTikTokVideoTranscript',
				action: 'Get a tik tok video transcript',
				description: 'Get a TikTok video transcript',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/tiktok/video/transcript',
						qs: {
							url: '={{$parameter.url}}',
						},
					},
				},
			},
			{
				name: 'Get TikTok Video Comments',
				value: 'getTikTokVideoComments',
				action: 'Get a tik tok video comments',
				description: 'Get a TikTok video comments',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/tiktok/video/comments',
						qs: {
							url: '={{$parameter.url}}',
							trim: true,
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('comments', 'cursor'),
					},
				},
			},
			{
				name: 'Get TikTok Following',
				value: 'getTikTokFollowing',
				action: 'Get a tik tok following',
				description: 'Get a TikTok following',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/tiktok/user/following',
						qs: {
							handle: '={{$parameter.handle}}',
							trim: true,
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('followings', 'min_time'),
					},
				},
			},
			{
				name: 'Get TikTok Followers',
				value: 'getTikTokFollowers',
				action: 'Get a tik tok followers',
				description: 'Get a TikTok followers',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/tiktok/user/followers',
						qs: {
							handle: '={{$parameter.handle}}',
							trim: true,
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('followers', 'min_time'),
					},
				},
			},
			{
				name: 'Search TikTok Users',
				value: 'searchTikTokUsers',
				action: 'Search tik tok users',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/tiktok/search/users',
						qs: {
							query: '={{$parameter.query}}',
							trim: true,
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('users', 'cursor'),
					},
				},
			},
			{
				name: "Search TikTok's by Hashtag",
				value: 'searchTikTokByHashtag',
				action: 'Search tik tok by hashtag',
				description: 'Search TikTok by hashtag',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/tiktok/search/hashtag',
						qs: {
							hashtag: '={{$parameter.hashtag}}',
							trim: true,
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('aweme_list', 'cursor'),
					},
				},
			},
			{
				name: "Search TikTok's by Keyword",
				value: 'searchTikTokByKeyword',
				action: 'Search tik tok by keyword',
				description: 'Search TikTok by keyword',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/tiktok/search/keyword',
						qs: {
							query: '={{$parameter.query}}',
							trim: true,
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('search_item_list', 'cursor'),
					},
				},
			},
		],
		default: 'getTikTokProfile',
	},
	{
		displayName: 'Handle',
		name: 'handle',
		type: 'string',
		required: true,
		description: 'The handle (or username) of the user (without the @)',
		default: 'stoolpresidente',
		displayOptions: {
			show: {
				operation: [
					'getTikTokProfile',
					'getTikTokProfileVideos',
					'getTikTokFollowing',
					'getTikTokFollowers',
				],
			},
		},
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		description: 'The URL of the video',
		default: 'https://www.tiktok.com/@stoolpresidente/video/7515167006698573099',
		displayOptions: {
			show: {
				operation: ['getTikTokVideo', 'getTikTokVideoTranscript', 'getTikTokVideoComments'],
			},
		},
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		description: 'What to search for',
		default: 'adrian',
		displayOptions: {
			show: {
				operation: ['searchTikTokUsers', 'searchTikTokByKeyword'],
			},
		},
	},
	{
		displayName: 'Hashtag',
		name: 'hashtag',
		type: 'string',
		description: 'The hashtag to search for (without the #)',
		default: 'fun',
		displayOptions: {
			show: {
				operation: ['searchTikTokByHashtag'],
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
		// 	maxValue: 1000,
		// },
		default: 50,
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				operation: [
					'getTikTokProfileVideos',
					'getTikTokFollowing',
					'getTikTokFollowers',
					'getTikTokVideoComments',
					'searchTikTokUsers',
					'searchTikTokByKeyword',
					'searchTikTokByHashtag',
				],
			},
		},
	},
];
