import type { INodeProperties } from 'n8n-workflow';
import { getCursorPaginator } from './functions';

export const redditOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['reddit'],
			},
		},
		options: [
			{
				name: 'Get Subreddit Posts',
				value: 'getSubredditPosts',
				action: 'Get a subreddit s posts',
				description: "Get a subreddit's posts",
				routing: {
					request: {
						method: 'GET',
						url: 'v1/reddit/subreddit',
						qs: {
							subreddit: '={{$parameter.subreddit}}',
							sort: '={{$parameter.additionalFields.sort}}',
							timeframe: '={{$parameter.additionalFields.timeframe}}',
							trim: true,
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('posts', 'after'),
					},
				},
			},
			{
				name: 'Get Post Comments',
				value: 'getRedditPostComments',
				action: 'Get a post s comments',
				description: "Get a post's comments",
				routing: {
					request: {
						method: 'GET',
						url: 'v1/reddit/post/comments',
						qs: {
							url: '={{$parameter.url}}',
							trim: true,
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('comments', 'more.cursor'),
					},
				},
			},
			{
				name: 'Search Reddit',
				value: 'searchReddit',
				action: 'Search reddit',
				description: 'Search Reddit for posts',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/reddit/search',
						qs: {
							query: '={{$parameter.query}}',
							timeframe: '={{$parameter.additionalFields.timeframe}}',
							sort: '={{$parameter.additionalFields.sort}}',
							trim: true,
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('posts', 'after'),
					},
				},
			},
		],
		default: 'getSubredditPosts',
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
				operation: ['searchReddit', 'getSubredditPosts', 'getRedditPostComments'],
			},
		},
	},
	{
		displayName: 'Subreddit',
		name: 'subreddit',
		type: 'string',
		required: true,
		description: 'The subreddit to get posts from',
		default: 'AskReddit',
		displayOptions: {
			show: {
				operation: ['getSubredditPosts'],
			},
		},
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		description: 'The URL of the post to get comments from',
		displayOptions: {
			show: {
				operation: ['getRedditPostComments'],
			},
		},
		default: '',
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		description: 'The query to search Reddit for',
		displayOptions: {
			show: {
				operation: ['searchReddit'],
			},
		},
		default: 'dogs',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				operation: ['getSubredditPosts', 'searchReddit'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Time Frame',
				name: 'timeframe',
				type: 'options',
				description: 'The time frame to get posts from',
				default: 'all',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Day',
						value: 'day',
					},
					{
						name: 'Month',
						value: 'month',
					},
					{
						name: 'Week',
						value: 'week',
					},
					{
						name: 'Year',
						value: 'year',
					},
				],
			},
			{
				displayName: 'Sort By',
				name: 'sort',
				type: 'options',
				description: 'The sort order to get posts from',
				default: 'best',
				options: [
					{
						name: 'Best',
						value: 'best',
					},
					{
						name: 'Hot',
						value: 'hot',
					},
					{
						name: 'New',
						value: 'new',
					},
					{
						name: 'Rising',
						value: 'rising',
					},
					{
						name: 'Top',
						value: 'top',
					},
				],
			},
		],
	},
];
