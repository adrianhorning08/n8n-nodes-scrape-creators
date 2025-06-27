import type { INodeProperties } from 'n8n-workflow';
import { getCursorPaginator } from './functions';

export const googleAdLibraryOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['googleAdLibrary'],
			},
		},
		options: [
			{
				name: "Get A Company's Google Ads",
				value: 'getCompanyGoogleAds',
				action: 'Get a company s google ads',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/google/company/ads',
						qs: {
							domain: '={{$parameter.domain}}',
							advertiser_id: '={{$parameter.additionalFields.advertiser_id}}',
							topic: '={{$parameter.additionalFields.topic}}',
							region: '={{$parameter.additionalFields.region}}',
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('ads', 'cursor'),
					},
				},
			},
			{
				name: 'Get Ad Details',
				value: 'getAdDetails',
				action: 'Get ad details',
				description: 'Get the details of a specific Google ad',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/google/ad',
						qs: {
							url: '={{$parameter.url}}',
						},
					},
				},
			},
		],
		default: 'getCompanyGoogleAds',
	},
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		description: 'The domain to search for. You can search by domain or advertiser ID.',
		default: 'google.com',
		displayOptions: {
			show: {
				operation: ['getCompanyGoogleAds'],
			},
		},
	},

	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		description: 'The URL of the ad to get details for',
		default:
			'https://adstransparency.google.com/advertiser/AR01614014350098432001/creative/CR10449491775734153217',
		displayOptions: {
			show: {
				operation: ['getAdDetails'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				operation: ['getCompanyGoogleAds'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Topic',
				name: 'topic',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Political',
						value: 'political',
					},
				],
				default: 'all',
			},
			{
				displayName: 'Country',
				name: 'region',
				type: 'string',
				description: 'The 2 letter country code to search for',
				default: 'US',
			},
			{
				displayName: 'Advertiser ID',
				name: 'advertiser_id',
				type: 'string',
				description: 'The advertiser ID to search for. You can search by domain or advertiser ID.',
				default: 'AR01614014350098432001',
			},
		],
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
				operation: ['getCompanyGoogleAds'],
			},
		},
	},
];
