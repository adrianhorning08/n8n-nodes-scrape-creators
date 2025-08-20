import {
	INodeExecutionData,
	IExecutePaginationFunctions,
	DeclarativeRestApiSettings,
	IDataObject,
	IExecuteSingleFunctions,
	IN8nHttpFullResponse,
} from 'n8n-workflow';

// got this fromhttps://github.com/n8n-io/n8n/blob/b1305fe5f146bd590fc7caab568d8dba1568cea7/packages/nodes-base/nodes/Okta/UserFunctions.ts

export const getCursorPaginator = (
	dataProperty: string, // e.g. 'posts'
	cursorProperty: string, // e.g. 'after' or 'paging.max_cursor'
) => {
	// TODO: what if the user didn't specify a limit?

	return async function cursorPagination(
		this: IExecutePaginationFunctions,
		requestOptions: DeclarativeRestApiSettings.ResultOptions,
	): Promise<INodeExecutionData[]> {
		if (!requestOptions.options.qs) {
			requestOptions.options.qs = {};
		}

		let count = 0;

		let items: INodeExecutionData[] = [
			{
				json: {
					[dataProperty]: [] as IDataObject[],
				} as IDataObject,
			},
		];
		let responseData: INodeExecutionData[];

		let nextCursor: string | undefined = undefined;
		const limit = (this.getNodeParameter('limit', true) as number) || 10;

		// Get the last part of the cursor property path for the query string
		const queryStringCursorProperty = cursorProperty.split('.').pop() || cursorProperty;

		do {
			requestOptions.options.qs.limit = limit;
			requestOptions.options.qs[queryStringCursorProperty] = nextCursor;
			responseData = await this.makeRoutingRequest(requestOptions);
			console.log('responseData', responseData);

			const actualResponse = responseData[responseData.length - 1]?.json as IDataObject;
			if (responseData.length > 0) {
				// Handle nested cursor property path
				const cursorPath = cursorProperty.split('.');
				let possibleNewCursor: unknown = actualResponse;
				for (const path of cursorPath) {
					possibleNewCursor = (possibleNewCursor as IDataObject)?.[path];
				}

				if (possibleNewCursor) {
					nextCursor = String(possibleNewCursor);
				}
			}

			if (Array.isArray(actualResponse?.[dataProperty])) {
				count += actualResponse[dataProperty].length;
				const currentData = items[0].json[dataProperty] as IDataObject[];
				items[0].json[dataProperty] = [...currentData, ...actualResponse[dataProperty]];
			}
		} while (limit > count && nextCursor);

		console.log('items', items);

		items[0].json[dataProperty] = (items[0].json[dataProperty] as IDataObject[])?.slice(0, limit);

		return items;
	};
};

export async function simplifyIGTranscriptResponse(
	this: IExecuteSingleFunctions,
	items: INodeExecutionData[],
	response: IN8nHttpFullResponse,
): Promise<INodeExecutionData[]> {
	try {
		const transcript = (items[0].json.transcripts as IDataObject[])?.[0]?.text;
		return [
			{
				json: {
					transcript: transcript,
				},
			},
		];
	} catch (error) {
		console.error('Error simplifying IG transcript response', error.message);
		return [];
	}
}
