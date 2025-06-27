import type { INodeProperties } from 'n8n-workflow';
import { getCursorPaginator } from './functions';

export const facebookAdLibraryOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['facebookAdLibrary'],
			},
		},
		options: [
			{
				name: 'Get Ad',
				value: 'getFacebookLibraryAd',
				action: 'Get a facebook ad library ad',
				description: 'Get a Facebook ad library ad',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/facebook/adLibrary/ad',
						qs: {
							id: '={{$parameter.id}}',
							trim: true,
						},
					},
				},
			},
			{
				name: 'Search Ads',
				value: 'searchAds',
				action: 'Search for ads',
				description: 'Search for ads',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/facebook/adLibrary/search/ads',
						qs: {
							query: '={{$parameter.query}}',
							search_type: '={{$parameter.additionalFields.search_type}}',
							ad_type: '={{$parameter.additionalFields.ad_type}}',
							country: '={{$parameter.additionalFields.country}}',
							status: '={{$parameter.additionalFields.status}}',
							media_type: '={{$parameter.additionalFields.media_type}}',
							start_date: '={{$parameter.additionalFields.start_date}}',
							end_date: '={{$parameter.additionalFields.end_date}}',
							trim: true,
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('searchResults', 'cursor'),
					},
				},
			},
			{
				name: "Get A Company's Ads",
				value: 'getCompanyAds',
				action: 'Get a company s ads',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/facebook/adLibrary/company/ads',
						qs: {
							pageId: '={{$parameter.pageId}}',
							country: '={{$parameter.additionalFields.country}}',
							status: '={{$parameter.additionalFields.status}}',
							media_type: '={{$parameter.additionalFields.media_type}}',
							trim: true,
						},
					},
					send: {
						paginate: true,
					},
					operations: {
						pagination: getCursorPaginator('results', 'cursor'),
					},
				},
			},
			{
				name: 'Search Companies',
				value: 'searchCompanies',
				action: 'Search for companies',
				description: 'Search for companies',
				routing: {
					request: {
						method: 'GET',
						url: 'v1/facebook/adLibrary/search/companies',
						qs: {
							query: '={{$parameter.query}}',
							trim: true,
						},
					},
				},
			},
		],
		default: 'getFacebookLibraryAd',
	},
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		description: 'The ID of the ad',
		default: '1771709900437946',
		displayOptions: {
			show: {
				operation: ['getFacebookLibraryAd'],
			},
		},
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		description: 'The query to search for',
		default: 'yoga pants',
		displayOptions: {
			show: {
				operation: ['searchAds', 'searchCompanies'],
			},
		},
	},
	{
		displayName: 'Page ID',
		name: 'pageId',
		type: 'string',
		required: true,
		description: 'The ID of the page. You can find this by using the "Search Companies" operation.',
		default: '33693527731',
		displayOptions: {
			show: {
				operation: ['getCompanyAds'],
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
				operation: ['getCompanyAds'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: 'US',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'ALL',
					},
					{
						name: 'Active',
						value: 'ACTIVE',
					},
					{
						name: 'Inactive',
						value: 'inactive',
					},
				],
				default: 'ALL',
			},
			{
				displayName: 'Media Type',
				name: 'media_type',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'ALL',
					},
					{
						name: 'Image',
						value: 'IMAGE',
					},
					{
						name: 'Image and Meme',
						value: 'IMAGE_AND_MEME',
					},
					{
						name: 'Meme',
						value: 'MEME',
					},
					{
						name: 'None',
						value: 'NONE',
					},
					{
						name: 'Video',
						value: 'VIDEO',
					},
				],
				default: 'ALL',
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				operation: ['searchAds'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Ad Type',
				name: 'ad_type',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Political and Issue Ads',
						value: 'political_and_issue_ads',
					},
				],
				default: 'all',
			},
			{
				displayName: 'Country',
				name: 'country',
				description: 'The 2 letter country code to search for, for example: US,CA,MX',
				type: 'string',
				default: 'US',
			},
			{
				displayName: 'End Date',
				name: 'end_date',
				description: 'In the format YYYY-MM-DD',
				type: 'string',
				default: '2025-01-02',
			},
			{
				displayName: 'Search Type',
				name: 'search_type',
				type: 'options',
				options: [
					{
						name: 'Keyword Unordered',
						value: 'keyword_unordered',
					},
					{
						name: 'Keyword Exact Phrase',
						value: 'keyword_exact_phrase',
					},
				],
				default: 'keyword_unordered',
			},
			{
				displayName: 'Start Date',
				name: 'start_date',
				description: 'In the format YYYY-MM-DD',
				type: 'string',
				default: '2025-01-01',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'ALL',
					},
					{
						name: 'Active',
						value: 'ACTIVE',
					},
					{
						name: 'Inactive',
						value: 'inactive',
					},
				],
				default: 'ALL',
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
				operation: ['searchAds', 'getCompanyAds'],
			},
		},
	},
];
