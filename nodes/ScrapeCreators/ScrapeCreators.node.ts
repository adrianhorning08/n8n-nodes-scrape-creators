import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { instagramOperations } from './InstagramDescription';
import { tiktokOperations } from './TikTokDescription';
import { youtubeOperations } from './YouTubeDescription';
import { linkedinOperations } from './LinkedinDescription';
import { facebookOperations } from './FacebookDescription';
import { facebookAdLibraryOperations } from './FacebookAdLibraryDescription';
import { googleAdLibraryOperations } from './GoogleAdLibraryDescription';
import { linkedinAdLibraryOperations } from './LinkedinAdLibraryDescription';
import { twitterOperations } from './TwitterDescription';
import { redditOperations } from './RedditDescription';
import { threadsOperations } from './ThreadsDescription';
import { truthSocialOperations } from './TruthSocialDescription';
import { pinterestOperations } from './PinterestDescription';
import { googleSearchOperations } from './GoogleSearchDescription';

export class ScrapeCreators implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Scrape Creators',
		name: 'scrapeCreators',
		icon: 'file:sclogo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get real time social media data',
		defaults: {
			name: 'Scrape Creators',
		},
		inputs: ['main'] as NodeConnectionType[],
		outputs: ['main'] as NodeConnectionType[],
		credentials: [
			{
				name: 'scrapeCreatorsApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.scrapecreators.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-API-KEY': '={{$credentials.apiKey}}',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Facebook',
						value: 'facebook',
					},
					{
						name: 'Facebook Ad Library',
						value: 'facebookAdLibrary',
					},
					{
						name: 'Google Ad Library',
						value: 'googleAdLibrary',
					},
					{
						name: 'Google Search',
						value: 'googleSearch',
					},
					{
						name: 'Instagram',
						value: 'instagram',
					},
					{
						name: 'LinkedIn',
						value: 'linkedin',
					},
					{
						name: 'LinkedIn Ad Library',
						value: 'linkedinAdLibrary',
					},
					{
						name: 'Pinterest',
						value: 'pinterest',
					},
					{
						name: 'Reddit',
						value: 'reddit',
					},
					{
						name: 'Thread',
						value: 'threads',
					},
					{
						name: 'TikTok',
						value: 'tiktok',
					},
					{
						name: 'Truth Social',
						value: 'truthsocial',
					},
					{
						name: 'Twitter (X)',
						value: 'twitter',
					},
					{
						name: 'YouTube',
						value: 'youtube',
					},
				],
				default: 'instagram',
			},
			// Operations will go here
			...instagramOperations,
			...tiktokOperations,
			...youtubeOperations,
			...linkedinOperations,
			...facebookOperations,
			...facebookAdLibraryOperations,
			...googleAdLibraryOperations,
			...linkedinAdLibraryOperations,
			...twitterOperations,
			...redditOperations,
			...threadsOperations,
			...truthSocialOperations,
			...pinterestOperations,
			...googleSearchOperations,
		],
	};
}
