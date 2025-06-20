import type { INodeProperties } from 'n8n-workflow';

export const twitterOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['twitter'],
			},
		},
		options: [
			{
				name: 'Get Twitter Profile',
				value: 'getTwitterProfile',
				action: 'Get a twitter profile',
				description: 'Get a Twitter profile',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/twitter/profile',
						qs: {
							handle: '={{$parameter.handle}}',
						},
					},
				},
			},
			{
				name: 'Get User Tweets',
				value: 'getUserTweets',
				action: 'Get a user s tweets',
				description:
					"Get a user's tweets. This won't be their latest tweets, but will be 100 of their most popular tweets.",
				routing: {
					request: {
						method: 'GET',
						url: 'v1/twitter/user-tweets',
						qs: {
							handle: '={{$parameter.handle}}',
							trim: true,
						},
					},
				},
			},
			{
				name: 'Get Tweet Details',
				value: 'getTweetDetails',
				action: 'Get a tweet s details',
				description: "Get a tweet's details",
				routing: {
					request: {
						method: 'GET',
						url: 'v1/twitter/tweet',
						qs: {
							url: '={{$parameter.url}}',
							trim: true,
						},
					},
				},
			},
			// {
			// 	name: 'Get Transcript',
			// 	value: 'getTweetTranscript',
			// 	action: "Get a tweet's transcript",
			// 	description: "Get a tweet's transcript",
			// 	routing: {
			// 		request: {
			// 			method: 'GET',
			// 			url: 'v1/twitter/tweet/transcript',
			// 			qs: {
			// 				url: '={{$parameter.url}}',
			// 			},
			// 		},
			// 	},
			// },
		],
		default: 'getTwitterProfile',
	},
	{
		displayName: 'Handle',
		name: 'handle',
		type: 'string',
		required: true,
		description: 'The handle of the Twitter profile to get (without the @)',
		default: 'elonmusk',
		displayOptions: {
			show: {
				operation: ['getTwitterProfile', 'getUserTweets'],
			},
		},
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		description: 'The URL of the tweet to get details for',
		default: 'https://x.com/elonmusk/status/1933950533813068181',
		displayOptions: {
			show: {
				operation: ['getTweetDetails', 'getTweetTranscript'],
			},
		},
	},
];
