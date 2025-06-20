import type { INodeProperties } from 'n8n-workflow';

export const truthSocialOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getTruthSocialProfile',
		displayOptions: {
			show: {
				resource: ['truthsocial'],
			},
		},
		options: [
			{
				name: 'Get TruthSocial Profile',
				value: 'getTruthSocialProfile',
				action: 'Get truth social profile',
				description: 'Get truth social profile',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/truthsocial/profile',
						qs: {
							handle: '={{$parameter.handle}}',
						},
					},
				},
			},
			{
				name: 'Get TruthSocial User Posts',
				value: 'getTruthSocialUserPosts',
				action: 'Get truth social user posts',
				description: 'Get truth social user posts',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/truthsocial/user/posts',
						qs: {
							handle: '={{$parameter.handle}}',
							trim: true,
						},
					},
				},
			},
			{
				name: 'Get TruthSocial Post',
				value: 'getTruthSocialPost',
				action: 'Get the details of a truth social post',
				description: 'Get the details of a truth social post',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/truthsocial/post',
						qs: {
							url: '={{$parameter.url}}',
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
		description: 'The handle of the truth social profile',
		default: 'realDonaldTrump',
		displayOptions: {
			show: {
				operation: ['getTruthSocialProfile', 'getTruthSocialUserPosts'],
			},
		},
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		description: 'The URL of the truth social post',
		default: 'https://truthsocial.com/@realDonaldTrump/114691752952220639',
		displayOptions: {
			show: {
				operation: ['getTruthSocialPost'],
			},
		},
	},
];
