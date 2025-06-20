import type { INodeProperties } from 'n8n-workflow';
import { getCursorPaginator } from './functions';

export const youtubeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['youtube'],
			},
		},
		options: [
			{
				name: 'Get YouTube Channel Details',
				value: 'getYouTubeChannelDetails',
				action: 'Get a you tube channel details',
				description: 'Get a YouTube channel details',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/youtube/channel',
						qs: {
							handle: '={{$parameter.handle}}',
							channelId: '={{$parameter.channelId}}',
						},
					},
				},
			},
			{
				name: 'Get YouTube Channel Videos',
				value: 'getYouTubeChannelVideos',
				action: 'Get a you tube channel videos',
				description: 'Get a YouTube channel videos',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/youtube/channel-videos',
						qs: {
							handle: '={{$parameter.handle}}',
							channelId: '={{$parameter.channelId}}',
							sort: '={{$parameter.additionalFields.sort}}',
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('videos', 'continuationToken'),
					},
				},
			},
			{
				name: 'Get YouTube Channel Shorts',
				value: 'getYouTubeChannelShorts',
				action: 'Get a you tube channel shorts',
				description: 'Get a YouTube channel shorts',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/youtube/channel/shorts',
						qs: {
							handle: '={{$parameter.handle}}',
							channelId: '={{$parameter.channelId}}',
							sort: '={{$parameter.additionalFields.sort}}',
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('shorts', 'continuationToken'),
					},
				},
			},
			{
				name: 'Get YouTube Video Details',
				value: 'getYouTubeVideoDetails',
				action: 'Get a you tube video details',
				description: 'Get a YouTube video details',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/youtube/video',
						qs: {
							url: '={{$parameter.url}}',
						},
					},
				},
			},
			{
				name: 'Get YouTube Video Transcript',
				value: 'getYouTubeVideoTranscript',
				action: 'Get a you tube video transcript',
				description: 'Get a YouTube video transcript',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/youtube/video/transcript',
						qs: {
							url: '={{$parameter.url}}',
						},
					},
				},
			},
			{
				name: 'Search YouTube Videos by Keyword',
				value: 'searchYouTubeVideosByKeyword',
				action: 'Search you tube videos',
				description: 'Search YouTube videos',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/youtube/search',
						qs: {
							query: '={{$parameter.query}}',
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('videos', 'continuationToken'),
					},
				},
			},
			{
				name: 'Search YouTube Videos by Hashtag',
				value: 'searchYouTubeVideosByHashtag',
				action: 'Search you tube videos by hashtag',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/youtube/search/hashtag',
						qs: {
							hashtag: '={{$parameter.hashtag}}',
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('videos', 'continuationToken'),
					},
				},
			},
			{
				name: 'Get Comments',
				value: 'getComments',
				action: 'Get comments',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/youtube/video/comments',
						qs: {
							url: '={{$parameter.url}}',
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('comments', 'continuationToken'),
					},
				},
			},
		],
		default: 'getYouTubeChannelDetails',
	},
	{
		displayName: 'Handle',
		name: 'handle',
		type: 'string',
		description: 'The handle of the youtube channel (without the @)',
		default: 'ThePatMcAfeeShow',
		displayOptions: {
			show: {
				operation: [
					'getYouTubeChannelDetails',
					'getYouTubeChannelVideos',
					'getYouTubeChannelShorts',
				],
			},
		},
	},
	{
		displayName: 'Channel ID',
		name: 'channelId',
		type: 'string',
		description: 'The ID of the youtube channel',
		default: '',
		displayOptions: {
			show: {
				operation: [
					'getYouTubeChannelDetails',
					'getYouTubeChannelVideos',
					'getYouTubeChannelShorts',
				],
			},
		},
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		description: 'The URL of the YouTube video',
		default: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
		displayOptions: {
			show: {
				operation: ['getYouTubeVideoDetails', 'getYouTubeVideoTranscript', 'getComments'],
			},
		},
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		description: 'The query to search for',
		default: 'Funny videos',
		displayOptions: {
			show: {
				operation: ['searchYouTubeVideosByKeyword'],
			},
		},
	},
	{
		displayName: 'Hashtag',
		name: 'hashtag',
		type: 'string',
		description: 'The hashtag to search for',
		default: 'funny',
		displayOptions: {
			show: {
				operation: ['searchYouTubeVideosByHashtag'],
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
				operation: [
					'getYouTubeChannelVideos',
					'getYouTubeChannelShorts',
					'searchYouTubeVideosByKeyword',
					'searchYouTubeVideosByHashtag',
					'getComments',
				],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		description: 'Additional fields to return',
		default: {},
		displayOptions: {
			show: {
				operation: ['getYouTubeChannelVideos', 'getYouTubeChannelShorts'],
			},
		},
		options: [
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				description: 'The sort order of the youtube channel videos',
				default: 'newest',
				options: [
					{
						name: 'Newest',
						value: 'newest',
					},
					{
						name: 'Popular',
						value: 'popular',
					},
				],
			},
		],
	},
];
