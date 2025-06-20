import type { INodeProperties } from 'n8n-workflow';
import { getCursorPaginator } from './functions';

export const linkedinAdLibraryOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['linkedinAdLibrary'],
			},
		},
		options: [
			{
				name: 'Search Ads',
				value: 'searchLinkedinAds',
				action: 'Search for ads',
				description: 'Search the LinkedIn Ad Library for ads',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/linkedin/ads/search',
						qs: {
							keyword: '={{$parameter.keyword}}',
							company: '={{$parameter.additionalFields.company}}',
							countries: '={{$parameter.additionalFields.countries}}',
							startDate: '={{$parameter.additionalFields.startDate}}',
							endDate: '={{$parameter.additionalFields.endDate}}',
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('ads', 'paginationToken'),
					},
				},
			},
			{
				name: 'Get Ad Details',
				value: 'getLinkedinAdDetails',
				action: 'Get ad details',
				description: 'Get the details of a specific LinkedIn ad',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/linkedin/ad',
						qs: {
							url: '={{$parameter.url}}',
						},
					},
				},
			},
		],
		default: 'getLinkedinAdDetails',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		description: 'The URL of the ad to get details for',
		default: 'https://www.linkedin.com/ad-library/detail/726178896',
		displayOptions: {
			show: {
				operation: ['getLinkedinAdDetails'],
			},
		},
	},

	{
		displayName: 'Keyword',
		name: 'keyword',
		type: 'string',
		description: 'The keyword to search for. Search by company or keyword.',
		default: 'web scraping',
		displayOptions: {
			show: {
				operation: ['searchLinkedinAds'],
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
				operation: ['searchLinkedinAds'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Company',
				name: 'company',
				type: 'string',
				description: 'The company to search for. Search by company or keyword.',
				default: 'google',
			},
			{
				displayName: 'Countries',
				name: 'countries',
				type: 'string',
				description: 'Comma-separated list of the 2 letter country codes to search for, for example: US,CA,MX',
				default: '',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'string',
				description: 'The start date to search for, for example: 2024-01-01',
				default: '',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'string',
				description: 'The end date to search for, for example: 2024-01-01',
				default: '',
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
		default: 50,
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				operation: ['searchLinkedinAds'],
			},
		},
	},
];
